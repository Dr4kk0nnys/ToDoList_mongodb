import promptSync from 'prompt-sync'
const input = promptSync({ sigint: true })

import Database from './database.js'


class Main {
    constructor() {
        (async () => {
            this.showOptions()

            this.database = new Database()

            try {
                await this.database.connection()

                while (true) {
                    const response = await this.handleUserInput()
                    if (response) break
                }
            } catch (error) {
                throw error
            }

            this.database.closeConnection()
        })()
    }

    async handleUserInput() {
        const question = this.getUserInput()

        switch (question) {
            case 'add':
                await this.database.insert({
                    'title': this.getUserInput('Title: '),
                    'todo': this.getUserInput('Info: ')
                })
                this.displayDatabaseCode(0)
                break

            case 'read':
                const objects = await this.database.read({
                    'title': this.getUserInput('Title: ')
                }).toArray()

                console.log(objects)
                break

            case 'readAll':
                console.log(await this.database.readAll().toArray())
                break

            case 'removeOne':
                await this.database.removeOne({
                    'title': this.getUserInput('Title: ')
                })
                this.displayDatabaseCode(1)
                break

            case 'removeMany':
                await this.database.removeMany({
                    'title': this.getUserInput('Title: ')
                })
                this.displayDatabaseCode(1)
                break

            case 'updateOne':
                await this.database.updateOne({
                    'title': this.getUserInput("Object's name to update: "),
                    'newTitle': this.getUserInput('New Title: '),
                    'newInfo': this.getUserInput('New Info: ')
                })
                this.displayDatabaseCode(2)
                break

            case 'updateMany':
                await this.database.updateMany({
                    'title': this.getUserInput("Object's name to update: "),
                    'newTitle': this.getUserInput('New Title: '),
                    'newInfo': this.getUserInput('New Info: ')
                })
                this.displayDatabaseCode(2)
                break

            case 'exit':
                return true
        }
    }

    getUserInput(text = '> ') {
        return input(text)
    }

    displayDatabaseCode(code = 4) {
        switch (code) {
            case 0:
                return console.log('Successfully saved into the database!')
            case 1:
                return console.log('Successfully removed from the database!')
            case 2:
                return console.log('Successfully updated from the database!')
        }
    }

    showOptions() {
        console.log('add / removeOne / removeMany / read / readAll / updateOne / updateMany')
    }
}

new Main()