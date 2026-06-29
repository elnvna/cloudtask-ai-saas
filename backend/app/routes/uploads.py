from pathlib import Path
import shutil
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.arquivo import Arquivo
from app.models.tarefa import Tarefa
from app.models.usuario import Usuario
from app.auth.dependencies import obter_usuario_logado

router = APIRouter(
    prefix="/uploads",
    tags=["Uploads"]
)

# Pasta onde os arquivos serão armazenados
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/{tarefa_id}")
def upload_arquivo(
    tarefa_id: int,
    arquivo: UploadFile = File(...),
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

    extensao = Path(arquivo.filename).suffix

    nome_unico = f"{uuid.uuid4()}{extensao}"

    caminho = UPLOAD_DIR / nome_unico

    with open(caminho, "wb") as buffer:
        shutil.copyfileobj(arquivo.file, buffer)

    novo_arquivo = Arquivo(
        nome=nome_unico,
        caminho=str(caminho),
        tipo=arquivo.content_type,
        tamanho=caminho.stat().st_size,
        tarefa_id=tarefa.id
    )

    db.add(novo_arquivo)
    db.commit()
    db.refresh(novo_arquivo)

    return {
        "mensagem": "Arquivo enviado com sucesso.",
        "arquivo_id": novo_arquivo.id
    }

@router.get("/{tarefa_id}")
def listar_arquivos(
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

    arquivos = db.query(Arquivo).filter(
        Arquivo.tarefa_id == tarefa_id
    ).all()

    return arquivos

@router.delete("/{arquivo_id}")
def excluir_arquivo(
    arquivo_id: int,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(obter_usuario_logado)
):

    arquivo = (
        db.query(Arquivo)
        .join(Tarefa)
        .filter(
            Arquivo.id == arquivo_id,
            Tarefa.usuario_id == usuario.id
        )
        .first()
    )

    if not arquivo:
        raise HTTPException(
            status_code=404,
            detail="Arquivo não encontrado."
        )

    caminho = Path(arquivo.caminho)

    if caminho.exists():
        caminho.unlink()

    db.delete(arquivo)
    db.commit()

    return {
        "mensagem": "Arquivo excluído com sucesso."
    }