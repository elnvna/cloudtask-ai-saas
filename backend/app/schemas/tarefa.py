from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TarefaBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    prioridade: str = "Média"


class TarefaCreate(TarefaBase):
    pass


class TarefaUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    status: Optional[str] = None
    prioridade: Optional[str] = None
    data_conclusao: Optional[datetime] = None


class TarefaResponse(TarefaBase):
    id: int
    status: str
    usuario_id: int
    data_criacao: datetime
    data_conclusao: Optional[datetime]

    class Config:
        from_attributes = True