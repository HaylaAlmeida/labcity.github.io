# 🏙️ LabCity - Website Institucional

Website institucional do **LabCity** (Laboratório de Cidades Inteligentes) da UFPA, construído com Next.js 16 e Tailwind CSS 4.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/HaylaAlmeida/labcity.github.io.git
cd labcity.github.io

# Instale as dependências
npm install
```

### Executando em Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📝 Como Adicionar Conteúdo

Todo o conteúdo do site (equipe, projetos, publicações) está centralizado em um único arquivo:

📁 **`lib/content.ts`**

### 👥 Adicionar Membros da Equipe

O arquivo contém 4 arrays para diferentes níveis da equipe:

#### Coordenadores (`coordinators`)

```typescript
export const coordinators = [
    {
        name: "Nome Completo com Título",
        role: "Coordenador / Coordenadora",
        id: "COORD-XX",
        focus: "Área de Atuação",
        lattes: "http://lattes.cnpq.br/...",
        image: `${BASE_PATH}/images/team/nome-arquivo.png`
    },
    // ... adicione novos coordenadores aqui
];
```

#### Doutores (`doctors`)

```typescript
export const doctors = [
    { 
        name: "Nome Completo", 
        id: "DOC-XX", 
        focus: "Área", 
        lattes: "http://lattes.cnpq.br/...", 
        image: `${BASE_PATH}/images/team/nome.png` 
    },
];
```

#### Mestrandos (`masters`)

```typescript
export const masters = [
    { 
        name: "Nome", 
        id: "MSC-XX", 
        focus: "Área", 
        lattes: "#", 
        image: `${BASE_PATH}/images/team/avatar-placeholder.jpg` 
    },
];
```

#### Graduação / IC (`undergraduates`)

```typescript
export const undergraduates = [
    { 
        name: "Nome", 
        id: "IC-XX", 
        focus: "Área", 
        lattes: "#", 
        image: `${BASE_PATH}/images/team/avatar-placeholder.jpg` 
    },
];
```

> **📸 Imagens:** Coloque as fotos em `public/images/team/` (formato PNG ou JPG).

---

### 📂 Adicionar Projetos

```typescript
export const projects = [
    {
        id: "id-do-projeto",           // Identificador único
        slug: "url-do-projeto",        // Usado na URL: /projetos/url-do-projeto
        title: "Nome do Projeto",
        category: "Categoria",         // Ex: "Saúde Pública", "Cidades Inteligentes"
        description: "Descrição curta para o card",
        longDescription: "Descrição completa para a página do projeto...",
        image: `${BASE_PATH}/images/nome-imagem.jpg`,
        status: "Em Andamento",        // ou "Concluído", "Fase de Testes"
        partners: ["Parceiro 1", "Parceiro 2"],
        features: [                    // Opcional
            "Funcionalidade 1",
            "Funcionalidade 2"
        ]
    },
    // ... adicione novos projetos aqui
];
```

> **📸 Imagens:** Coloque as imagens dos projetos em `public/images/`.

---

### 📄 Adicionar Publicações

```typescript
export const publications: Publication[] = [
    {
        id: "pub-XXX",
        slug: "titulo-da-publicacao",   // Usado na URL: /publicacoes/titulo-da-publicacao
        title: "Título Completo do Artigo",
        authors: ["Autor 1", "Autor 2", "Autor 3"],
        venue: "Nome do Periódico ou Conferência",
        year: 2025,
        type: "journal",                // "journal" | "conference" | "book" | "thesis"
        doi: "https://doi.org/10.xxxx/xxxxx",
        abstract: "Resumo do artigo...",
        tags: ["Tag 1", "Tag 2", "Tag 3"]
    },
    // ... adicione novas publicações aqui
];
```

---

## 🖼️ Boas Práticas para Imagens

### Formatos Recomendados

| Tipo de Imagem | Formato | Motivo |
|----------------|---------|--------|
| Fotos da equipe | **PNG** ou **WebP** | Melhor qualidade para rostos |
| Imagens de projetos | **JPG** ou **WebP** | Bom equilíbrio qualidade/tamanho |
| Logos e ícones | **SVG** ou **PNG** | Vetorial = escalável sem perda |

### Dimensões Recomendadas

- **Fotos da equipe:** `400x400px` (quadrada, 1:1)
- **Imagens de projetos:** `800x450px` (widescreen, 16:9)
- **Imagens grandes:** máximo `1200px` de largura

### Otimização (Importante!)

Antes de adicionar imagens, **sempre otimize** para reduzir o tempo de carregamento:

1. **Ferramentas online gratuitas:**
   - [TinyPNG](https://tinypng.com/) - PNG e JPG
   - [Squoosh](https://squoosh.app/) - Todos os formatos + WebP

2. **Tamanho máximo recomendado:**
   - Fotos da equipe: **< 100KB**
   - Imagens de projetos: **< 200KB**

3. **Conversão para WebP** (opcional, mas recomendado):
   ```bash
   # Se tiver o cwebp instalado
   cwebp -q 80 imagem.jpg -o imagem.webp
   ```

### Onde Colocar as Imagens

```
public/
└── images/
    ├── team/              # 👥 Fotos da equipe
    │   ├── renato.png
    │   ├── evelin.png
    │   └── avatar-placeholder.jpg
    ├── inct-iamazonia.jpg # 📂 Imagens de projetos
    ├── brasil-plus-plus.png
    └── mina-do-futuro.jpg
```

### Nomeação de Arquivos

✅ **Boas práticas:**
- Use letras minúsculas: `joao-silva.png`
- Use hífens ao invés de espaços: `mina-do-futuro.jpg`
- Seja descritivo: `projeto-saude-ia.jpg`

❌ **Evite:**
- Espaços: `João Silva.png`
- Caracteres especiais: `foto_André.png`
- Nomes genéricos: `img1.jpg`, `foto.png`

---

## 🌐 Deploy na Vercel

O site é hospedado na **Vercel** com deploy automático. Para atualizar o site:

### 1. Faça suas alterações localmente

Edite o arquivo `lib/content.ts` ou outros arquivos necessários.

### 2. Commit e Push

```bash
# Verifique as alterações
git status

# Adicione os arquivos modificados
git add .

# Faça o commit com uma mensagem descritiva
git commit -m "Adiciona novo projeto X" 

# Envie para o GitHub
git push origin main
```

### 3. Deploy Automático

Após o push, a **Vercel** irá automaticamente:
1. Detectar as mudanças no repositório
2. Fazer o build do projeto
3. Publicar a nova versão

⏱️ O processo leva aproximadamente **1-2 minutos**. Você pode acompanhar em:
**[Vercel Dashboard](https://vercel.com/dashboard)** → Seu projeto → Deployments

---

## 📁 Estrutura de Pastas

```
labcity/
├── app/                    # Páginas (App Router Next.js)
│   ├── page.tsx           # Home
│   ├── equipe/            # Página da equipe
│   ├── projetos/          # Lista e detalhe de projetos
│   └── publicacoes/       # Lista e detalhe de publicações
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Seções da home (Hero, Team, Projects, etc.)
│   └── ui/                # Componentes reutilizáveis
├── lib/
│   ├── content.ts         # 📌 CONTEÚDO DO SITE (equipe, projetos, publicações)
│   └── utils.ts           # Funções utilitárias
├── public/
│   └── images/            # Imagens do site
│       └── team/          # Fotos da equipe
└── package.json
```

---

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Verifica erros de código |

---

## 📧 Contato

**Email:** haylaluiza_almeida@hotmail.com  
**Website:** [https://labcity-github-io.vercel.app/](https://labcity-github-io.vercel.app/)
