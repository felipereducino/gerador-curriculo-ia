/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Stripe from "stripe";
import { ResumeData } from "./types";
import { db } from "./firebase"; // Importa nossa instância do Firestore
import { doc, setDoc, getDoc, collection } from "firebase/firestore"; // Funções do Firestore

// A action da IA não muda.
export async function generateSummaryWithAI(
  data: ResumeData
): Promise<{ summary?: string; error?: string }> {
  // ... (código existente da função da Gemini, sem alterações)
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return { error: "API Key do Google não foi configurada." };
  }
  const prompt = `Com base nas seguintes informações de um currículo, escreva um resumo profissional conciso (no máximo 4-5 frases) e impactante em Português (Brasil). Destaque as principais qualificações e objetivos de carreira. - Nome: ${
    data.personalInfo.name
  } - Experiências: ${data.experiences
    .map((exp) => `${exp.title} na ${exp.company}`)
    .join(", ")} - Habilidades: ${data.skills.join(
    ", "
  )} Foque em um tom profissional e direto.`;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Erro da API Gemini:", errorBody);
      return { error: `Erro na API: ${response.statusText}` };
    }
    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return {
        error:
          "Não foi possível gerar um resumo. A resposta da IA estava em um formato inesperado.",
      };
    }
    return { summary: text.trim() };
  } catch (error) {
    console.error(error);
    return { error: "Ocorreu um erro ao conectar com a IA." };
  }
}

// --- ATUALIZAÇÃO: FUNÇÃO DE CHECKOUT USANDO FIRESTORE ---
export async function createCheckoutSession(
  data: ResumeData,
  templateId: string
): Promise<{ url?: string; error?: string }> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secretKey || !priceId) {
    return {
      error: "As chaves da Stripe não foram configuradas corretamente.",
    };
  }

  const stripe = new Stripe(secretKey);
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://seu-dominio-na-vercel.vercel.app" // Lembre-se de mudar
      : "http://localhost:3000";

  try {
    // 1. Gerar um ID único para o nosso currículo
    const resumeId = doc(collection(db, "temp_resumes")).id;

    // 2. Salvar o currículo e o templateId no Firestore sob esse ID
    const resumeRef = doc(db, "resumes", resumeId);
    await setDoc(resumeRef, {
      resumeData: data,
      templateId: templateId,
      createdAt: new Date(),
    });

    // 3. Criar a sessão do Stripe, passando APENAS o resumeId nos metadados
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      metadata: {
        resumeId: resumeId, // <-- MUITO IMPORTANTE!
      },
      success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelado`,
    });

    if (!session.url) {
      return { error: "Não foi possível criar a sessão de checkout." };
    }

    return { url: session.url };
  } catch (error: any) {
    console.error("Erro ao criar sessão ou salvar no Firestore:", error);
    return { error: error.message };
  }
}

// --- ATUALIZAÇÃO: ACTION PARA BUSCAR DADOS DO FIRESTORE ---
export async function getResumeDataFromSession(
  sessionId: string
): Promise<{ resumeData?: ResumeData; templateId?: string; error?: string }> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { error: "A chave secreta da Stripe não foi configurada." };
  }

  const stripe = new Stripe(secretKey);

  try {
    // 1. Buscar a sessão do Stripe para obter o resumeId
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const resumeId = session.metadata?.resumeId;

    if (!resumeId) {
      return {
        error: "ID do currículo não encontrado na sessão de pagamento.",
      };
    }

    // 2. Usar o resumeId para buscar o documento no Firestore
    const resumeRef = doc(db, "resumes", resumeId);
    const docSnap = await getDoc(resumeRef);

    if (!docSnap.exists()) {
      return { error: "Currículo não encontrado no banco de dados." };
    }

    // 3. Retornar os dados encontrados
    const data = docSnap.data();
    const resumeData = data.resumeData as ResumeData;
    const templateId = data.templateId as string;

    return { resumeData, templateId };
  } catch (error: any) {
    console.error(
      "Erro ao buscar sessão do Stripe ou dados do Firestore:",
      error
    );
    return { error: error.message };
  }
}
