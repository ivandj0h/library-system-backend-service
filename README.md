# Library-system Backend Service

## Getting Started

### Description

Library system backend service is a service that provides a RESTful API for managing books. This service is built using Node.js and Express.js. The data is stored in a JSON file for simplicity.

### Features

The Features of this application's is support `CRUD operations for books`

### The Stacks

The Stacks of this backend service application's are :

- Node.js (v20.18.0)
- Express.js (v4.21.1)
- Jest (v29.7.0)
- Typescript (v5.6.3)

### Endpoints

The Endpoints of this backend service application's are :

- Base URL : `http://localhost:9000/api/v1`

- `GET /books` : Get all books

- `Authorization: <token>`
- `Content-Type: application/json`
- `response body :`

```json
{
  "status": "success",
  "message": "Books fetched successfully",
  "data": [
    {
      "id": "038c14e4-8af3-4c9d-981a-d8a888a5a998",
      "title": "Updated Book Title",
      "author": "Updated Author",
      "description": "ini adalah deskripsi",
      "page": 120,
      "publisher": "gramedia",
      "year": 2024
    },
    {
      "id": "6a5188e5-3771-48ba-9c72-aa7460a005e2",
      "title": "New Book Title1",
      "author": "New Author1",
      "description": "Test Description1",
      "page": 200,
      "publisher": "gramedia"
    }
  ]
}
```

- `GET /books/:id` : Get a book by id

- `Authorization: <token>`
- `Content-Type: application/json`

`request params :`

```json
{
  "id": "string"
}
```

`response body :`

```json
{
  "status": "success",
  "message": "Book fetched successfully",
  "data": {
    "id": "6a5188e5-3771-48ba-9c72-aa7460a005e2",
    "title": "New Book Title1",
    "author": "New Author1",
    "description": "Test Description1",
    "page": 200,
    "publisher": "gramedia"
  }
}
```

- `POST /books` : Create a new book

- `Authorization: <token>`
- `Content-Type: application/json`

`request body :`

```json
{
  "title": "New Book Title1",
  "author": "New Author1",
  "description": "Test Description1",
  "publishedYear": 2024,
  "page": 200,
  "publisher": "gramedia"
}
```

response body :

```json
{
  "status": "success",
  "message": "Book created successfully",
  "data": {
    "id": "ebded113-776f-44fb-ab17-5230b013b464",
    "title": "typescript",
    "author": "juna",
    "publishedYear": 2024
  }
}
```

`response body :`

```json
{
  "status": "success",
  "message": "Book added successfully",
  "data": {
    "id": "6a5188e5-3771-48ba-9c72-aa7460a005e2",
    "title": "New Book Title1",
    "author": "New Author1",
    "description": "Test Description1",
    "page": 200,
    "publisher": "gramedia"
  }
}
```

- `PUT /books/:id` : Update a book by id

- `Authorization: <token>`
- `Content-Type: application/json`

- `request params :`

```json
{
  "id": "string"
}
```

- `request body :`

```json
{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "description": "ini adalah deskripsi",
  "year": 2024,
  "page": 120,
  "publisher": "gramedia"
}
```

`response body :`

```json
{
  "status": "success",
  "message": "Book updated successfully",
  "data": {
    "id": "038c14e4-8af3-4c9d-981a-d8a888a5a998",
    "title": "Updated Book Title",
    "author": "Updated Author",
    "description": "ini adalah deskripsi",
    "year": 2024,
    "page": 120,
    "publisher": "gramedia"
  }
}
```

- `DELETE /books/:id` : Delete a book by id

- `Authorization: <token>`
- `Content-Type: application/json`

- `request params :`

```json
{
  "id": "string"
}
```

- `response body :`

```json
{
  "status": "success",
  "message": "Book deleted successfully",
  "data": {}
}
```

## Installation

to run this project, you need to `clone` this repository by running the following command :

```bash
git clone https://github.com/ivandj0h/library-system-backend-service.git
```

Then, you need to install the dependencies first by running the following command :

```bash
npm install
```

## Usage

There are two ways to run this project :

### without Docker or Docker Compose or Makefile

`Make sure the USE_MONGODB is set to false in the .env file`

To run the backend service :

```bash
npm run dev
```

### Unit Test

To run the unit test :

```bash
npm run test
```

### with Docker

`Make sure the USE_MONGODB is set to true in the .env file`

To run the backend service :

#### Build the Docker Image

```bash
docker build -t library-system-backend-service .

docker run -p 9000:9000 library-system-backend-service
```

OR you can use `Docker Compose` :

```bash
docker-compose up
```

then if you want to stop the service, you can run the following command :

```bash
docker-compose down
```

### with Makefile

To run the backend service :

```bash
make run
```

then if you want to stop the service, you can run the following command :

```bash
make stop
```

to log container :

```bash
make log
```

## ScreenShoot

`Unit Test`

![Unit Test](/public/unit_test.png)

## Credits

Linkedin : [ivandjoh](https://linkedin.com/in/ivandjoh)

Github : [ivandjoh](https://github.com/ivandj0h)
