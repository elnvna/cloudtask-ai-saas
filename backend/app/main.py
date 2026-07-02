from fastapi import FastAPI
from sqlalchemy import text
import app.models

from app.database.connection import Base, engine
from app.routes.uploads import router as upload_router
from app.routes.dashboard import router as dashboard_router

from app.routes import usuarios
from app.routes import auth
from app.routes import tarefas

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CloudTask AI SaaS",
    description="API REST para gerenciamento de tarefas",
    version="1.0.0"
)

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router)
app.include_router(auth.router)
app.include_router(tarefas.router)
app.include_router(upload_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {
        "status": "online",
        "projeto": "CloudTask AI SaaS",
        "versao": "1.0.0"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/database")
def database():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "database": "Conectado com sucesso!"
        }

    except Exception as erro:
        return {
            "database": "Erro na conexão",
            "erro": str(erro)
        }