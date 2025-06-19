import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";

// Registrando a fonte Inter para um visual mais moderno
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

// Paleta de Cores
const colors = {
  primary: "#2d3748", // Cinza escuro
  secondary: "#4a5568", // Cinza médio
  accent: "#2b6cb0", // Azul
  background: "#f7fafc",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: colors.white,
    fontFamily: "Roboto",
  },
  // --- Layout de 2 Colunas ---
  leftColumn: {
    flexDirection: "column",
    width: "35%",
    padding: 20,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  rightColumn: {
    flexDirection: "column",
    width: "65%",
    padding: 25,
  },
  // --- Cabeçalho da Sidebar ---
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.white,
  },
  // --- Seções da Sidebar ---
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    paddingBottom: 5,
    textTransform: "uppercase",
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: 6,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontWeight: "bold",
  },
  institution: {
    fontSize: 10,
  },
  // --- Seções do Conteúdo Principal ---
  mainSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 15,
    textTransform: "uppercase",
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: colors.secondary,
  },
  job: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.accent,
  },
  jobCompany: {
    fontSize: 11,
    fontWeight: 500,
    color: colors.primary,
    marginBottom: 3,
  },
  jobDate: {
    fontSize: 10,
    color: colors.secondary,
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 11,
    lineHeight: 1.4,
    color: colors.secondary,
  },
});

interface ResumePDFProps {
  data: ResumeData;
}

export const ResumeTemplate = ({ data }: ResumePDFProps) => (
  <Document
    author="CurrículoPro"
    title={`Currículo - ${data.personalInfo.name}`}
  >
    <Page size="A4" style={styles.page}>
      {/* Coluna da Esquerda (Sidebar) */}
      <View style={styles.leftColumn}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {data.personalInfo.name || "Seu Nome"}
          </Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Contato</Text>
          {data.personalInfo.email && (
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          )}
          {data.personalInfo.phone && (
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          )}
          {data.personalInfo.linkedin && (
            <Link
              src={data.personalInfo.linkedin}
              style={{ ...styles.contactItem, color: colors.white }}
            >
              LinkedIn
            </Link>
          )}
        </View>

        {data.education.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Formação</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.institution}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && data.skills[0] !== "" && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Habilidades</Text>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Coluna da Direita (Conteúdo Principal) */}
      <View style={styles.rightColumn}>
        {data.summary && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Perfil Profissional</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {data.experiences.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Experiência Profissional</Text>
            {data.experiences.map((exp) => (
              <View key={exp.id} style={styles.job}>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.jobCompany}>{exp.company}</Text>
                <Text style={styles.jobDate}>
                  {exp.startDate} - {exp.endDate}
                </Text>
                <Text style={styles.jobDescription}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);
