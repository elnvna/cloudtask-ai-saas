from sqlalchemy import Column, Integer, String
from app.database.connection import Base
from sqlalchemy.orm import relationship

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)

    nome = Column(String(100), nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    senha = Column(String(255), nullable=False)

    tarefas = relationship(
    "Tarefa",
    back_populates="usuario",
    cascade="all, delete"
)