from typing import List, Optional

from pydantic import BaseModel


class JobBase(BaseModel):

    companyName : str
    title : str
    jobType : str
    salary : Optional[str] = None
    description : str
    experience : str
    skills : str
    location : Optional[str] = None
    skills : str
    noticePeriod : str
    contact : str
    responsibilities : str
    applyFlag : bool
    candidates : str = None
    userEmailId : str


class JobCreate(JobBase):
    pass


class Job(JobBase):
    id: int
    userEmailId: str

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    # is_active: bool
    jobs: List[Job] = []

    class Config:
        orm_mode = True