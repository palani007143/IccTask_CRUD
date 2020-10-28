from sqlalchemy.orm import Session

from . import models, schemas


# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()
#
#
# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()
#
#
# def get_users(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.User).offset(skip).limit(limit).all()
#
#
# def create_user(db: Session, user: schemas.UserCreate):
#     fake_hashed_password = user.password + "notreallyhashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user
#

def get_jobs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Job).offset(skip).limit(limit).all()

def get_job(db: Session, id):
    return db.query(models.Job).filter(models.Job.id == id).first()


def create_user_job(db: Session, job: schemas.JobCreate):
    db_job = models.Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def apply_job(db: Session, id):
    data = db.query(models.Job).filter(models.Job.id == id).first()
    data.candidates = "candidate@abc.in"
    data.applyFlag = True
    db.commit()
    return db.query(models.Job).offset(0).limit(100).all()

def delete_jobs(db: Session, id):
    db.query(models.Job).filter(models.Job.id == id).delete()
    db.commit()
    return db.query(models.Job).offset(0).limit(100).all()
