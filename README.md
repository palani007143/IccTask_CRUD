# One CRUD operation to manage Companies - create/edit/update/delete.
Front end Angular 
Back end FastAPI with SqlAlchamey
database sqllite

If you need to start the Python REST API run:(kill -9 $(lsof -ti tcp:8000))

uvicorn sql_app.main:app --reload

Then start the Angular application:

cd web-app && ng serve --open --port 8080
As you might have noticed, your Python REST API is listening to the port 8000 while the Angular application is being served by a process on port 8080.
