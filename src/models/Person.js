import { v4 as uuidv4 } from 'uuid'

let db = [{"id":"d03e55fe-89a5-4aa2-96f8-c20790ee015c","name":"TEST_NAME","age":20,"hobbies":["TEST_HOBBY","Q"]}];

class Person {
    constructor(name, age, hobbies) {
        this.id = uuidv4()
        this.name = name
        this.age = age
        this.hobbies = hobbies
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

    
    static async update(id, person) {
        const index = db.findIndex((per) => per.id === id)
        return db[index] = {id, ...person}
    }
    
    static async del(id) {
        db = db.filter((per) => per.id !== id)
        return
    }
}

export { Person }