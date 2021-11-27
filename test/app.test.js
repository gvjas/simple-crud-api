import request from "supertest";
import app from "../app.js";

describe('test for /person and person/{personId}', () => {

        let id = '';
        
        test("It should response the GET method", async () => {
            await request(app)
                .get("/person")
                .expect('Content-Type', /json/)
                .expect(200)
                .expect([])
        });

        test('It should response the POST method', async ()=> {
            
            const response = await request(app)
                .post('/person')
                .send({name: 'john', age: '30', hobbies: ["TEST", "q"]})
                .expect('Content-Type', "application/json")

                expect(response.statusCode).toBe(201)
                id = response.body.id
                expect(response.body).toEqual({id: id, name: 'john', age: '30', hobbies: ["TEST", "q"]})

        });

        test("It should response the GET for create id method", async () => {
            await request(app)
                .get(`/person/${id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({id: id, name: 'john', age: '30', hobbies: ["TEST", "q"]})
        });

        test("It should response the PUT method", async () => {
            await request(app)
                .put(`/person/${id}`)
                .send({name: 'john_put', age: '30', hobbies: ["TEST", "q", "TEST_PUT"]})
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({id: id, name: 'john_put', age: '30', hobbies: ["TEST", "q", "TEST_PUT"]})
        });

        test("It should response the DEL id method", async () => {
            await request(app)
                .del(`/person/${id}`)
                .expect('Content-Type', /json/)
                .expect(204)
        });

        test("It should response the GET for delete id method", async () => {
            await request(app)
                .get(`/person/${id}`)
                .expect('Content-Type', /json/)
                .expect(404)
                .expect({"message":"Person id not found"})
        });
  });