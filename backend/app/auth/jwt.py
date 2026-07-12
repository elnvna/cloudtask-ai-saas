from datetime import datetime, timedelta
from jose import jwt, JWTError
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


def criar_token(dados: dict):

    dados_token = dados.copy()

    expira = datetime.utcnow() + timedelta(minutes=30)

    dados_token.update({"exp": expira})

    return jwt.encode(
        dados_token,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def criar_token_recuperacao(usuario_id: int):

    dados = {
        "sub": str(usuario_id),
        "tipo": "recuperacao",
        "exp": datetime.utcnow() + timedelta(minutes=15)
    }

    return jwt.encode(
        dados,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def validar_token_recuperacao(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("tipo") != "recuperacao":
            return None

        return int(payload["sub"])

    except JWTError:
        return None