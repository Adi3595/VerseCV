import sys
import os
from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

# Add packages to path since we aren't installing them for this setup yet, or we assume they are installed.
# We will use the database directly.
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../packages/database")))

from multiverse_database.db import get_db

class AuthUser:
    def __init__(self, id, email, name):
        self.id = id
        self.email = email
        self.name = name

async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    # Try header first (if frontend passes Bearer token)
    auth_header = request.headers.get("Authorization")
    token = None
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
    
    # Try cookie (Better Auth default)
    if not token:
        token = request.cookies.get("better-auth.session_token")
        
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
        
    # Query the neon_auth schema used by Managed Better Auth
    query = text("""
        SELECT u.id, u.email, u.name 
        FROM neon_auth.session s
        JOIN neon_auth."user" u ON s.user_id = u.id
        WHERE s.token = :token AND s.expiresAt > now()
    """)
    result = await db.execute(query, {"token": token})
    row = result.fetchone()
    
    if not row:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session invalid or expired",
        )
        
    return AuthUser(row.id, row.email, row.name)
