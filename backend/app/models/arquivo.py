from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Arquivo(Base):
    __tablename__ = "arquivos"

    id = Column(Integer, primary_key=True, index=True)

    nome_arquivo = Column(String(255))

    url_s3 = Column(String(500))

    tarefa_id = Column(Integer, ForeignKey("tarefas.id"))

    tarefa = relationship("Tarefa")