from sqlalchemy.ext.asyncio import create_async_engine

try:
    engine = create_async_engine("postgresql://user:pass@localhost/db")
except Exception as e:
    print(f"ERROR: {type(e).__name__} - {e}")
