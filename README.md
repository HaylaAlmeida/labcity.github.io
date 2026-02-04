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

## 📝 Como Adicionar Conteúdo (CMS)

O site utiliza **Sanity CMS** para gerenciamento de conteúdo dinâmico. Isso permite que você edite textos, imagens e dados sem precisar alterar o código.

### 1. Acessando o Painel Administrativo

Você pode acessar o painel tanto localmente quanto na produção (Vercel).

**Local:**
1. Inicie o projeto `npm run dev`
2. Acesse: [http://localhost:3000/studio](http://localhost:3000/studio)

**Produção (Online):**
- Acesse: `https://seu-site.vercel.app/studio`
- (No seu caso: [https://labcity-github-io.vercel.app/studio](https://labcity-github-io.vercel.app/studio))

Você verá o painel do Sanity (Sanity Studio). Faça login com sua conta configurada.

---

### 2. Gerenciando Seções

#### 🏙️ Projetos
- No menu lateral, clique em **Projects**.
- Preencha: Título, Slug (URL), Imagem de Capa, Descrição Curta (Card) e Longa.
- **Destaque:** Marque "Featured" para aparecer na Home.
- **Relacionamentos:**
  - *Research Areas:* Vincule às linhas de pesquisa.
  - *Partners:* Vincule aos parceiros envolvidos.

#### 📚 Publicações
- Clique em **Publications**.
- **Tipo:** Selecione corretamente (ex: *Artigo Científico* para aparecer a pílula azul).
- **Autores:** Você pode criar referências a pessoas cadastradas ou digitar os nomes manualmente.
- **Vínculos:** Vincule a *Projetos* e *Linhas de Pesquisa* para que ela apareça automaticamente nas páginas detalhadas correspondentes.

#### 🖼️ Galeria "O que é o LabCity"
- Clique em **Sobre (O que é o LabCity?)**.
- Este é um documento único.
- Adicione/remova imagens na **Galeria de Fotos**. Use o campo "Legenda" para descrições.
- As imagens aparecerão no slider da página `/sobre`.

#### 🤝 Parceiros
- Clique em **Partners**.
- Cadastre o parceiro com Logo e Website.
- **Categoria:** Escolha o tipo (Acadêmico, Governamental, Privado, etc.) para que sejam agrupados corretamente na página de parcerias.

#### 👥 Equipe
- Clique em **People**.
- Adicione membros com Foto, Cargo, Lattes/LinkedIn.
- Defina o nível (Coordenador, Pesquisador, Aluno) para organização na página `/equipe`.

---

## ⚠️ Conteúdo Estático (Legado)

Caso o CMS não esteja configurado ou para dados muito específicos, o site usa arquivos locais como fallback:

- `lib/content.ts`: Dados estáticos gerais.
- `app/`: Textos fixos das páginas.

Para alterar textos fixos (como títulos de seções), edite diretamente os arquivos `.tsx` em `app/(site)/`.

---

## 🖼️ Boas Práticas para Imagens

### Formatos Recomendados

| Tipo de Imagem | Formato | Motivo |
|----------------|---------|--------|
| Fotos da equipe | **PNG** ou **WebP** | Melhor qualidade para rostos |
| Imagens de projetos | **JPG** ou **WebP** | Bom equilíbrio qualidade/tamanho |
| Logos e ícones | **SVG** ou **PNG** | Vetorial = escalável sem perda |

### Otimização (Importante!)

Antes de adicionar imagens, **sempre otimize** para reduzir o tempo de carregamento:

1. **Ferramentas online gratuitas:**
   - [TinyPNG](https://tinypng.com/) - PNG e JPG
   - [Squoosh](https://squoosh.app/) - Todos os formatos + WebP

2. **Tamanho máximo recomendado:**
   - Fotos da equipe: **< 100KB**
   - Imagens de projetos: **< 200KB**


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

O site é hospedado na **Vercel** com deploy automático.

1. Faça suas alterações (no código ou no Sanity).
2. Se alterou código:
   ```bash
   git add .
   git commit -m "feat: melhoria na galeria"
   git push origin main
   ```
3. A Vercel detectará o push e fará o deploy.

**Nota sobre o Sanity:** Alterações feitas no **Sanity Studio** (publicar posts, projetos) aparecem no site de produção automaticamente após alguns minutos (graças à revalidação ISR) ou imediatamente em um novo deploy.

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

## 📧 Contato / Suporte

**Email:** haylaluiza_almeida@hotmail.com
**Repositório:** [GitHub](https://github.com/HaylaAlmeida/labcity.github.io)
