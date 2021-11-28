import { Person } from '../models/Person.js'

import { parseRequestPerson, responseCodeMesssage } from '../utils.js'


// @GET /person
const getPersons = async (req, res) => {
    try {
        const person = await Person.getAll()
        responseCodeMesssage(res, 200, person)
    } catch (err) {
        responseCodeMesssage(res, 500, {"Error": 'Server Error'})
    }
}

// @GET /person/{personId}
const getPersonById = async (req, res, id)=> {
    try {
        const person = await Person.getById(id)
        person ? responseCodeMesssage(res, 200, person) 
                : responseCodeMesssage(res, 404, {"Bad request": 'Person id not found'})

    } catch (err) {
        responseCodeMesssage(res, 500, {"Error": 'Server Error'})
    }
}

// @POST (create) /person
const createPerson = async (req, res)=> {
    try {

        const { name, age, hobbies } = await parseRequestPerson(req)
 
        const person = await new Person(name, age, hobbies).pushDB()

        responseCodeMesssage(res, 201, person)

    } catch (err) {
        responseCodeMesssage(res, 400, 
            {"Bad request": 'Person must be object and have all properties (name (string), age (number), hobbies (array of string)) '})
    }
}

// @PUT (update) /person/{personId}
const updatePerson = async (req, res, id)=> {
    try {
        const person = await Person.getById(id)
        if (!person) {
            responseCodeMesssage(res, 404, {"Bad request": 'Person id not found'})
        } else {

            const { name, age, hobbies } = await parseRequestPerson(req)

            const putPerson = await Person.update(id, name, age, hobbies)
            
            responseCodeMesssage(res, 200, putPerson)
        }

    } catch (err) {
        responseCodeMesssage(res, 400, 
            {"Bad request": 'Person must be object and have any properties (name (string), age (number), hobbies (array of string)) '})
    }
}

// @DELETE /person/{personId}
const deletePerson = async (req, res, id)=> {
    try {
        const person = await Person.getById(id)
        
        if (!person) {
            responseCodeMesssage(res, 404, {"Bad request": 'Person id not found'})
        } else {
            await Person.del(id)
            res.writeHead(204)
            res.end()
        }

    } catch (err) {
        responseCodeMesssage(res, 500, {"Error": 'Server Error'})
    }
}

export { getPersons, getPersonById, createPerson, updatePerson, deletePerson }