## Installation Guide
1. Create a cluster
    * How to build a cluster ( mongo db )
        * [Build database cluster with mongodb](https://www.linode.com/docs/databases/mongodb/build-database-clusters-with-mongodb/)
        * [Create a new cluster](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/)
        * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
1. Connect to the cluster
    * How to connect to a cluster
        * [Connect to a cluster](https://docs.atlas.mongodb.com/connect-to-cluster/)
1. Copy the Atlas URI and paste inside the .env file
```javascript
YOUR_ATLAS_URI=atlas_uri
```
#### MAKE SURE YOUR .env IS ADDED TO THE .gitignore FILE
1. Inside the javascript file ( database.js )
```javascript
// In order to use ES6 import modules, add "type": "module" to the package.json

import Mongo from 'mongodb'
const MongoClient = Mongo.MongoClient

// Dotenv import from the ES6 module
import { } from 'dotenv/config.js'

const client = new MongoClient(process.env.ATLAS_URI, { useUnifiedTopology: true })

// temporary ( bad practice ( no error handling ) )
(async () => {
    await client.connect()

    /*
        * The database name can be literally any name
        * if the database name doesn't exist, mongo creates one for you
    */
    const database = client.db('database-name')
    /*
        * good practice: display your database name inside the .env file
        * such as:
        * const database = client.db(process.env.DATABASE_NAME)
    */


    /*
        * If you have ever used MySQL, the collection is the same concept as the table
        * Same thing with the name, it can be any name at all
        * Although, remember the good practice
        * const collection = database.collection(process.env.COLLECTION_NAME)
    */
    const collection = database.collection('collection-name')

    console.log('Connected to the database!')

    // closing connection
    client.close()
})()
```