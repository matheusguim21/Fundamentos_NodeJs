import http from 'node:http'
import { json } from '../streams/middlewares/json.js'
import { routes } from '../streams/middlewares/routes.js'
import { extractQueryParams } from './utils/extract-query-pararms.js'



const server = http.createServer(async(req, res) => {
  const { method, url } = req

  await json(req, res)
  
  const route = routes.find( route =>{
    return route.method === method && route.path.test(url)
  })

  
  if(route){

    const routeParams = req.url.match(route.path)

    console.log(extractQueryParams(routeParams.groups.query))

    

    console.log("Grupos: ", routeParams.groups)
    req.params = {...routeParams.groups} 

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)