import request from "supertest";
import app from "../app.js";

describe('tests for requests on the /person and person/{personId}', () => {

        let id = '';

        test("It should be response the GET method", async () => {
            await request(app)
                .get("/person")
                .expect('Content-Type', /json/)
                .expect(200)
                .expect([])
        });

        test('It should be response the POST method', async ()=> {
            
            const response = await request(app)
                .post('/person')
                .send({name: 'john', age: 30, hobbies: ["TEST", "q"]})
                .expect('Content-Type', "application/json")

                expect(response.statusCode).toBe(201)
                id = response.body.id
                expect(response.body).toEqual({id: id, name: 'john', age: 30, hobbies: ["TEST", "q"]})

        });

        test("It should be response the GET for create id method", async () => {
            await request(app)
                .get(`/person/${id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({id: id, name: 'john', age: 30, hobbies: ["TEST", "q"]})
        });

        test("It should be response the PUT method", async () => {
            await request(app)
                .put(`/person/${id}`)
                .send({name: 'john_put', age: 30, hobbies: ["TEST", "q", "TEST_PUT"]})
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({id: id, name: 'john_put', age: 30, hobbies: ["TEST", "q", "TEST_PUT"]})
        });

        test("It should be response the DEL id method", async () => {
            await request(app)
                .del(`/person/${id}`)
                .expect(204)
        });

        test("It should be Status code 404 and {'Bad request':'Person id not found'} response the GET for delete id method", async () => {
            await request(app)
                .get(`/person/${id}`)
                .expect('Content-Type', /json/)
                .expect(404)
                .expect({"Bad request":"Person id not found"})
        });
  });

  describe('tests for bad requests for id with the /person and person/{personId}', () => {

    test("It should be Status code 400 and {'Bad request': 'Person id not valid'} for response the GET method", async () => {
        await request(app)
            .get("/person/1")
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({"Bad request": 'Person id not valid'})
    });

    test(`It should be Status code 400 and {'Bad request': 'Person id not valid'} for response the POST method`, async ()=> {
        
        const response = await request(app)
            .post('/person/0')
            .send({age: 30, hobbies: ["TEST", "q"]})
            .expect('Content-Type', "application/json")
            expect(response.statusCode).toBe(400)
            expect(response.body)
                .toEqual({'Bad request': 'Person id not valid'})

    });

    test("It should be Status code 400 and {'Bad request': 'Person id not valid'} for response the PUT method", async () => {
        await request(app)
            .put(`/person/0`)
            .send({name: 'john_put', age: 30, hobbies: ["TEST", "q", "TEST_PUT"]})
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({"Bad request": 'Person id not valid'})
    });

    
    test("It should be Status code 400 and {'Bad request': 'Person id not valid'} for response the DELETE method", async () => {
        await request(app)
            .del(`/person/0`)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({"Bad request": 'Person id not valid'})
    });

})

describe('tests for bad requests to non-existing endpoint', () => {

    test("It should be Status code 404 and {'Bad request': 'Url not found'} for response the GET method", async () => {
        const response = await request(app)
            .get("/some/non/existing/resource")
            expect(response.statusCode).toBe(404)
            expect(response.body)
                .toEqual({'Bad request': 'Url not found'})
    });

    test(`It should  be Status code 404 and {'Bad request': 'Url not found'} for response the POST method`, async ()=> {
        
        const response = await request(app)
            .post('/p')
            .send({age: 30, hobbies: ["TEST", "q"]})
            .expect('Content-Type', "application/json")
            expect(response.statusCode).toBe(404)
            expect(response.body)
                .toEqual({'Bad request': 'Url not found'})

    });

    test("It should be Status code 404 and {'Bad request': 'Url not found'} for  response the PUT method", async () => {
        await request(app)
            .put(`/0`)
            .send({name: 'john_put', age: 30, hobbies: ["TEST", "q", "TEST_PUT"]})
            .expect('Content-Type', /json/)
            .expect(404)
            .expect({'Bad request': 'Url not found'})
    });

    test("It should be Status code 404 and {'Bad request': 'Url not found'} for  response the DELETE method", async () => {
        await request(app)
            .del(`/0`)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect({'Bad request': 'Url not found'})
    });

})

describe('tests for bad POST requests where not all properties by person', () => {

    test(`It should be Status code 400 and {'Bad request': 'Person must be object and have all properties 
        (name (string), age (number), hobbies (array of string)) '} for response the POST method`, async ()=> {
        
        const response = await request(app)
            .post('/person')
            .send({age: 30, hobbies: ["TEST", "q"]})
            .expect('Content-Type', "application/json")
            expect(response.statusCode).toBe(400)
            expect(response.body)
                .toEqual({'Bad request': 'Person must be object and have all properties (name (string), age (number), hobbies (array of string)) '})

    });

    test(`It should be Status code 400 and {'Bad request': 'Person must be object and have all properties 
    (name (string), age (number), hobbies (array of string)) '} for response the POST method`, async ()=> {
    
        const response = await request(app)
            .post('/person')
            .send({name: "TEST", age: '30', hobbies: ["TEST", "q"]})
            .expect('Content-Type', "application/json")
            expect(response.statusCode).toBe(400)
            expect(response.body)
                .toEqual({'Bad request': 'Person must be object and have all properties (name (string), age (number), hobbies (array of string)) '})

});
})

describe('tests for bad PUT requests where not any properties by person', () => {
    
    test(`It should be Status code 400 and {'Bad request': 'Person must be object and have any properties 
        (name (string), age (number), hobbies (array of string)) '} for response the PUT method`, async ()=> {
        
        const response = await request(app)
            .post('/person')
            .send({name: "TEST", age: 30, hobbies: ["TEST", "q"]})
            let personId = response.body.id
        await request(app)
            .put(`/person/${personId}`)
            .send({age: "30", hobbies: ["TEST", "q"]})
            .expect('Content-Type', "application/json")
            .expect(400)
            .expect({'Bad request': 'Person must be object and have any properties (name (string), age (number), hobbies (array of string)) '})

    });

    test(`It should be Status code 400 and {'Bad request': 'Person must be object and have any properties 
        (name (string), age (number), hobbies (array of string)) '} for response the PUT method with Error type`, async ()=> {
        
        const response = await request(app)
            .post('/person')
            .send({name: "TEST", age: 30, hobbies: ["TEST", "q"]})
            let personId = response.body.id
        await request(app)
            .put(`/person/${personId}`)
            .send({age: 30, hobbies: ""})
            .expect('Content-Type', "application/json")
            .expect(400)
            .expect({'Bad request': 'Person must be object and have any properties (name (string), age (number), hobbies (array of string)) '})

    });

    
    test(`It should be Status code 400 and {'Bad request': 'Person must be object and have any properties 
    (name (string), age (number), hobbies (array of string)) '} for response the PUT method with Error type`, async ()=> {

        const response = await request(app)
            .post('/person')
            .send({name: "TEST", age: 30, hobbies: ["TEST", "q"]})
            let personId = response.body.id
        await request(app)
            .put(`/person/${personId}`)
            .send({name: 0, age: 30, hobbies: ["TEST", "q"]})
            .expect('Content-Type', "application/json")
            .expect(400)
            .expect({'Bad request': 'Person must be object and have any properties (name (string), age (number), hobbies (array of string)) '})

    });

    test(`It should be Status code 400 and {'Bad request': 'Person must be object and have any properties 
    (name (string), age (number), hobbies (array of string)) '} for response the PUT method with Error type`, async ()=> {

        const response = await request(app)
            .post('/person')
            .send({name: "TEST", age: 30, hobbies: ["TEST"]})
            let personId = response.body.id
        await request(app)
            .post('/person')
            .send({name: "TEST", age: 30, hobbies: ["TEST"]})
        await request(app)
            .put(`/person/${personId}`)
            .send({age: '30', hobbies: ['TEST']})
            .expect('Content-Type', "application/json")
            .expect(400)
            .expect({'Bad request': 'Person must be object and have any properties (name (string), age (number), hobbies (array of string)) '})

});

    test(`It should be Status code 400 and {'Bad request': 'Person must be object and have any properties 
    (name (string), age (number), hobbies (array of string)) '} for response the PUT method with Error type`, async ()=> {

        const response = await request(app)
            .post('/person')
            .send({name: "TEST", age: 30, hobbies: ["TEST", "q"]})
            let personId = response.body.id
        await request(app)
            .put(`/person/${personId}`)
            .send({hobbies: [0, "TEST"]})
            .expect('Content-Type', "application/json")
            .expect(400)
            .expect({'Bad request': 'Person must be object and have any properties (name (string), age (number), hobbies (array of string)) '})

    });
})