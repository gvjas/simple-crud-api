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

Requests to non-existing endpoints (e.g. /some-non/existing/resource) is handled.

Internal server errors is handled and processed correctly.

Value of port on which application is running is stored in .env file.

There is have 2 modes of running application: development and production

There is have tests for API:
GET-query Get all objects (an empty array is expected)
The POST request creates a new object (an answer is expected containing a freshly facility)
GET requests are trying to get the created object by its ID (the object is expected)
PUT-query Trying to update the created object (A response is expected containing an updated object with the same ID)
DELETE-query We delete the created ID for ID (successful deletion is expected to confirm)
GET requests are trying to get a remote object by ID (the answer is expected that there is no such object)