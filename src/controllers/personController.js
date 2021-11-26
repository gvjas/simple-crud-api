import { Person } from '../models/Person.js'

import { parseRequestPerson, responseCodeMesssage } from '../utils.js'


// @GET /person
const getPersons = async (req, res) => {
    try {
        const person = await Person.getAll()
        responseCodeMesssage(res, 200, person)
    } catch (err) {
        console.log(err)
    }
}

// @GET /person/{personId}
const getPersonById = async (req, res, id)=> {
    try {
        const person = await Person.getById(id)
        person ? responseCodeMesssage(res, 200, person) 
                : responseCodeMesssage(res, 404, {message: 'Person id not found'})

    } catch (err) {
        console.log(err)
    }
}

// @POST (create) /person
const createPerson = async (req, res)=> {
    try {

        const { name, age, hobbies } = await parseRequestPerson(req)
        
        const person = await new Person(name, age, hobbies).pushDB()

        responseCodeMesssage(res, 201, person)

    } catch (err) {
        console.log(err)
    }
}

// @PUT (update) /person/{personId}
const updatePerson = async (req, res, id)=> {
    try {
        const person = await Person.getById(id)
        if (!person) {
            responseCodeMesssage(res, 404, {message: 'Person id not found'})
        } else {

            const { name, age, hobbies } = await parseRequestPerson(req)
            
            const pers= {
                name: name || person.name,
                age: age || person.age,
                hobbies: hobbies || person.hobbies
            }

            const putPerson = await Person.update(id, pers)
            
            responseCodeMesssage(res, 200, putPerson)
        }

    } catch (err) {
        console.log(err)
    }
}

// @DELETE /person/{personId}
const deletePerson = async (req, res, id)=> {
    try {
        const person = await Person.getById(id)
        
        if (!person) {
            responseCodeMesssage(res, 404, {message: 'Person id not found'})
        } else {
            await Person.del(id)
            res.writeHead(204, {'Content-Type': 'application/json'})
            res.end()
        }

    } catch (err) {
        console.log(err)
    }
}

export { getPersons, getPersonById, createPerson, updatePerson, deletePerson }