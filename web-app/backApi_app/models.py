
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy.types import Integer, Float, Boolean, String, Enum, Date, DateTime, ARRAY

from .database import Base
datetime_format='%Y-%m-%d %H:%M:%S'
date_format='%Y-%m-%d'

# class Status(enum.Enum):
#     STARTED=0
#     SUCCESS=1
#     FAILED=2


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    contactNumber = Column(Integer, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    # jobs = relationship("Job", back_populates="owner")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    companyName = Column(String, index=True)
    title = Column(String, index=True)
    jobType = Column(String, index=True)
    salary = Column(String, index=True)
    description = Column(String, index=True)
    experience = Column(String, index=True)
    skills = Column(String, index=True)
    location = Column(String, index=True)
    skills = Column(String, index=True)
    noticePeriod = Column(String, index=True)
    contact = Column(String, index=True)
    responsibilities = Column(String, index=True)
    candidates = Column(String, index=True)
    userEmailId = Column(String, index=True)
    post_time = Column(String, default=datetime.now().strftime(datetime_format), nullable=False)
    # status = Column('status', Enum(Status), nullable=False)
    applyFlag = Column( Boolean, default=False)

    # owner_id = Column(Integer, ForeignKey("users.id"))
    #
    # owner = relationship("User", back_populates="jobs")