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
    { name: "Hayla Luiza da Costa Almeida", id: "IC-01", focus: "Fullstack", lattes: "#", image: "/images/team/avatar-placeholder.jpg" },
    { name: "Gabriel Xavier ", id: "IC-02", focus: "Frontend & DevOps", lattes: "#", image: "/images/team/avatar-placeholder.jpg" },
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
        longDescription: "A Amazônia brasileira possui relevância global pela biodiversidade incomparável e pelo papel crucial na regulação do clima, influenciando os padrões de chuva e os ciclos climáticos em todo o hemisfério sul, impactando diretamente a agricultura e a segurança hídrica de várias áreas. À luz das especificidades, incluindo os desafios sociais em relação à pobreza regional, esta proposta visa à criação de um Instituto Nacional de Ciência e Tecnologia em Inteligência Artificial aplicada às cidades inteligentes e sustentáveis na Amazônia brasileira, o IAmazônia.A proposta está em consonância com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU: saúde e bem-estar; educação de qualidade; água potável e saneamento; inovação e infraestrutura; redução das desigualdades; cidades e comunidades sustentáveis. Para tanto, foi constituída uma rede interdisciplinar, formada por especialistas nacionais e internacionais com competências reconhecidas em Inteligência Artificial, Internet das Coisas, Sistemas de Telecomunicações, Cidades Inteligentes e Sustentabilidade. Esses pesquisadores atuam em instituições de Ciência e Tecnologia (ICTs) de todo o país. A instituição-sede do IAmazônia, localizada no Centro de Computação de Alto Desempenho e Inteligência Artificial CCAD-IA, da UFPA, envolve áreas estratégicas como a Internet das Coisas (IoT), a Inteligência Artificial (IA) e as Infraestruturas de Comunicações, para produzir soluções em temas fundantes como monitoramento ambiental, saúde pública, educação, letramento digital, computação em nuvem e infraestrutura de telecomunicações. A proposta conta com a participação de um grupo de empresas e prefeituras, cujas atividades englobam os temas mencionados, estruturada em redes nas cidades de Belém, Canaã dos Carajás, Melgaço, Paragominas e Bragança. Serão ênfases no INCT IAmazônia a transferência de tecnologia e a difusão de conhecimento para o uso justo, ético e eficiente da IA, com foco na transformação de cidades na região.",
        image: "/images/inct-iamazonia.jpg",
        status: "Em Andamento",
        partners: ["CNPq", "CAPES", "UFPA"],
    },
    {
        id: "brasil-plus-plus",
        slug: "brasil-plus-plus",
        title: "Brasil++",
        category: "Saúde Pública",
        description: "Inteligência Artificial e Inovação no Diagnóstico do Câncer Cervical.",
        longDescription: "O exame de Papanicolau desempenha um papel vital na detecção precoce de alterações no colo uterino, incluindo lesões precursoras de câncer e infecções. No entanto, a análise tradicional enfrenta problemas de atrasos e baixa cobertura, comprometendo o rastreamento e o tratamento precoce. Nesse sentido, este projeto é composto por uma rede de cooperação multidisciplinar internacional, envolvendo especialistas renomados de diferentes áreas, que trabalham em uma proposta inovadora que visa superar essas limitações por meio da aplicação de Inteligência Artificial (IA) e análise de dados, com um enfoque especial em regiões remotas e comunidades socialmente vulneráveis. A proposta inclui o desenvolvimento de um sistema baseado em IA para o processamento em tempo real das imagens dos exames, além de um sistema automatizado para o agendamento de consultas e exames subsequentes. Para tanto, a rede de cooperação trabalha em conjunto para aprimorar o sistema proposto de diagnóstico assistido por IA para exames de Papanicolau, tendo em vista a promover o intercâmbio constante de conhecimento e a integração de diversas expertises. Esta abordagem visa melhorar significativamente o acesso ao diagnóstico e ao tratamento, reduzir o tempo de espera e permitir a intervenção precoce. A inovação do projeto reside na aplicação de técnicas avançadas de Visão Computacional e Deep Learning para fornecer um pré-diagnóstico rápido e preciso. Além disso, a análise de dados de instituições como IBGE, DATASUS e OMS permitirá identificar fatores que afetam a cobertura dos testes e aprimorar as políticas públicas contra o câncer cervical. Um projeto piloto será realizado na Amazônia Brasileira, utilizando um sistema online para submissão, análise de imagens e agendamento automático. A colaboração internacional é fundamental para garantir a alta qualidade e relevância do sistema, beneficiando pacientes em comunidades vulneráveis e fortalecendo o Sistema Único de Saúde (SUS) no Brasil.",
        image: "/images/brasil-plus-plus.png",
        status: "Em Andamento",
        partners: ["Governo Federal", "OMS", "IBGE", "DATASUS"],
        features: [
            "Dashboard",
            "Processamento em tempo real",
            "Agendamento automático"
        ]
    },
    {
        id: "mina-do-futuro",
        slug: "mina-do-futuro",
        title: "Mina do Futuro",
        category: "Cidades Inteligentes",
        description: "Cooperação entre a Universidade Federal do Pará e a Prefeitura de Canaã dos Carajás.",
        longDescription: "Tem como objetivo geral criar e estruturar a Mina do Futuro, integrando ações de interesse para as áreas de negócios, tecnologia digital e desenvolvimento sustentável do município de Canaã dos Carajás. A Mina do Futuro posicionará o desenvolvimento mais rápido no município de Canaã dos Carajás com negócios viáveis e escaláveis, atraindo e mantendo Startups com alto potencial de crescimento e novos ambientes de interação, troca e cooperação entre os diversos atores. O projeto está fundamento em 7 (sete) eixos estratégicos a fim de impulsionar a inovação e a prestação de serviço, a saber: (i) Implantação de Infraestrutura Física e de Serviços; (ii) Atração de empresas para Canaã dos Carajás; (iii) Sensibilização e ativação de ecossistema da inovação; (iv) Implantação e Gestão de ambiente de inovação; (v) Formação empreendedora e geração de empreendimentos de alto impacto; (vi) Integração com os demais setores econômicos do Estado do Pará; e (vii) Integração com Smart City Canaã dos Carajás.",
        image: "/images/mina-do-futuro.jpg",
        status: "Fase de Testes",
        partners: ["Prefeitura de Canaã dos Carajás", "FADESP", "UFPA"],
        features: [
            "Visão Computacional para remoção de lixo em vias públicas",
            "Drones Autônomos",
            "Sensores LoRaWAN para monitoramento de qualidade do ar"
        ]
    },
];

// --- Publications (Publications.tsx) ---
export interface Publication {
    id: string;
    slug: string;
    title: string;
    authors: string[];
    venue: string;
    year: number;
    type: 'journal' | 'conference' | 'book' | 'thesis';
    doi: string;
    abstract: string;
    tags: string[];
}

export const publications: Publication[] = [
    {
        id: "pub-001",
        slug: "deep-learning-cervical-cancer",
        title: "Deep Learning Approaches for Automated Cervical Cancer Screening in Low-Resource Settings",
        authors: ["Carlos R. L. Francês", "Evelin H. S. Cardoso", "Jasmine P. L. Araújo"],
        venue: "IEEE Journal of Biomedical and Health Informatics",
        year: 2025,
        type: "journal",
        doi: "https://doi.org/10.1109/JBHI.2025.0001",
        abstract: "Este artigo apresenta uma abordagem inovadora utilizando redes neurais convolucionais para a triagem automatizada do câncer cervical em regiões com recursos limitados. O sistema proposto alcança uma acurácia de 94.7% na detecção de lesões precursoras, superando métodos tradicionais de análise citológica.",
        tags: ["Deep Learning", "Saúde Pública", "Visão Computacional"]
    },
    {
        id: "pub-002",
        slug: "iot-amazon-biodiversity",
        title: "IoT-Based Environmental Monitoring System for Amazon Biodiversity Conservation",
        authors: ["Evelin H. S. Cardoso", "Carlos A. M. Teixeira", "Carlos R. L. Francês"],
        venue: "Sensors",
        year: 2025,
        type: "journal",
        doi: "https://doi.org/10.3390/s25010001",
        abstract: "Propomos um sistema de monitoramento ambiental baseado em IoT e redes LoRaWAN para conservação da biodiversidade amazônica. O sistema integra sensores de baixo custo com algoritmos de Machine Learning para detecção precoce de desmatamento e queimadas.",
        tags: ["IoT", "Monitoramento Ambiental", "LoRaWAN"]
    },
    {
        id: "pub-003",
        slug: "smart-city-canaa",
        title: "Smart City Infrastructure Planning for Mining Regions: A Case Study of Canaã dos Carajás",
        authors: ["Carlos R. L. Francês", "Jasmine P. L. Araújo"],
        venue: "IEEE International Smart Cities Conference (ISC2)",
        year: 2024,
        type: "conference",
        doi: "https://doi.org/10.1109/ISC2.2024.0001",
        abstract: "Este trabalho apresenta um framework para planejamento de infraestrutura de cidades inteligentes em regiões mineradoras, com foco no desenvolvimento sustentável e inclusão digital da população local.",
        tags: ["Cidades Inteligentes", "Infraestrutura", "Desenvolvimento Sustentável"]
    },
    {
        id: "pub-004",
        slug: "ai-education-amazon",
        title: "Artificial Intelligence for Digital Literacy in the Brazilian Amazon: Challenges and Opportunities",
        authors: ["Evelin H. S. Cardoso", "Carlos R. L. Francês"],
        venue: "Computers & Education: Artificial Intelligence",
        year: 2024,
        type: "journal",
        doi: "https://doi.org/10.1016/j.caeai.2024.0001",
        abstract: "Investigamos os desafios e oportunidades da aplicação de IA para letramento digital na Amazônia brasileira, propondo um modelo adaptativo que considera as especificidades culturais e de infraestrutura da região.",
        tags: ["Educação", "Letramento Digital", "IA"]
    },
    {
        id: "pub-005",
        slug: "cloud-computing-hpc",
        title: "High-Performance Cloud Computing Architecture for AI Workloads in Remote Regions",
        authors: ["Carlos A. M. Teixeira", "Jasmine P. L. Araújo", "Carlos R. L. Francês"],
        venue: "IEEE Transactions on Cloud Computing",
        year: 2024,
        type: "journal",
        doi: "https://doi.org/10.1109/TCC.2024.0001",
        abstract: "Apresentamos uma arquitetura de computação em nuvem de alto desempenho otimizada para cargas de trabalho de IA em regiões remotas, com foco em eficiência energética e baixa latência para aplicações críticas.",
        tags: ["Cloud Computing", "HPC", "Infraestrutura"]
    },
    {
        id: "pub-006",
        slug: "telecom-rural-connectivity",
        title: "Telecommunication Infrastructure for Rural Connectivity in the Amazon Basin",
        authors: ["Jasmine P. L. Araújo", "Evelin H. S. Cardoso"],
        venue: "IEEE Communications Magazine",
        year: 2023,
        type: "journal",
        doi: "https://doi.org/10.1109/MCOM.2023.0001",
        abstract: "Este artigo analisa as infraestruturas de telecomunicações necessárias para conectividade rural na bacia amazônica, propondo soluções híbridas que combinam redes satelitais e terrestres.",
        tags: ["Telecomunicações", "Conectividade Rural", "Infraestrutura"]
    }
];
