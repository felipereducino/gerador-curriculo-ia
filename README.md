# 🚀 Gerador de Currículo com IA

Bem-vindo ao Gerador de Currículo com IA! Este é um projeto MVP (Minimum Viable Product) que permite aos usuários criar currículos profissionais de forma rápida e intuitiva, com a ajuda da Inteligência Artificial do Google (Gemini) e com um sistema de pagamento integrado via Stripe.

O usuário preenche suas informações, escolhe um template, pode usar a IA para otimizar seu resumo profissional, e após um pagamento simbólico de R$ 9,90, realiza o download do seu currículo em formato PDF.

![Imagem do Projeto](https://placehold.co/800x400/2d3748/ffffff?text=Demonstra%C3%A7%C3%A3o+do+App)

---

## ✨ Funcionalidades Principais

- **Formulário Dinâmico:** Interface intuitiva para adicionar informações pessoais, múltiplas experiências profissionais e formações acadêmicas.
- **Assistente de IA:** Integração com a API Gemini do Google para gerar resumos profissionais impactantes com um único clique.
- **Templates de Currículo:** Sistema de templates para que o usuário escolha o visual do seu currículo.
- **Pré-visualização em Tempo Real:** O usuário vê o seu currículo sendo montado instantaneamente enquanto preenche os dados.
- **Geração de PDF:** Download do currículo final em formato PDF de alta qualidade.
- **Integração de Pagamento:** Checkout seguro e transparente com a Stripe.
- **Arquitetura Serverless:** Construído 100% com Next.js e Firebase, sem a necessidade de um backend tradicional.

---

## 🛠️ Tecnologias Utilizadas

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Começando

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação Local

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/gerador-curriculo-ia.git](https://github.com/seu-usuario/gerador-curriculo-ia.git)
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd gerador-curriculo-ia
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie uma cópia do arquivo de exemplo `.env.example` (se houver um no seu projeto) ou crie um novo arquivo chamado `.env.local`.

    Agora, preencha o arquivo `.env.local` com suas chaves de API, conforme explicado na próxima seção.

---

## 🔑 Configurando as Variáveis de Ambiente

Para que a aplicação funcione, você precisa obter chaves de API de três serviços: Google (para a IA), Stripe (para pagamentos) e Firebase (para o banco de dados).

Seu arquivo `.env.local` deve ter a seguinte estrutura:

```env
# .env.local

# Chave da API do Google AI Studio (Gemini)
GOOGLE_API_KEY="SUA_CHAVE_AQUI"

# Chaves de API da Stripe
STRIPE_SECRET_KEY="SUA_CHAVE_SECRETA_sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="SUA_CHAVE_PUBLICAVEL_pk_test_..."

# ID do Produto criado na Stripe
STRIPE_PRICE_ID="SEU_ID_DO_PRECO_price_..."

# Configuração do Firebase
FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}'
```

#### Como obter cada chave:

- **`GOOGLE_API_KEY`**

  1.  Acesse o [Google AI Studio](https://aistudio.google.com/).
  2.  Clique em "Get API key" e copie sua chave.

- **`STRIPE_*`**

  1.  Acesse seu [Dashboard da Stripe](https://dashboard.stripe.com/login).
  2.  No modo de teste, vá para a seção **Desenvolvedores > Chaves de API** para obter a `STRIPE_SECRET_KEY` e a `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
  3.  Vá para **Produtos**, crie um novo produto (ex: "Currículo Profissional"), adicione um preço único de R$ 9,90 e salve. Na página de detalhes do preço, copie o **ID da API** para o `STRIPE_PRICE_ID`.

- **`FIREBASE_CONFIG`**
  1.  Vá para o [Console do Firebase](https://console.firebase.google.com/) e crie um novo projeto.
  2.  Dentro do projeto, crie um **Firestore Database** em **modo de teste**.
  3.  Vá para **Configurações do projeto** (ícone de ⚙️) e, na aba "Geral", registre um novo **aplicativo da web** (`</>`).
  4.  Copie o objeto `firebaseConfig` que será exibido e **cole-o como uma string única entre aspas** no seu arquivo `.env.local`.

---

## ⚙️ Rodando o Projeto

Após instalar as dependências e configurar as variáveis de ambiente, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação funcionando!

---

## 📚 Estrutura do Projeto

```
/
├── app/                  # Rotas e páginas principais com o App Router
│   ├── criar/            # Página de criação do currículo
│   ├── sucesso/          # Página de sucesso do pagamento
│   ├── cancelado/        # Página de cancelamento do pagamento
│   ├── page.tsx          # Landing Page
│   └── layout.tsx        # Layout principal
├── components/           # Componentes React reutilizáveis
│   ├── pdf/              # Componentes específicos para a geração do PDF
│   ├── Header.tsx
│   ├── ResumeForm.tsx
│   └── ...
├── lib/                  # Lógica de negócio, actions e configurações
│   ├── actions.ts        # Server Actions (Stripe, Gemini, Firestore)
│   ├── firebase.ts       # Configuração e inicialização do Firebase
│   └── types.ts          # Definições de tipos do TypeScript
├── public/               # Arquivos estáticos (imagens, ícones)
└── .env.local            # Arquivo com suas variáveis de ambiente (secreto)
```

---

## ☁️ Deploy

Este projeto está pronto para ser hospedado na [Vercel](https://vercel.com/).

1.  Faça o push do seu código para um repositório no GitHub.
2.  Crie uma conta na Vercel e importe o repositório.
3.  Nas configurações do projeto na Vercel, adicione todas as variáveis de ambiente que você configurou no seu arquivo `.env.local`.
4.  Clique em **Deploy** e pronto! Sua aplicação estará no ar.

---

Feito com ❤️ por você e seu assistente de IA.
