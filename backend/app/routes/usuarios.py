from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.usuario import Usuario
from app.schemas.usuario import (
    AlterarSenha,
    UsuarioCreate,
    UsuarioResponse,
    UsuarioUpdate,
)
from app.auth.password import gerar_hash
from app.auth.dependencies import obter_usuario_logado
from app.auth.password import (
    gerar_hash,
    verificar_senha
)

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"]
)


# ==========================================================
# Criar usuário
# ==========================================================

@router.post("/", response_model=UsuarioResponse)
def criar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db)
):

    existe = db.query(Usuario).filter(
        Usuario.email == usuario.email
    ).first()

    if existe:
        raise HTTPException(
            status_code=400,
            detail="E-mail já cadastrado."
        )

    novo = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        senha=gerar_hash(usuario.senha)
    )

    db.add(novo)
    db.commit()
    db.refresh(novo)

    return novo


# ==========================================================
# Listar usuários
# ==========================================================

@router.get("/", response_model=list[UsuarioResponse])
def listar_usuarios(
    usuario_logado: Usuario = Depends(obter_usuario_logado),
    db: Session = Depends(get_db)
):

    return db.query(Usuario).all()


# ==========================================================
# Perfil do usuário logado
# ==========================================================

@router.get("/me", response_model=UsuarioResponse)
def obter_meu_perfil(

    usuario: Usuario = Depends(
        obter_usuario_logado
    )

):

    return usuario


# ==========================================================
# Atualizar perfil do usuário logado
# ==========================================================

@router.put("/me", response_model=UsuarioResponse)
def atualizar_meu_perfil(

    dados: UsuarioUpdate,

    usuario: Usuario = Depends(
        obter_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    if dados.nome is not None:
        usuario.nome = dados.nome

    if dados.email is not None:
        usuario.email = dados.email

    if dados.senha is not None:
        usuario.senha = gerar_hash(dados.senha)

    db.commit()
    db.refresh(usuario)

    return usuario

@router.put("/alterar-senha")
def alterar_senha(

    dados: AlterarSenha,

    usuario: Usuario = Depends(obter_usuario_logado),

    db: Session = Depends(get_db)

):

    if not verificar_senha(

        dados.senha_atual,

        usuario.senha

    ):

        raise HTTPException(

            status_code=400,

            detail="Senha atual incorreta."

        )

    usuario.senha = gerar_hash(

        dados.nova_senha

    )

    db.commit()

    return {

        "mensagem": "Senha alterada com sucesso."

    }

# ==========================================================
# Buscar usuário por ID
# ==========================================================

@router.get("/{usuario_id}", response_model=UsuarioResponse)
def buscar_usuario(

    usuario_id: int,

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.id == usuario_id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado."
        )

    return usuario


# ==========================================================
# Atualizar usuário por ID
# ==========================================================

@router.put("/{usuario_id}", response_model=UsuarioResponse)
def atualizar_usuario(

    usuario_id: int,

    dados: UsuarioUpdate,

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.id == usuario_id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado."
        )

    if dados.nome is not None:
        usuario.nome = dados.nome

    if dados.email is not None:
        usuario.email = dados.email

    if dados.senha is not None:
        usuario.senha = gerar_hash(dados.senha)

    db.commit()
    db.refresh(usuario)

    return usuario


# ==========================================================
# Excluir usuário
# ==========================================================

@router.delete("/{usuario_id}")
def excluir_usuario(

    usuario_id: int,

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.id == usuario_id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado."
        )

    db.delete(usuario)
    db.commit()

    return {
        "mensagem": "Usuário removido com sucesso."
    }