# BLP-backend-intern-skill-test

This is a basic Todo List application for fulfilling BLP Skill Test - Backend Developer Intern

## Tech Stacks
1. Docker
2. Node (Express with Typescript)
3. Sequelizer
4. Postgresql

## Prerequisites
* Docker
* Docker Compose

## Installation
1. Clone the repository:
```bash
https://github.com/irsyadnb/BLP-backend-intern-test.git
```
2. Copy the .env.example file and rename it to .env:
```bash
cp .env.example .env
```
3. Open the `.env` file and replace the placeholder values with your actual data.
4. Open the root project and start the services using docker compose
```docker
docker-compose up -d --build 
```
5. Migrate the database using
```bash
npx sequelize-cli db:migrate 
```
6. The server will running on `http://localhost:4444`
7. To shut down the app, run
```bash
docker-compose down
```
8. Ensure that the Docker Daemon is running

## API Endpoints
Here are the API Documentation:
```https://documenter.getpostman.com/view/33392168/2sA3e2eUR2```

## Entity Relationship Diagram
![BLP-Backend-Intern-Test-ERD drawio](https://github.com/irsyadnb/BLP-backend-intern-test/assets/56458931/11de1194-256d-415b-8575-404d7fa1b25e)
