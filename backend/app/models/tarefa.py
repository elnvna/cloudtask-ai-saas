from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Tarefa(Base):
    __tablename__ = "tarefas"

    id = Column(Integer, primary_key=True, index=True)

    titulo = Column(String(200), nullable=False)

    descricao = Column(Text, nullable=True)

    status = Column(String(50), default="Pendente")

    prioridade = Column(String(20), default="Média")

    data_criacao = Column(DateTime(timezone=True), server_default=func.now())

    data_conclusao = Column(DateTime, nullable=True)

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    usuario = relationship("Usuario", back_populates="tarefas")