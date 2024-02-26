
# Payzo
This is a mock payment app.

## Features
### Backend
- Securely sign in with JWT authentication using HTTP only cookies 
- Password hashing to store passwords securely in database
- Uses MongoDB transactions to ensure transaction integrity
- MongoDB aggregation pipeline for complex queries 

### Frontend
- Made with React+Vite and routing by react-router-dom
- Completely responsive website with styling done with tailwind CSS and beautiful toasts with react-hot-toast 

## Run Locally

This project can be run locally with docker. First ensure that you have docker installed on your desktop/laptop

Run using docker compose 
``` bash
docker compose up -d 
```



## Environment Variables

To run this project locally you need to copy the contents of the .env.sample file in the backend folder to .env file in the backend folder and provide a JWT_SECRET

You can generate a secure secret using the following command
```bash
openssl rand -hex 32
```

