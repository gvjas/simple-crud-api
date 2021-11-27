use with CLI: npm install
run server: npm run start:dev

use testing: npm test

GET-query Get all objects (an empty array is expected)
The POST request creates a new object (an answer is expected containing a freshly facility)
GET requests are trying to get the created object by its ID (the object is expected)
PUT-query Trying to update the created object (A response is expected containing an updated object with the same ID)
DELETE-query We delete the created ID for ID (successful deletion is expected to confirm)
GET requests are trying to get a remote object by ID (the answer is expected that there is no such object)