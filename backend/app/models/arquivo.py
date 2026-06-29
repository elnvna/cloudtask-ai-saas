from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.connection import Base


class Arquivo(Base):
    __tablename__ = "arquivos"

    id = Column(Integer, primary_key=True, index=True)

    nome = Column(String(255), nullable=False)

    caminho = Column(String(500), nullable=False)

    tipo = Column(String(100), nullable=False)

    tamanho = Column(Integer, nullable=False)

    data_upload = Column(DateTime, default=datetime.now)

    tarefa_id = Column(
        Integer,
        ForeignKey("tarefas.id"),
        nullable=False
    )

    tarefa = relationship(
        "Tarefa",
        back_populates="arquivos"
    )