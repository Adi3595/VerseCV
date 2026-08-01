python -m venv venv
Start-Sleep -Seconds 2
& .\venv\bin\python -m pip install -r requirements.txt
& .\venv\bin\python -m pip install -e ..\..\packages\database
& .\venv\bin\python -m pip install -e ..\..\packages\auth
& .\venv\bin\python -m pip install -e ..\..\packages\ai
& .\venv\bin\python -m uvicorn app.main:app --reload --port 8000
