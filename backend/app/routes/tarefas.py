from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.tarefa import Tarefa
from app.models.usuario import Usuario
from app.schemas.tarefa import TarefaCreate, TarefaResponse
from app.auth.dependencies import obter_usuario_logado

router = APIRouter(
    prefix="/tarefas",
    tags=["Tarefas"]
)


@router.post("/", response_model=TarefaResponse)
def criar_tarefa(
    tarefa: TarefaCreate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(obter_usuario_logado)
):

    nova_tarefa = Tarefa(
        titulo=tarefa.titulo,
        descricao=tarefa.descricao,
        prioridade=tarefa.prioridade,
        usuario_id=usuario.id
    )

    db.add(nova_tarefa)
    db.commit()
    db.refresh(nova_tarefa)

    return nova_tarefa


@router.get("/", response_model=list[TarefaResponse])
def listar_tarefas(
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(obter_usuario_logado)
):

    return db.query(Tarefa).filter(
        Tarefa.usuario_id == usuario.id
    ).all()