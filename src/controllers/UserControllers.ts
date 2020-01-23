import express from 'express'

import { UserModel } from '../models'
import { createToken } from '../utils'
import { Users } from '../models/UserModels'

class UserControllers {
  create = (req: express.Request, res: express.Response) => {
    const postData = {
      login: req.body.login,
      email: req.body.email,
      access: req.body.access,
      chief: req.body.chief,
      password: req.body.password
    }

    const user = new UserModel(postData)
    user.save()
      .then((obj: any) => {
        res.json(obj)
      })
      .catch(err => {
        res.status(500).json({
          status: 'error',
          message: err
        })
      })
    
  }
  login = (req: express.Request, res: express.Response) => {
    const data = {
      email: req.body.email,
      password: req.body.password
    }
    UserModel.findOne({ email: data.email }, (err, user: Users) => {
      if (err || !user) {
        return res.status(404).json({
          status: 404,
          message: 'Пользователь не найден'
        })
      }
      if (data.password === user.password) {
        const dataToken = {
          id: user._id,
          login: user.login
        }
        const token = createToken(dataToken)

        res.json({
          id: user._id,
          login: user.login,
          access: user.access,
          token
        })
      } else {
        res.status(403).json({
          status: 403,
          message: 'Неверный логин или пароль!'
        })
      }
    })
  }
  getMe = (req: express.Request, res: express.Response) => {
    const id = req.body.uid.user.id
    UserModel.findById(id, (err: any, user: Users) => {
      if (err || !user) {
        return res.status(403).json({
          status: 403,
          message: `Пользователь ${id}, не найден!!!`
        })
      }
      const obj = {
        id: user._id,
        login: user.login,
        access: user.access
      }
      res.json(obj)
    })
  }
  update = (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const data = {
      login: req.body.login,
      email: req.body.email,
      access: req.body.access,
      chief: req.body.chief
    }
    UserModel.findById(id, (err: any, user: Users) => {
      if (err || !user) {
        return res.status(403).json({
          status: 403,
          message: `Пользователь ${id}, не найден!`
        })
      }
      user.login = data.login
      user.email = data.email
      user.access = data.access
      user.chief = data.chief
      user.save()
      res.json(user)
    })
  }
  delete = (req: express.Request, res: express.Response) => { 
    const id = req.params.id
    UserModel.findById(id, (err: any, user: Users) => {
      if (err || !user) {
        return res.status(500).json({message: `Не удалось удалить пользователя`})
      }
      user.remove()
      res.json({message: `Пользователь ${user.login}, удален!`})
    })
  }
}
export default UserControllers