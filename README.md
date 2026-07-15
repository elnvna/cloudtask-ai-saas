# 🚀 CloudTask AI - SaaS Platform

Desenvolver o sistema **CloudTask AI SaaS** utilizando tecnologias modernas de Computação em Nuvem, aplicando conceitos de arquitetura cloud-native, containers, Kubernetes, banco de dados em nuvem, armazenamento de arquivos e segurança.

## 📋 Sobre o Projeto

CloudTask AI é uma plataforma SaaS para gerenciamento de tarefas com inteligência artificial integrada, desenvolvida como demonstração prática de conhecimentos em arquitetura cloud-native, containerização e orquestração.

### ✨ Características Principais

- ✅ **Autenticação Segura** - JWT e hash de senha
- 📝 **Gerenciamento de Tarefas** - CRUD completo com prioridades e status
- 👤 **Perfil de Usuário** - Edição de dados e alteração de senha
- 🌙 **Tema Escuro** - Interface adaptável com Material-UI
- 📱 **Interface Responsiva** - Funciona em desktop e mobile
- 🔐 **Segurança** - Autenticação JWT, senhas criptografadas
- ☁️ **Cloud-Native** - Containerizado com Docker e orquestrado com Kubernetes

## 🛠️ Stack Tecnológico

### Frontend
- **React** 18+ com TypeScript
- **Material-UI (MUI)** - Componentes e tema
- **Vite** - Build tool moderno
- **Axios** - Cliente HTTP
- **React Router** - Roteamento

### Backend
- **FastAPI** - Framework web moderno
- **PostgreSQL** - Banco de dados
- **SQLAlchemy** - ORM
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas

### DevOps & Cloud
- **Docker** - Containerização
- **Docker Compose** - Orquestração local
- **Kubernetes** - Orquestração em produção
- **ConfigMap & Secrets** - Gerenciamento de configurações

## 📦 Estrutura do Projeto

```
cloudtask-ai-saas/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── contexts/        # Context API (Auth, Theme, Notifications)
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # Chamadas à API
│   │   └── types/           # Tipos TypeScript
│   └── package.json
├── backend/                  # API FastAPI
│   ├── app/
│   │   ├── main.py          # Arquivo principal
│   │   ├── auth/            # Autenticação
│   │   ├── database/        # Configuração do BD
│   │   ├── models/          # Modelos SQLAlchemy
│   │   ├── routes/          # Rotas da API
│   │   ├── schemas/         # Schemas Pydantic
│   │   └── uploads/         # Gerenciamento de uploads
│   └── requirements.txt
├── k8s/                      # Manifestos Kubernetes
├── docker-compose.yml        # Composição local
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento frontend sem Docker)
- Python 3.11+ (para desenvolvimento backend sem Docker)
- Git

### Execução com Docker Compose (Recomendado)

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/cloudtask-ai-saas.git
cd cloudtask-ai-saas
```

2. **Inicie os containers:**
```bash
docker-compose up -d
```

3. **Acesse a aplicação:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Documentação API: http://localhost:8000/docs

### Execução Local (Desenvolvimento)

#### Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente (Windows)
venv\Scripts\activate

# Ativar ambiente (Linux/Mac)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar servidor
uvicorn app.main:app --reload
```

O servidor estará em `http://localhost:8000`

#### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
```

A aplicação estará em `http://localhost:5173`

## 📚 Endpoints da API

### Autenticação
- `POST /auth/login` - Fazer login
- `POST /auth/register` - Registrar novo usuário

### Usuários
- `GET /usuarios/perfil` - Obter perfil do usuário
- `PUT /usuarios/perfil` - Atualizar perfil
- `POST /usuarios/alterar-senha` - Alterar senha

### Tarefas
- `GET /tarefas` - Listar tarefas
- `POST /tarefas` - Criar tarefa
- `PUT /tarefas/{id}` - Atualizar tarefa
- `DELETE /tarefas/{id}` - Deletar tarefa

### Uploads
- `POST /uploads` - Upload de arquivo
- `GET /uploads/{id}` - Baixar arquivo

## 🔑 Credenciais Padrão

> ⚠️ **Nota**: Altere as credenciais em produção!

**PostgreSQL:**
- Usuário: `postgres`
- Senha: `post1425`

## 🎨 Features Recentes

### ✨ Polimento Final v1.0
- ✅ Snackbars padronizados com Context API
- ✅ Loading estados em todos os botões de ação
- ✅ Página 404 personalizada
- ✅ Tema escuro completamente funcional
- ✅ Melhorias na UX e acessibilidade

## 📷 Screenshots

<!-- Adicionar screenshots da aplicação -->
[Espaço para screenshots - Dashboard, Login, Tarefas, etc.]

## 🧪 Testes

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm test
```

## 🐳 Implantação com Kubernetes

### Deploy no cluster

```bash
# Criar namespace
kubectl apply -f k8s/namespace.yaml

# Aplicar secrets
kubectl apply -f k8s/secret.yaml

# Aplicar configmap
kubectl apply -f k8s/configmap.yaml

# Fazer deploy
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# PostgreSQL
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/postgres-service.yaml
```

### Acessar aplicação (port-forward)

```bash
kubectl port-forward svc/cloudtask-service 8000:8000 -n cloudtask
```

## 📖 Documentação Adicional

- [Documentação FastAPI](http://localhost:8000/docs) - Swagger UI
- [Documentação API](/docs) - Postman collection
- [Guia de Desenvolvimento](/docs/DEVELOPMENT.md) - Como contribuir

## 🔒 Segurança

- ✅ Autenticação JWT com refresh tokens
- ✅ Senhas criptografadas com bcrypt
- ✅ CORS configurado
- ✅ Validação de entrada com Pydantic
- ✅ Proteção contra SQL Injection (SQLAlchemy)
- ✅ Variáveis de ambiente para dados sensíveis

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto educacional de Computação em Nuvem.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Última atualização:** 2024
**Versão:** 1.0.0