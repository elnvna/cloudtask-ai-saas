from datetime import datetime, timedelta
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


def criar_token(dados: dict):

    dados_token = dados.copy()

    expira = datetime.utcnow() + timedelta(minutes=30)

    dados_token.update({"exp": expira})

    token = jwt.encode(
        dados_token,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token