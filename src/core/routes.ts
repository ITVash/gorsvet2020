import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { UserControllers, CoupControllers, SupportControllers } from '../controllers'
import { verifyToken } from '../utils'

const userCtrl = new UserControllers()
const coupCtrl = new CoupControllers()
const supportCtrl = new SupportControllers()

const CreateRoutes = (app: express.Express) => {
  app.use(cors())
  app.use(bodyParser.json())

  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Добро пожаловать на сервер!!!')
  })
  app.get('/api', (req: express.Request, res: express.Response) => {
    res.send('Тут все роуты нашего сервера!!!')
  })

  /**
   * User Routers
   */
  app.post('/api/signup', userCtrl.create)
  app.post('/api/login', userCtrl.login)
  app.get('/api/getMe', verifyToken, userCtrl.getMe)
  app.put('/api/user/:id', verifyToken, userCtrl.update)
  app.delete('/api/user/:id', verifyToken, userCtrl.delete)

  /**
   * Coup Routers
   */
  app.get('/api/coup', verifyToken, coupCtrl.show)
  app.post('/api/coup', verifyToken, coupCtrl.create)
  app.put('/api/coup/:id', verifyToken, coupCtrl.update)
  app.delete('/api/coup/:id', verifyToken, coupCtrl.delete)

  /**
   * Support Routers
   */
  app.get('/api/support', verifyToken, supportCtrl.show)
  app.post('/api/support', verifyToken, supportCtrl.create)
  app.put('/api/support/:id', verifyToken, supportCtrl.update)
  app.delete('/api/support/:id', verifyToken, supportCtrl.delete)
}
export default CreateRoutes