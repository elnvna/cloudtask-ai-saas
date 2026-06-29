from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.connection import get_db
from app.models.tarefa import Tarefa
from app.models.arquivo import Arquivo
from app.models.usuario import Usuario
from app.auth.dependencies import obter_usuario_logado

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(obter_usuario_logado)
):

    total_tarefas = db.query(Tarefa).filter(
        Tarefa.usuario_id == usuario.id
    ).count()

    pendentes = db.query(Tarefa).filter(
        Tarefa.usuario_id == usuario.id,
        Tarefa.status == "Pendente"
    ).count()

    andamento = db.query(Tarefa).filter(
        Tarefa.usuario_id == usuario.id,
        Tarefa.status == "Em andamento"
    ).count()

    concluidas = db.query(Tarefa).filter(
        Tarefa.usuario_id == usuario.id,
        Tarefa.status == "Concluida"
    ).count()

    alta_prioridade = db.query(Tarefa).filter(
        Tarefa.usuario_id == usuario.id,
        Tarefa.prioridade == "Alta"
    ).count()

    total_arquivos = (
        db.query(func.count(Arquivo.id))
        .join(Tarefa)
        .filter(Tarefa.usuario_id == usuario.id)
        .scalar()
    )

    return {
        "usuario": usuario.nome,
        "total_tarefas": total_tarefas,
        "pendentes": pendentes,
        "em_andamento": andamento,
        "concluidas": concluidas,
        "alta_prioridade": alta_prioridade,
        "arquivos": total_arquivos
    }