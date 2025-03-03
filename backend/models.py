from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func

from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=True)
    status = Column(Boolean, default=False)  # False = не выполнено, True = выполнено
    created_at = Column(DateTime, default=func.now())