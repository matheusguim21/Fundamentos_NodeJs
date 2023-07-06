import { buildRoutePath } from '../../src/utils/build-route-path.js'
import {Database} from './database.js'
import { randomUUID } from 'node:crypto'


const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select("users")
    

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email, age} = req.body
  
    const users = {
      id: randomUUID(),
      name,
      email,
      age

    }

    database.insert("users", users)
    // database.insert ('users', {
    //   id,
    //   name,
    //   email,
    //   age
    // })

    return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res)=>{
      return res.end()
    }
  }
]