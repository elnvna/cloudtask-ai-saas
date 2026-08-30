# CloudTask AI SaaS

Sistema web para gerenciamento de tarefas desenvolvido com arquitetura baseada em aplicação frontend, API backend e banco de dados PostgreSQL.

O projeto foi utilizado como base para a aplicação prática dos conceitos de DevOps, incluindo controle de versão com Git e GitHub, organização por branches, integração contínua, conteinerização com Docker e documentação do processo de desenvolvimento.

---

## 🎯 Objetivo do projeto

O CloudTask AI SaaS tem como objetivo disponibilizar uma aplicação para gerenciamento de tarefas, permitindo autenticação de usuários, criação e gerenciamento de tarefas e utilização de recursos relacionados a arquivos.

Além do desenvolvimento da aplicação, o projeto busca aplicar práticas de DevOps para melhorar a organização, automação, integração e entrega do software.

---

## 🚀 Funcionalidades

- Cadastro e gerenciamento de usuários
- Autenticação de usuários
- Autenticação baseada em JWT
- Login
- Recuperação de acesso
- Gerenciamento de tarefas
- Criação, consulta, atualização e exclusão de tarefas
- Upload de arquivos relacionados às tarefas
- Dashboard
- Página de perfil
- Página de configurações
- Interface responsiva
- Tema claro e escuro

---

## 🏗️ Arquitetura

O projeto é dividido em três principais componentes:

```text
CloudTask AI SaaS
│
├── Frontend
│   └── React + TypeScript + Vite
│
├── Backend
│   └── FastAPI + Python
│
└── Banco de Dados
    └── PostgreSQL
```

Durante a execução com Docker Compose:

```text
                ┌──────────────────────┐
                │      Frontend        │
                │ React + TypeScript   │
                │       + Vite         │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │       Backend        │
                │   FastAPI + Python   │
                │       :8000          │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │     PostgreSQL       │
                │        :5432         │
                └──────────────────────┘
```

---

## 🛠️ Tecnologias utilizadas

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router

### Backend

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- JWT

### Banco de dados

- PostgreSQL 16

### DevOps

- Git
- GitHub
- GitHub Actions
- Docker
- Docker Compose

---

## 📁 Estrutura do projeto

```text
cloudtask-ai-saas/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routes/
│   │   └── schemas/
│   │
│   ├── uploads/
│   ├── .env.example
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   └── services/
│   │
│   ├── package.json
│   └── package-lock.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚙️ Pré-requisitos

Para executar o projeto localmente, é necessário possuir:

- Git
- Python 3.13
- Node.js
- npm
- Docker
- Docker Compose

---

## 🔐 Variáveis de ambiente

As informações sensíveis do projeto não devem ser versionadas no Git.

O projeto utiliza arquivos `.env` para configurações locais.

O arquivo de exemplo está disponível em:

```text
backend/.env.example
```

Para utilização local, configure as variáveis de ambiente necessárias de acordo com o arquivo de exemplo.

> O arquivo `.env` é ignorado pelo Git através do `.gitignore`.

---

## 🐳 Execução com Docker

O projeto possui configuração Docker Compose para executar o backend e o PostgreSQL.

Na raiz do projeto:

```powershell
docker compose up -d
```

Para verificar os containers:

```powershell
docker compose ps
```

Para consultar os logs do backend:

```powershell
docker compose logs backend
```

Para consultar os logs do PostgreSQL:

```powershell
docker compose logs postgres
```

Para parar os containers:

```powershell
docker compose down
```

### Serviços

| Serviço | Porta | Descrição |
|---|---:|---|
| Backend | 8000 | API FastAPI |
| PostgreSQL | 5432 | Banco de dados |

---

## 🗄️ PostgreSQL

O banco de dados utilizado pelo projeto é executado através de um container PostgreSQL.

Configurações utilizadas no ambiente Docker:

```text
Banco: cloudtask
Usuário: postgres
Porta: 5432
```

O Docker Compose utiliza um volume persistente para os dados do PostgreSQL:

```text
postgres_data
```

Dessa forma, os dados do banco permanecem armazenados mesmo quando os containers são recriados.

---

## 📡 API

O backend foi desenvolvido utilizando FastAPI.

Com o backend em execução, a documentação interativa da API pode ser acessada em:

```text
http://localhost:8000/docs
```

Também é possível consultar o documento OpenAPI em:

```text
http://localhost:8000/openapi.json
```

---

## 🔑 Autenticação

A aplicação utiliza autenticação baseada em JWT (JSON Web Token).

O fluxo de autenticação consiste em:

```text
Usuário
   │
   ▼
Login
   │
   ▼
Backend
   │
   ▼
Validação das credenciais
   │
   ▼
JWT
   │
   ▼
Acesso às rotas protegidas
```

As configurações relacionadas à autenticação são mantidas através de variáveis de ambiente.

---

## 🌿 Estratégia de branches

O projeto utiliza branches para organizar o desenvolvimento e separar alterações antes da integração.

Branches utilizadas no projeto:

```text
main
│
└── desenvolvimento
    │
    └── feature/docker
```

Também existe a branch:

```text
feature-projeto-DEVOPS
```

O fluxo adotado consiste em desenvolver alterações em branches específicas e posteriormente realizar a integração através de Pull Requests.

---

## 🔄 Fluxo de desenvolvimento

O fluxo utilizado no projeto segue uma abordagem baseada em Git Flow simplificado:

```text
Desenvolvimento
      │
      ▼
Feature Branch
      │
      ▼
Commit
      │
      ▼
Push
      │
      ▼
Pull Request
      │
      ▼
Integração
      │
      ▼
Branch desenvolvimento
      │
      ▼
Main
```

Essa organização permite revisar alterações antes de integrá-las ao código principal.

---

## 🔀 Pull Requests

As alterações desenvolvidas nas branches de funcionalidade são integradas através de Pull Requests.

O Pull Request permite:

- Revisão das alterações
- Visualização dos arquivos modificados
- Verificação da pipeline
- Registro do processo de integração
- Histórico das alterações

---

## ⚙️ Integração Contínua — GitHub Actions

O projeto possui uma pipeline de Integração Contínua utilizando GitHub Actions.

O arquivo da pipeline está localizado em:

```text
.github/workflows/ci.yml
```

A pipeline é executada em alterações realizadas nas branches configuradas.

### Backend

A etapa do backend realiza:

1. Checkout do código
2. Configuração do Python
3. Instalação das dependências
4. Validação da aplicação através do `compileall`

Comando utilizado:

```bash
python -m compileall app
```

### Frontend

A etapa do frontend realiza:

1. Checkout do código
2. Configuração do Node.js
3. Instalação das dependências
4. Build da aplicação

Comandos utilizados:

```bash
npm ci
npm run build
```

---

## 🧪 Validação do projeto

### Backend

A aplicação pode ser validada através da execução dos containers:

```powershell
docker compose ps
```

O backend deve apresentar status de execução.

Também podem ser consultados os logs:

```powershell
docker compose logs backend
```

### Frontend

Para validar o build de produção:

```powershell
cd frontend
npm run build
```

O build deve ser concluído com sucesso.

---

## 📦 Docker Compose

O Docker Compose é responsável pela orquestração dos serviços utilizados localmente.

Serviços configurados:

```yaml
services:
  postgres:
  backend:
```

O backend depende da disponibilidade do PostgreSQL através de um healthcheck.

O PostgreSQL utiliza:

```text
healthcheck:
  pg_isready -U postgres -d cloudtask
```

Isso permite que o backend seja iniciado após o banco estar disponível.

---

## 🔒 Segurança e boas práticas

O projeto utiliza algumas práticas para evitar o versionamento de arquivos desnecessários ou sensíveis.

Entre eles:

```text
.env
.env.*
__pycache__/
venv/
node_modules/
*.log
```

O arquivo:

```text
.env.example
```

é mantido no repositório para documentar as variáveis necessárias sem expor informações sensíveis.

---

## 📊 Status da implementação DevOps

| Recurso | Status |
|---|---|
| Git | Concluído |
| GitHub | Concluído |
| Branches | Concluído |
| Pull Request | Concluído |
| Merge | Concluído |
| Docker | Concluído |
| Docker Compose | Concluído |
| PostgreSQL | Concluído |
| GitHub Actions | Concluído |
| CI Backend | Concluído |
| CI Frontend | Concluído |
| README | Concluído |
| Kubernetes | Em desenvolvimento |
| AWS | Em desenvolvimento |

---

## 🎓 Trabalho acadêmico

O projeto CloudTask AI SaaS foi utilizado como aplicação prática dos conceitos de DevOps estudados durante a disciplina.

O desenvolvimento contempla práticas relacionadas a:

- Controle de versão
- Integração contínua
- Automação
- Conteinerização
- Organização do fluxo de desenvolvimento
- Gerenciamento de código
- Documentação
- Preparação para implantação em ambiente de nuvem

---

## 👩‍💻 Autora

**Elaine Dias**

Projeto acadêmico — Análise e Desenvolvimento de Sistemas.