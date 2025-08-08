from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from api.schemas import UserCreate, UserUpdate, UserInDB
from api.crud import get_user_by_id, get_user_by_username, get_users, create_user, update_user, delete_user
from api.config import get_async_session

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserInDB)
async def create_user_endpoint(user: UserCreate, db: AsyncSession = Depends(get_async_session)):
    existing_user = await get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    created_user = await create_user(db, user)
    return created_user


@router.get("/{user_id}", response_model=UserInDB)
async def read_user(user_id: int, db: AsyncSession = Depends(get_async_session)):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/", response_model=List[UserInDB])
async def read_users(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_async_session)):
    users = await get_users(db, skip=skip, limit=limit)
    return users


@router.put("/{user_id}", response_model=UserInDB)
async def update_user_endpoint(user_id: int, user_update: UserUpdate, db: AsyncSession = Depends(get_async_session)):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = await update_user(db, user, user_update)
    return updated_user


@router.delete("/{user_id}")
async def delete_user_endpoint(user_id: int, db: AsyncSession = Depends(get_async_session)):
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await delete_user(db, user)
    return {"detail": "User deleted"}
