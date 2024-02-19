# Travel App GraphQL API

## Description

This repository contains the GraphQL API for a travel management application. The API allows users to perform various operations such as retrieving user information, creating and managing travels, tours, and more. It provides endpoints for authentication, travel creation, tour management, and fetching travel-related data. The API is designed to facilitate the development of a robust travel application backend.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To run the Travel App GraphQL API locally using Docker, follow these steps:

1. Clone this repository to your local machine

```bash
git clone git@github.com:beder/travel-app-backend.git
```

2. Navigate to the project directory

```bash
cd travel-app-backend
```

3. Create a copy of the `.env.example` file in the root directory and rename it to `.env`

```bash
cp .env.example .env
```

4. Build the server

💡 This will take some time.

```bash
docker compose build server
```

5. Install dependencies

```bash
docker compose run --rm server npm install
```

6. Generate a JWT secret and replace the one in the `.env` file

```bash
docker compose run --rm server node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

7. Setup the database

```bash
docker compose run --rm server npx prisma db push
```

8. Seed the database

💡 Review the prisma/seed.ts file to discover the data being seeded into the database. This file contains information about the test users.

```bash
docker compose run --rm server npx prisma db seed
```

## How to run

```bash
docker compose up
```

💡 The server is now running at http://localhost:4000/graphql

## Resetting the database

If you need to start fresh by erasing all indexed data, execute the following command.

```bash
docker compose run --rm server npx prisma db push --force-reset
```

## Usage

### Get current user (GraphQL)

- **Description:** Retrieve information about the current user.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: Authorization
  - Body:
    ```graphql
    query {
      me {
        id
        email
        roles {
          name
        }
      }
    }
    ```
    Variables: None

### Login (GraphQL)

- **Description:** Log in with user credentials.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: None
  - Body:
    ```graphql
    mutation ($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        accessToken
      }
    }
    ```
    Variables:
    ```json
    {
      "email": "admin@example.com",
      "password": "admin"
    }
    ```

### Create travel (GraphQL)

- **Description:** Create a new travel.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: Authorization
  - Body:
    ```graphql
    mutation (
      $isPublic: Boolean!
      $slug: String!
      $name: String!
      $description: String!
      $numberOfDays: Int!
      $moods: MoodsInput!
    ) {
      createTravel(
        createTravelInput: {
          isPublic: $isPublic
          slug: $slug
          name: $name
          description: $description
          numberOfDays: $numberOfDays
          moods: $moods
        }
      ) {
        id
        isPublic
        slug
        name
        description
        numberOfDays
        moods {
          nature
          relax
          history
          culture
          party
        }
      }
    }
    ```
    Variables:
    ```json
    {
      "isPublic": true,
      "slug": "travel-24",
      "name": "Travel 24",
      "description": "Travel Description 1",
      "numberOfDays": 1,
      "moods": {
        "nature": 1,
        "relax": 2,
        "history": 3,
        "culture": 4,
        "party": 5
      }
    }
    ```

### Get travels (GraphQL)

- **Description:** Retrieve all travels.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: Authorization
  - Body:
    ```graphql
    query ($page: Int, $pageSize: Int) {
      travels(findTravelsInput: { page: $page, pageSize: $pageSize }) {
        meta {
          page
          pageSize
          totalPages
          totalResults
        }
        items {
          id
          isPublic
          slug
          name
          description
          numberOfDays
          moods {
            nature
            relax
            history
            culture
            party
          }
          tours {
            id
            name
            startingDate
            endingDate
            price
          }
        }
      }
    }
    ```
    Variables:
    ```json
    {
      "page": 1,
      "pageSize": 10
    }
    ```

### Get public travels (GraphQL)

- **Description:** Retrieve public travels.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: None
  - Body:
    ```graphql
    query ($page: Int, $pageSize: Int) {
      publishedTravels(findTravelsInput: { page: $page, pageSize: $pageSize }) {
        meta {
          page
          pageSize
          totalPages
          totalResults
        }
        items {
          id
          isPublic
          slug
          name
          description
          numberOfDays
          moods {
            nature
            relax
            history
            culture
            party
          }
          tours {
            id
            name
            startingDate
            endingDate
            price
          }
        }
      }
    }
    ```
    Variables:
    ```json
    {
      "page": 2,
      "pageSize": 1
    }
    ```

### Delete travel (GraphQL)

- **Description:** Delete a travel by ID.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: Authorization
  - Body:
    ```graphql
    mutation ($id: String!) {
      removeTravel(id: $id) {
        id
        isPublic
        slug
        name
        description
        numberOfDays
        moods {
          nature
          relax
          history
          culture
          party
        }
      }
    }
    ```
    Variables:
    ```json
    {
      "id": "clsq1gfx60005sqq3lcs6v2i8"
    }
    ```

### Create tour (GraphQL)

- **Description:** Create a new tour.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: Authorization
  - Body:
    ```graphql
    mutation (
      $travelSlug: String!
      $name: String!
      $startingDate: Timestamp!
      $endingDate: Timestamp!
      $price: Int!
    ) {
      createTour(
        travelSlug: $travelSlug
        createTourInput: {
          name: $name
          startingDate: $startingDate
          endingDate: $endingDate
          price: $price
        }
      ) {
        id
        name
        startingDate
        endingDate
        price
      }
    }
    ```
    Variables:
    ```json
    {
      "travelSlug": "asdfasdf",
      "name": "Tour 15",
      "startingDate": "2024-02-11",
      "endingDate": "2024-02-12",
      "price": 12345
    }
    ```

### Update tour (GraphQL)

- **Description:** Update an existing tour.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: Authorization
  - Body:
    ```graphql
    mutation (
      $id: String!
      $name: String!
      $startingDate: Timestamp!
      $endingDate: Timestamp!
      $price: Int!
    ) {
      updateTour(
        updateTourInput: {
          id: $id
          name: $name
          startingDate: $startingDate
          endingDate: $endingDate
          price: $price
        }
      ) {
        id
        name
        startingDate
        endingDate
        price
      }
    }
    ```
    Variables:
    ```json
    {
      "id": "clsi1n0nk000111m41ulb1zzr",
      "name": "Tour 10",
      "startingDate": "2024-03-11",
      "endingDate": "2024-03-12",
      "price": 23456
    }
    ```

### Get tours (GraphQL)

- **Description:** Retrieve tours by various filters.
- **Request:**
  - Method: POST
  - URL: `{{GRAPHQL_URL}}`
  - Headers: None
  - Body:
    ```graphql
    query (
      $travelSlug: String!
      $priceFrom: Int
      $priceTo: Int
      $startingDate: Timestamp
      $endingDate: Timestamp
      $priceSortOrder: SortOrder
      $skip: Int
      $take: Int
    ) {
      tours(
        findToursInput: {
          travelSlug: $travelSlug
          priceFrom: $priceFrom
          priceTo: $priceTo
          startingDate: $startingDate
          endingDate: $endingDate
          priceSortOrder: $priceSortOrder
          skip: $skip
          take: $take
        }
      ) {
        id
        name
        startingDate
        endingDate
        price
      }
    }
    ```
    Variables:
    ```json
    {
      "priceFrom": 189900,
      "priceTo": 214900,
      "travelSlug": "jordan-360"
    }
    ```
