"use with CLI:" npm install

"run server in the development mode:" npm run start:dev

"run server in the production mode:" npm run start:prod

"use testing:" npm test

The task solved using only pure Node.js. Any libraries and packages (except nodemon, uuid, webpack and its plugins, testing tools, dotenv) are prohibited.

API path /person:
    GET /person or /person/${personId} return all persons or person with corresponding personId
    POST /person is used to create record about new person and store it in database
    PUT /person/${personId} is used to update record about existing person
    DELETE /person/${personId} is used to delete record about existing person from database

Persons are stored as objects that have following properties:
    id — unique identifier (string, uuid) generated on server side
    name — person's name (string, required)
    age — person's age (number, required)
    hobbies — person's hobbies (array of strings or empty array, required)

Requests to non-existing endpoints (e.g. /some-non/existing/resource) handled.

Internal server errors is handled and processed correctly.

Value of port on which application is running stored in .env file.

There is have 2 modes of running application: development and production

There is have tests for API.