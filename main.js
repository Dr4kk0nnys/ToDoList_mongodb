import promptSync from 'prompt-sync'
const input = promptSync({ sigint: true })

import Database from './database.js'
const database = new Database()

async function main() {
    await database.connection()

    console.log('add / removeOne / removeMany / read / readAll / update')

    let flag = false
    while (!flag) {
        const userInput = input('> ')

        switch (userInput) {
            case 'add':
                const title = input('TODO Title: ')
                const todo = input('TODO Info: ')

                await database.insert({ title, todo })

                console.log('Successfully added!')
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

            case 'removeOne':
                const removeTitle = input('TODO Title you want to remove: ')
                await database.removeOne({ 'title': removeTitle })
                console.log('Successfully removed!')
                break
            case 'removeMany':
                const removeTitles = input('TODO Title you want to remove: ')
                await database.removeMany({ 'title': removeTitles })
                console.log('Successfully removed!')
                break

            case 'update':
                const updateTitle = input('TODO Title you want to update: ')
                const newTitle = input('New title: ')
                const newInfo = input('New todo info: ')

                await database.update(updateTitle, newTitle, newInfo)

                console.log('Updated successfully!')
                break

            case 'exit':
                flag = true
                break
        }
    }

    database.closeConnection()
}

main()