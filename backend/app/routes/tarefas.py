from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.tarefa import Tarefa
from app.models.usuario import Usuario
from app.schemas.tarefa import (
    TarefaCreate,
    TarefaResponse,
    TarefaUpdate
)
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
    status: Optional[str] = Query(None),
    prioridade: Optional[str] = Query(None),
    titulo: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(obter_usuario_logado)
):

    consulta = db.query(Tarefa).filter(
        Tarefa.usuario_id == usuario.id
    )

    if status:
        consulta = consulta.filter(
            Tarefa.status == status
        )

    if prioridade:
        consulta = consulta.filter(
            Tarefa.prioridade == prioridade
        )

    if titulo:
        consulta = consulta.filter(
            Tarefa.titulo.ilike(f"%{titulo}%")
        )

    tarefas = consulta.order_by(
        Tarefa.data_criacao.desc()
    ).all()

    return tarefas


@router.get("/{tarefa_id}", response_model=TarefaResponse)
def buscar_tarefa(
    tarefa_id: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(obter_usuario_logado)
):

    tarefa = db.query(Tarefa).filter(
        Tarefa.id == tarefa_id,
        Tarefa.usuario_id == usuario.id
    ).first()

    if not tarefa:
        raise HTTPException(
            status_code=404,
            detail="Tarefa não encontrada."
        )

    return tarefa


@router.put("/{tarefa_id}", response_model=TarefaResponse)
def atualizar_tarefa(
    tarefa_id: int,
    dados: TarefaUpdate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(obter_usuario_logado)
):

    tarefa = db.query(Tarefa).filter(
        Tarefa.id == tarefa_id,
        Tarefa.usuario_id == usuario.id
    ).first()

    if not tarefa:
        raise HTTPException(
            status_code=404,
            detail="Tarefa não encontrada."
        )

    if dados.titulo is not None:
        tarefa.titulo = dados.titulo

    if dados.descricao is not None:
        tarefa.descricao = dados.descricao

    if dados.prioridade is not None:
        tarefa.prioridade = dados.prioridade

    if dados.status is not None:
        tarefa.status = dados.status

        if dados.status == "Concluida":
            tarefa.data_conclusao = datetime.now()
        else:
            tarefa.data_conclusao = None

    db.commit()
    db.refresh(tarefa)

    return tarefa


@router.delete("/{tarefa_id}")
def excluir_tarefa(
    tarefa_id: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(obter_usuario_logado)
):

    tarefa = db.query(Tarefa).filter(
        Tarefa.id == tarefa_id,
        Tarefa.usuario_id == usuario.id
    ).first()

    if not tarefa:
        raise HTTPException(
            status_code=404,
            detail="Tarefa não encontrada."
        )

    db.delete(tarefa)
    db.commit()

    return {
        "mensagem": "Tarefa excluída com sucesso."
    }