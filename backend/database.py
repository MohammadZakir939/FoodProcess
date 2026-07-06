from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

DATABASE_URL = os.getenv("DATABASE_URL")

print("DATABASE_URL loaded:", DATABASE_URL is not None)

# Create database engine
engine = create_engine(DATABASE_URL)
Base = declarative_base()

# Create session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Test database connection
try:
    with engine.connect() as connection:
        print("✅ Connected to Supabase successfully!")
except Exception as e:
    import traceback
    print("❌ Connection failed!")
    traceback.print_exc()
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()