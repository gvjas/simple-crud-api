import { v4 as uuidv4 } from 'uuid'

let db = []
class Person {
    name
    age
    hobbies
    constructor( nameValue, ageValue, hobbiesVal ) {
        this.id = uuidv4()
        this.nameValue = nameValue
        this.ageValue = ageValue
        this.hobbiesVal = hobbiesVal
    }

    set nameValue(nameValue) {
        if (nameValue === '' || typeof nameValue != 'string') {      
            throw new Error()
        }
        this.name = nameValue
    }

    set ageValue(ageValue) {
        if (ageValue === '' || typeof ageValue != 'number') {      
            throw new Error()
        }
        this.age = ageValue
    }

    
    set hobbiesVal(hobbiesVal) {
        if (!Array.isArray(hobbiesVal) || hobbiesVal.length !==  hobbiesVal.filter(x => x && typeof x === 'string').length) {      
            throw new Error()
        }
        this.hobbies = hobbiesVal
    }
 
    async pushDB() {
        db.push(this);
        return this
    }

    static async getAll() {
        return db
    }

    static async getById(id) {
        return db.find((per) => per.id === id)
    }

    
    static async update(id, name, age, hobbies) {

        const person = db.find((per) => per.id === id)
        person.nameValue = typeof name === 'undefined' ? person.name : name
        person.ageValue = typeof age === 'undefined' ? person.age : age
        person.hobbiesVal = typeof hobbies === 'undefined' ? person.hobbies : hobbies
        return person
    }
    
    static async del(id) {
        db = db.filter((per) => per.id !== id)
        return
    }
}

export { Person }