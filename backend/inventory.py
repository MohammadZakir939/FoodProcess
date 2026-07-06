from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Inventory
from schemas import InventoryCreate

router = APIRouter()

@router.post("/inventory")
def add_item(item: InventoryCreate, db: Session = Depends(get_db)):
    new_item = Inventory(**item.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@router.get("/inventory")
def get_items(db: Session = Depends(get_db)):
    return db.query(Inventory).all()