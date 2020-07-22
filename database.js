import Mongo from 'mongodb'
const MongoClient = Mongo.MongoClient

import { } from 'dotenv/config.js'


class Database {
    constructor() {
        this.client = new MongoClient(process.env.ATLAS_URI, { useUnifiedTopology: true })
    }

    async connection() {
        try {
            await this.client.connect()

            this.database = this.client.db(process.env.DATABASE_NAME)
            this.collection = this.database.collection(process.env.COLLECTION_NAME)

            console.log('Connected to the database!')
        } catch (error) {
            throw error
        }
    }

    closeConnection() {
        console.log('Closed Connection!')
        this.client.close()
    }

    async insert(object = {}) {
        try {
            await this.collection.insertOne(object)
        } catch (error) {
            throw error
        }

    }

    read({ title }) {
        /*
            * Every time there is a match ( an object with the same title as the title parameter )
            * it will be added inside an array of objects
        */
        const object = this.collection.find({ title })
        return object
    }

    readAll() {
        const objects = this.collection.find({})
        return objects
    }
}

export default Database