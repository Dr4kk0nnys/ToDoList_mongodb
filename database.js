gimport Mongo from 'mongodb'
const MongoClient = Mongo.MongoClient

import { } from 'dotenv/config.js'


class Database {
    constructor() {
        (async () => {
            this.client = new MongoClient(process.env.ATLAS_URI, { useUnifiedTopology: true })

            try {
                await this.connection()
            } catch (error) {
                throw error
            }
        })()
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

    async removeOne({ title }) {
        /*
            * Difference between removeOne and removeMany is:
            * DeleteOne finds a match: delete the match and return the object
            * DeleteMany finds a match: delete the match and keep searching for more matches, if found more, it deletes it as well
                * if deleteMany finds 1000 matches, it deletes the 1000 matches ( very dangerous )
            * DeleteMany is a bit slow, since it loops through the entire database searching for matches
        */
        try {
            await this.collection.deleteOne({ title })
        } catch (error) {
            throw error
        }
    }

    async removeMany({ title }) {
        try {
            await this.collection.deleteMany({ title })
        } catch (error) {
            throw error
        }
    }

    async update(title, newTitle, newInfo) {
        try {
            await this.collection.updateOne({
                title
            },
                {
                    '$set': {
                        'title': newTitle,
                        'todo': newInfo
                    }
                })
        } catch (error) {
            throw error
        }
    }
}

export default Database