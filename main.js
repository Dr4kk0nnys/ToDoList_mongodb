import promptSync from 'prompt-sync'
const input = promptSync({ sigint: true })

import Database from './database.js'
const database = new Database()

async function main() {
    await database.connection()

    let flag = false
    while (!flag) {
        const userInput = input('> ')

        switch (userInput) {
            case 'add':
                const title = input('TODO Title: ')
                const todo = input('TODO Info: ')

                await database.insert({ title, todo })
                break
            case 'read':
                const todoTitle = input('TODO Title: ')
                const object = database.read({ 'title': todoTitle })
                console.log(await object.toArray())
                break
            case 'readAll':
                const objects = database.readAll()

                while (await objects.hasNext()) {
                    const object = await objects.next()
                    console.log(object)
                }
                break
            case 'exit':
                flag = true
                break
        }
    }

    database.closeConnection()
}

main()