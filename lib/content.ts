import { Leaf, Activity, GraduationCap, Wifi } from 'lucide-react';

export const researchAreas = [
    {
        title: "Monitoramento Ambiental",
        description: "Sistemas de IoT e IA para preservação da biodiversidade e regulação climática na Amazônia.",
        icon: Leaf,
        code: "RES-AMB"
    },
    {
        title: "Saúde Pública & IA",
        description: "Diagnóstico assistido por Deep Learning e gestão de dados epidemiológicos (Saúde 4.0).",
        icon: Activity,
        code: "RES-SAU"
    },
    {
        title: "Educação & Letramento",
        description: "Ferramentas digitais para inclusão tecnológica e transformação do ensino na região.",
        icon: GraduationCap,
        code: "RES-EDU"
    },
    {
        title: "Infraestrutura & Nuvem",
        description: "Computação de alto desempenho, redes de telecomunicações e conectividade rural.",
        icon: Wifi,
        code: "RES-INF"
    }
];

// --- Team Sections (Team.tsx) ---
export const coordinators = [
    {
        name: "Prof. Dr. Carlos Renato Lisboa Francês",
        role: "Coordenador Geral",
        id: "COORD-01",
        focus: "IA & Cidades Inteligentes",
        lattes: "http://lattes.cnpq.br/7458287841862567",
        // specs: ["Bolsista CNPq 1-C", "Doutor (USP)"],
        image: "/images/team/renato.png"
    },
    {
        name: "Profa. Dra. Evelin Helena Silva Cardoso",
        role: "Coordenador",
        id: "COORD-02",
        focus: "IA & Cidades Inteligentes",
        lattes: "http://lattes.cnpq.br/5388902706205997",
        image: "/images/team/evelin.png"
    }
];

export const doctors = [
    { name: "Profa. Dra. Jasmine Priscyla Leite de Araújo", id: "DOC-01", focus: "Internet do Futuro", lattes: "http://lattes.cnpq.br/4001747699670004", image: "/images/team/jasmine.png" },
    { name: "Dr. Carlos André de Mattos Teixeira", id: "DOC-02", focus: "IA & Machine Learning", lattes: "http://lattes.cnpq.br/5642339206700236", image: "/images/team/carlosandre.png" },
];

// --- Level 3: Masters ---
export const masters = [
    { name: "Pesquisador Mestrando A", id: "MSC-01", focus: "Ciência de Dados", lattes: "#", image: "/images/team/avatar-placeholder.jpg" },
    { name: "Pesquisador Mestrando B", id: "MSC-02", focus: "Visão Computacional", lattes: "#", image: "/images/team/avatar-placeholder.jpg" },
    { name: "Pesquisador Mestrando C", id: "MSC-03", focus: "Analítica Urbana", lattes: "#", image: "/images/team/avatar-placeholder.jpg" },
    { name: "Pesquisador Mestrando D", id: "MSC-04", focus: "Sistemas Embarcados", lattes: "#", image: "/images/team/avatar-placeholder.jpg" }
];

// --- Level 4: Scientific Initiation (IC / Graduação) ---
export const undergraduates = [
    { name: "Hayla Luiza da Costa Almeida", id: "IC-01", focus: "Front-end & UX", lattes: "#", image: "/images/team/avatar-placeholder.jpg" },
    { name: "Gabriel Xavier ", id: "IC-02", focus: "Back-end & APIs", lattes: "#", image: "/images/team/avatar-placeholder.jpg" },
    { name: "Gabriel Ribeiro", id: "IC-03", focus: "DevOps & Cloud", lattes: "#", image: "/images/team/avatar-placeholder.jpg" },
    { name: "Aluno de Iniciação D", id: "IC-04", focus: "IA & Modelos", lattes: "#", image: "/images/team/avatar-placeholder.jpg" }
];

// --- Projects (Projects.tsx) ---
// Note: Images must be in public folder
export const projects = [
    {
        id: "inct-iamazonia", // Used for ID
        slug: "inct-iamazonia", // Used for URL
        title: "INCT IAmazônia",
        category: "Instituto Nacional",
        description: "Instituto Nacional de Ciência e Tecnologia focado em IA para a biodiversidade e sociedade amazônica.",
        longDescription: "O INCT IAmazônia é uma iniciativa de grande porte que visa integrar a Inteligência Artificial com as demandas socioambientais da Amazônia. O projeto desenvolve modelos preditivos para desmatamento, monitoramento de biodiversidade via bioacústica e soluções de cidades inteligentes adaptadas à realidade ribeirinha.",
        image: "/images/inct-iamazonia.jpg",
        status: "Em Andamento",
        partners: ["CNPq", "CAPES", "UFPA"],
        features: [
            "Monitoramento Bioacústico",
            "Previsão de Desmatamento",
            "Educação em IA para escolas locais"
        ]
    },
    {
        id: "brasil-plus-plus",
        slug: "brasil-plus-plus",
        title: "Brasil++",
        category: "Saúde Pública",
        description: "Plataforma de integração de dados urbanos em escala nacional.",
        longDescription: "O Brasil++ é uma plataforma robusta de Big Data e Analytics voltada para gestores públicos. Ela agrega dados de diversas fontes governamentais para criar índices de desenvolvimento, identificar gargalos de infraestrutura e propor políticas públicas baseadas em evidências.",
        image: "/images/brasil-plus-plus.png",
        status: "Em Andamento",
        partners: ["Governo Federal", "Ministério das Comunicações"],
        features: [
            "Dashboards em Tempo Real",
            "Integração de APIs Governamentais",
            "Relatórios Automatizados de Gestão"
        ]
    },
    {
        id: "mina-do-futuro",
        slug: "mina-do-futuro",
        title: "Mina do Futuro",
        category: "Cidades Inteligentes",
        description: "Automação e monitoramento inteligente para segurança em mineração.",
        longDescription: "Projeto focado na segurança e eficiência da mineração através de IoT e Visão Computacional. Sensores inteligentes monitoram a estabilidade de barragens 24/7, enquanto drones autônomos realizam inspeções em áreas de risco, garantindo a segurança dos trabalhadores e do meio ambiente.",
        image: "/images/mina-do-futuro.jpg",
        status: "Fase de Testes",
        partners: ["Prefeitura de Canaã dos Carajás", "FADESP", "UFPA"],
        features: [
            "Visão Computacional para remoção de lixo em vias públicas",
            "Drones Autônomos",
            "Sensores LoRaWAN para monitoramento de qualidade do ar"
        ]
    }
];
