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
      "id": "ebded113-776f-44fb-ab17-5230b013b464",
      "title": "typescript",
      "author": "juna",
      "publishedYear": 2024
    },
    {
      "id": "4f76ad08-cde5-4e6a-a665-af7fe00cdd78",
      "title": "python",
      "author": "dave",
      "publishedYear": 2020
    },
    {
      "id": "fad04c6a-9a43-42b1-a747-82ae12afcae6",
      "title": "dart",
      "author": "ivandjoh",
      "publishedYear": 2020
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
    "id": "ebded113-776f-44fb-ab17-5230b013b464",
    "title": "typescript",
    "author": "juna",
    "publishedYear": 2024
  }
}
```

- `POST /books` : Create a new book

- `Authorization: <token>`
- `Content-Type: application/json`

`request body :`

```json
{
  "title": "book1",
  "author": "john",
  "description": "this is book 1",
  "publishedYear": "2024",
  "page": "100",
  "publisher": "none"
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
  "message": "Book created successfully",
  "data": {
    "id": "ebded113-776f-44fb-ab17-5230b013b464",
    "title": "typescript",
    "author": "juna",
    "publishedYear": 2024
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
  "title": "book1",
  "author": "john",
  "description": "this is book 1",
  "publishedYear": "2024",
  "page": "100",
  "publisher": "none"
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

To run the backend service :

```bash
npm run dev
```

### Unit Test

To run the unit test :

```bash
npm run test
```

## ScreenShoot

`Unit Test`

![Unit Test](/public/unit_test.png)

## Credits

[ivandjohe](https://linkedin.com/in/ivandjoh)
