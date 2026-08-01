FROM python:3.11-slim

WORKDIR /app

# Install system dependencies required for building Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and shared packages
COPY apps/api/requirements.txt ./apps/api/
COPY packages/ ./packages/

# Install dependencies
RUN pip install --no-cache-dir -r apps/api/requirements.txt
RUN pip install -e packages/database
RUN pip install -e packages/auth
RUN pip install -e packages/ai

# Copy application code
COPY apps/api/app ./apps/api/app

# Set PYTHONPATH so absolute imports work
ENV PYTHONPATH=/app/apps/api

WORKDIR /app/apps/api

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
