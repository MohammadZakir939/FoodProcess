from fastapi import FastAPI, Query, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from openai import OpenAI

from database import get_db, engine
from models import Inventory, User, Base

# -----------------------------
# Load Environment Variables
# -----------------------------
load_dotenv()
print("SECRET_KEY:", os.getenv("SECRET_KEY"))

# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# -----------------------------
# Security Configuration
# -----------------------------
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is missing in .env")

client = OpenAI(api_key=OPENAI_API_KEY)

if not SECRET_KEY:
    raise ValueError("SECRET_KEY is missing in .env")

# -----------------------------
# JWT Token Creation
# -----------------------------
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://foodprocess.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Food(BaseModel):
    name: str
    category: str
    quantity: int

class RegisterUser(BaseModel):
    username: str
    email: str
    password: str


class LoginUser(BaseModel):
    email: str
    password: str

class AIRequest(BaseModel):
    question: str

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

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Food Process API is running"}

def verify_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return email

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )


def get_current_user(
    authorization: str = Header(None)
):
    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid token format"
        )

    token = authorization.split(" ")[1]

    return verify_token(token)

# Reads from Supabase
@app.get("/api/foods")
def get_foods(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
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

@app.post("/api/auth/register")
def register(user: RegisterUser, db: Session = Depends(get_db)):

    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Hash the password
    hashed_password = pwd_context.hash(user.password)

    # Create new user
    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "username": new_user.username,
        "email": new_user.email
    }

@app.post("/api/auth/login")
def login(user: LoginUser, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user.username,
        "email": db_user.email
    }

from datetime import datetime

@app.get("/ai-insights")
def get_ai_insights(db: Session = Depends(get_db)):

    items = db.query(Inventory).all()

    insights = []

    if not items:
        return {"insights": ["No inventory data available."]}

    total_items = len(items)

    insights.append(f"Total inventory items: {total_items}")

    low_stock = [item.product_name for item in items if item.quantity < 10]

    if low_stock:
        insights.append(
            "Low stock items: " + ", ".join(low_stock)
        )

    high_stock = [item.product_name for item in items if item.quantity > 100]

    if high_stock:
        insights.append(
            "High stock items: " + ", ".join(high_stock)
        )

    return {
        "insights": insights
    }

@app.post("/chat")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    items = db.query(Inventory).all()

    inventory = "\n".join(
     [
        f"{item.product_name} - Quantity: {item.quantity} - Unit: {item.unit}"
        for item in items
     ]
    )
    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
    "role": "system",
    "content": f"""
You are an AI assistant for a Food Inventory Management System.

Current Inventory:

{inventory}

Answer questions using the inventory above.
If the user asks about stock levels, use this inventory.
""",
},
                {
                    "role": "user",
                    "content": request.message,
                },
            ],
            temperature=0.7,
            max_tokens=300,
        )

        return {
            "reply": response.choices[0].message.content
        }

    except Exception as e:
        return {
            "error": str(e)
        }