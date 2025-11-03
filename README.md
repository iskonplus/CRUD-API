# CRUD API

## 📋 Description

This project implements a **CRUD API** using Node.js and an **in-memory database**.  

## Scripts
This application can be run in different modes:

1. Runs the app in development mode with hot reload (`nodemon`), PORT 4000.

    ```bash
    npm run start:dev
    ```
2. Build the project to generate JavaScript files in the `dist/` directory.

    ```bash
    npm run build
    ```

3. Runs the bundled.

    ```bash
    npm run start:prod
    ```
4. Starts multiple instances using Node.js Cluster API (load balancing), PORTS 4000+

    ```bash
    npm npm run start:multi
    ```
5. Runs tests.

    ```bash
    npm run test
   ```


## API Endpoints

### Users

* `GET /api/users` - Get all users
* `GET /api/users/{userId}` - Get user by ID
* `POST /api/users` - Create a new user
* `PUT /api/users/{userId}` - Update an existing user
* `DELETE /api/users/{userId}` - Delete a user

### Request/Response Format

#### User Object

```json
{
  "id": "uuid",
  "username": "string",
  "age": number,
  "hobbies": ["string"]
}
```

#### Create/Update User Request

```json
{
  "username": "string",
  "age": number,
  "hobbies": ["string"]
}
```

## Status Codes

* 200 - OK
* 201 - Created
* 204 - No Content
* 400 - Bad Request
* 404 - Not Found
* 500 - Internal Server Error


##  Load Balancing Mode (`start:multi`)

Example for `PORT=4000` and 4 CPU cores:

| Role          | Address              |
|---------------|----------------------|
| Load Balancer | `localhost:4000/api` |
| Worker 1      | `localhost:4001/api` |
| Worker 2      | `localhost:4002/api` |
| Worker 3      | `localhost:4003/api` |

Requests are distributed using a **Round-robin algorithm**, and the in-memory database remains consistent across
workers.


---


##  Local Setup

### 1. Clone repository

```bash
git clone https://github.com/iskonplus/CRUD-API.git
```

### 2. Checkout to the `dev` branch

```bash
git checkout dev
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env` file

```bash
cp .env.example .env

```

### 5. Run in development mode

```bash
npm run start:dev
```


##  Summary

Link for task [CRUD API](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md).
**Author:** *[Artur Tamashevich](https://github.com/iskonplus)*
