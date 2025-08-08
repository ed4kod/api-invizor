from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    username: str
    password: str
    email: str
    fullname: str


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    email: Optional[str] = None
    fullname: Optional[str] = None


class UserInDB(UserBase):
    id: int

    class Config:
        orm_mode = True