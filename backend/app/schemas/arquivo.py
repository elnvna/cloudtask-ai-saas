from pydantic import BaseModel
from datetime import datetime


class ArquivoResponse(BaseModel):
    id: int
    nome: str
    caminho: str
    tipo: str
    tamanho: int
    data_upload: datetime
    tarefa_id: int

    class Config:
        from_attributes = True