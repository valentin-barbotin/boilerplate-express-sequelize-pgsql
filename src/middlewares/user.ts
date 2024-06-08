import { type Request, type RequestHandler } from 'express'
import Logger from '../logger'

export function checkUserToken(): RequestHandler {
    return async function (req: Request, res, next) {
        const authorization = req.headers.authorization
        if (authorization === undefined) {
          Logger.error('No authorization header')
          res.status(401).end() // unauthorized
          return
        }
        const parts = authorization.split(' ')
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
          Logger.error('Invalid authorization header')
          res.status(401).end() // unauthorized
          return
        }
        const token = parts[1]

        // Dummy token
        if (token !== '123') {
          Logger.error('Invalid token')
          res.status(401).end() // unauthorized
          return
        }
        
        next()
      }
}