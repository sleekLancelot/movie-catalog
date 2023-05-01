Movie Catalog
================================

Movie Catalog is a web application that allows users to search and browse movies. It provides a RESTful API backend built with NestJS and a frontend client built with [Next.js](https://nextjs.org/) and [chakra-ui]().

Table of Contents
-----------------

- [Prerequisites]
- [Installation]
- [Running the Application]
- [Features]

Prerequisites
-------------

Before running the application, you must have the following installed:

- Node.js
- PostgreSQL

Installation
------------

1. Clone the repository:

    `git clone https://github.com/sleekLancelot/movie-catalog.git`

2. Install dependencies, from the project root directory:

    `npm install`

3. Set up the PostgreSQL database by running the following commands:

    open `psql` CLI with user `postgres`:

         `psql <DATABASE_USER>`

    create the database movie_catalog:

        `CREATE DATABASE <DATABASE_NAME>;`

    list all databases:

        `\l`

    Exit `psql` cli:

        `\q`

4. Set the database credentials in the `.env` file:

        PORT=5000
        BASE_URL=http://localhost:5000

        DATABASE_HOST=localhost

        DATABASE_NAME=<DATABASE_NAME>

        DATABASE_USER=<DATABASE_USER>

        DATABASE_PASSWORD=<DATABASE_PASSWORD>

        DATABASE_PORT=<DATABASE_PORT>

Running the Application
-----------------------

To start the API and client dev server simultaneously using concurrently, run the following this command from the root folder:

`npm run dev`

The API will be running on [http://localhost:5000](http://localhost:5000/) and the client dev server will be running on [http://localhost:3000](http://localhost:3000/).

To stop the API and client dev server, press `Ctrl + C` in the terminal.

Api Routes
--------

To get add a movies to the catalog:

        `post`
        `http://localhost:5000/movies`

To get all movies in the catalog:

        `GET`
        `http://localhost:5000/movies`

To get a movie by id:

        `GET`
        `http://localhost:5000/movies/details/:id`

To get delete a movie:

        `DELETE`
        `http://localhost:5000/movies/:id`

To get all unique genres in the database:

        `GET`
        `http://localhost:5000/movies/genres`

you can checkout the API documentation [here](https://documenter.getpostman.com/view/23216120/2s93eSZadz).

Features
--------

The Movie Catalog allows users to perform the following actions:

- Add a movie to the catalog
- Get a movie by ID
- Get all movies with thorough a paginated API
- Functionalities to filter by title and genre, and sorting by ascending or descending order.

Users can interact with the API using HTTP requests, and the API returns responses in JSON format.

## Client

The Movie Catalog client is built with Next.js and provides a simple user interface for searching and browsing through the movie catalog.

## Technologies

- NestJS
- PostgreSQL
- TypeORM
- Next.js
- chakraUI
- Typescript
