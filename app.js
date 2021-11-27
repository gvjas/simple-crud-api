import http from 'http'

import { validate as uuidValidate }  from 'uuid'

import { responseCodeMesssage } from './src/utils.js'
import { getPersons, getPersonById, createPerson, updatePerson, deletePerson } from './src/controllers/personController.js'


const app = http.createServer((req, res)=> {

    try {
        const urlArr = req.url.split('/')
        if (urlArr.length > 3) {
            responseCodeMesssage(res, 404, {message: 'Url not found'})
        }
        const id = urlArr[2]
        const isUuid = uuidValidate(id)
        if (req.url === '/person') {
            if (req.method === 'GET') {
                getPersons(req, res)
            } else if (req.method === 'POST') {
                createPerson(req, res)
            }
        } else if (urlArr[1] === 'person' && isUuid) {
            switch (req.method) {
                case 'GET':
                    getPersonById(req, res, id)
                    break
                case 'PUT':
                    updatePerson(req, res, id)
                    break
                case 'DELETE':
                    deletePerson(req, res, id)
                    break
            }
        } else if (urlArr[1] === 'person' && !isUuid) {
            responseCodeMesssage(res, 400, {message: 'Person id not valid'})
        } else {
            responseCodeMesssage(res, 404, {message: 'Url not found'})
        }
    } catch (error) {
        responseCodeMesssage(res, 500, {message: 'Server error'})
    }
})

export default app