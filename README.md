## TODO List with NodeJS and MongoDB

The TODO List will consist in a terminal app with a database connection.  
**NOTE** The database connection has to be made by you ( Check the [Installation Guide](https://github.com/Dr4kk0nnys/ToDoList_mongodb/blob/master/INSTALLATION_GUIDE.md) ).  

## Dependencies
* [MongoDB](https://www.mongodb.com/)
* [NodeJS](https://nodejs.org/en/)
* [Prompt-Sync](https://www.npmjs.com/package/prompt-sync)
* [Dotenv](https://www.npmjs.com/package/dotenv)

## INFO
Be careful with the mongodb connection. In this project I'm storing the Atlas URI inside the .env file, and inside the .gitignore, i added this two lines:  
1. node_modules
1. .env  

The .env file has the Atlas URI inside of it ( confidential info ).

## STEPS
* How to build a cluster ( mongo db )
    * [Build database cluster with mongodb](https://www.linode.com/docs/databases/mongodb/build-database-clusters-with-mongodb/)
    * [Create a new cluster](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/)
    * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* How to connect to a cluster
    * [Connect to a cluster](https://docs.atlas.mongodb.com/connect-to-cluster/)
* Tutorials
    * [Best video tutorial for mongodb ( made from the official mongodb yt channel )](https://www.youtube.com/watch?v=dbSXC7kdUmc)