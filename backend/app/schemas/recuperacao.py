from pydantic import BaseModel, EmailStr


class RecuperacaoSenha(BaseModel):
    email: EmailStr


class RedefinirSenhaRequest(BaseModel):
    email: EmailStr
    nova_senha: str