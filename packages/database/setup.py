from setuptools import setup, find_packages

setup(
    name="multiverse-database",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "sqlalchemy==2.0.29",
        "asyncpg==0.29.0",
        "alembic==1.13.1"
    ],
)
