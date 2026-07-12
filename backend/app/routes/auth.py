from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.usuario import Usuario
from app.auth.password import verificar_senha
from app.auth.jwt import criar_token
from app.schemas.recuperacao import RecuperacaoSenha
from app.auth.jwt import criar_token_recuperacao

router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"]
)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter(
        Usuario.email == form_data.username
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos."
        )

    if not verificar_senha(
        form_data.password,
        usuario.senha
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos."
        )

    token = criar_token(
        {"sub": str(usuario.id)}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/esqueci-senha")
def esqueci_senha(
    dados: RecuperacaoSenha,
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter(
        Usuario.email == dados.email
    ).first()

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="E-mail não encontrado."
        )

    token = criar_token_recuperacao(usuario.email)

    return {
        "mensagem": "Link de recuperação gerado.",
        "token": token
    }