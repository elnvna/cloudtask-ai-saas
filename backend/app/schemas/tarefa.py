from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from typing import Literal


class TarefaBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    prioridade: str = "Media"


class TarefaCreate(BaseModel):
    titulo: str
    descricao: str
    prioridade: Literal["Baixa", "Media", "Alta"]


class TarefaUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    prioridade: Optional[Literal["Baixa", "Media", "Alta"]] = None
    status: Optional[Literal["Pendente", "Em andamento", "Concluida"]] = None


class TarefaResponse(TarefaBase):
    id: int
    status: str
    usuario_id: int
    data_criacao: datetime
    data_conclusao: Optional[datetime]

    class Config:
        from_attributes = True