import {Database} from './database.js'
import { randomUUID } from 'node:crypto'


const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select("users")
    
      console.info(users)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const { name, email, age} = req.body
  
    const users = {
      id: randomUUID(),
      name,
      email,
      age

    }

    database.insert("users", users)
    // database.insert('users', {
    //   id,
    //   name,
    //   email,
    //   age
    // })

    return res.writeHead(201).end()
    }
  }
]