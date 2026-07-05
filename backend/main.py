from fastapi import FastAPI, Query, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import get_db
from models import Inventory

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Food(BaseModel):
    name: str
    category: str
    quantity: int


food_items = [
    {
        "id": 1,
        "name": "Tomato",
        "category": "Vegetable",
        "quantity": 100,
    },
    {
        "id": 2,
        "name": "Rice",
        "category": "Grain",
        "quantity": 50,
    },
]


@app.get("/")
def home():
    return {"message": "Food Process API is running"}


# Reads from Supabase
@app.get("/api/foods")
def get_foods(db: Session = Depends(get_db)):
    foods = db.query(Inventory).all()

    return [
        {
            "id": food.id,
            "name": food.product_name,
            "quantity": food.quantity,
            "category": food.unit,
        }
        for food in foods
    ]


@app.get("/api/foods/search")
def search_foods(q: str = Query(...), db: Session = Depends(get_db)):
    foods = db.query(Inventory).filter(
        Inventory.product_name.ilike(f"%{q}%")
    ).all()

    return [
        {
            "id": food.id,
            "name": food.product_name,
            "category": food.unit,
            "quantity": food.quantity
        }
        for food in foods
    ]


@app.get("/api/foods/{food_id}")
def get_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(Inventory).filter(Inventory.id == food_id).first()

    if not food:
        return {"error": "Food item not found"}

    return {
        "id": food.id,
        "name": food.product_name,
        "category": food.unit,
        "quantity": food.quantity
    }

@app.post("/api/foods")
def create_food(food: Food, db: Session = Depends(get_db)):

    new_food = Inventory(
        product_name=food.name,
        quantity=food.quantity,
        unit=food.category
    )

    db.add(new_food)
    db.commit()
    db.refresh(new_food)

    return {
        "id": new_food.id,
        "name": new_food.product_name,
        "category": new_food.unit,
        "quantity": new_food.quantity
    }


@app.put("/api/foods/{food_id}")
def update_food(food_id: int, updated_food: Food, db: Session = Depends(get_db)):
    food = db.query(Inventory).filter(Inventory.id == food_id).first()

    if not food:
        return {"error": "Food item not found"}

    food.product_name = updated_food.name
    food.unit = updated_food.category
    food.quantity = updated_food.quantity

    db.commit()
    db.refresh(food)

    return {
        "id": food.id,
        "name": food.product_name,
        "category": food.unit,
        "quantity": food.quantity
    }

@app.delete("/api/foods/{food_id}")
def delete_food(food_id: int, db: Session = Depends(get_db)):
    food = db.query(Inventory).filter(Inventory.id == food_id).first()

    if not food:
        return {"error": "Food item not found"}

    db.delete(food)
    db.commit()

    return {"message": "Food item deleted successfully"}