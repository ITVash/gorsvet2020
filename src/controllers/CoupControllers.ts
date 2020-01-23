import { Request, Response } from 'express'

import { CoupModel, UserModel } from '../models'
import { ICoup } from '../models/CoupModels'
import { Users } from '../models/UserModels'

class CoupControllers {
  create = (req: Request, res: Response) => {
    const data:ICoup = req.body
    const PostData = {
      title: data.title,
      sugo: data.sugo,
      sugo_name: data.sugo_name,
      meter: data.meter,
      meter_name: data.meter_name,
      supplier_sugo: data.supplier_sugo,
      supplier_meter: data.supplier_meter,
      supplier_k1: data.supplier_k1,
      supplier_k2: data.supplier_k2,
      note: data.note,
      lat: data.lat,
      lng: data.lng,
      life_time_sugo: data.life_time_sugo,
      life_time_meter: data.life_time_meter,
      life_time_k1: data.life_time_k1,
      life_time_k2: data.life_time_k2,
      kontaktor1: data.kontaktor1,
      kontaktor2: data.kontaktor2,
      kontaktor1_name: data.kontaktor1_name,
      kontaktor2_name: data.kontaktor2_name,
      func: data.func,
      date_sugo: data.date_sugo,
      date_meter: data.date_meter,
      date_k1: data.date_k1,
      date_k2: data.date_k2,
      areaID: data.areaID,
      breac1: data.breac1,
      breac2: data.breac2,
      breac3: data.breac3,
      breac4: data.breac4,
      breac5: data.breac5,
      breac6: data.breac6,
      breac7: data.breac7,
      breac8: data.breac8,
      breac9: data.breac9,
      invoice: data.invoice
    }
    const coup = new CoupModel(PostData)
    coup.save()
      .then((obj: any) => {
        res.status(201).json(obj)
      })
      .catch(err => {
        console.error('Ошибка при добавлении нового шкафа')
        res.status(500).json({
          status: 500,
          message: `Ошибка при добавлении нового шкафа! ${err}`
        })
      })
    
  }
  update = (req: Request, res: Response) => {
    const data: ICoup = req.body
    const id = req.params.id
    const PostData = {
      title: data.title,
      sugo: data.sugo,
      sugo_name: data.sugo_name,
      meter: data.meter,
      meter_name: data.meter_name,
      supplier_sugo: data.supplier_sugo,
      supplier_meter: data.supplier_meter,
      supplier_k1: data.supplier_k1,
      supplier_k2: data.supplier_k2,
      note: data.note,
      lat: data.lat,
      lng: data.lng,
      life_time_sugo: data.life_time_sugo,
      life_time_meter: data.life_time_meter,
      life_time_k1: data.life_time_k1,
      life_time_k2: data.life_time_k2,
      kontaktor1: data.kontaktor1,
      kontaktor2: data.kontaktor2,
      kontaktor1_name: data.kontaktor1_name,
      kontaktor2_name: data.kontaktor2_name,
      func: data.func,
      date_sugo: data.date_sugo,
      date_meter: data.date_meter,
      date_k1: data.date_k1,
      date_k2: data.date_k2,
      areaID: data.areaID,
      breac1: data.breac1,
      breac2: data.breac2,
      breac3: data.breac3,
      breac4: data.breac4,
      breac5: data.breac5,
      breac6: data.breac6,
      breac7: data.breac7,
      breac8: data.breac8,
      breac9: data.breac9,
      invoice: data.invoice
    }

    CoupModel.findOneAndUpdate({ _id: id }, PostData, { new: true }, (err: any, coup: ICoup | null) => {
      if (err || !coup) {
        return res.status(404).json({
          status: 404,
          message: `Не найден документ для обновления!`
        })
      }
      res.json(coup)
    })
  }
  delete = (req: Request, res: Response) => {
    const id = req.params.id
    CoupModel.findById(id, (err: any, coup: ICoup | null) => {
      if (err || !coup) {
        return res.status(404).json({message: `Не удалось найти шкаф для удаления`})
      }
      coup.remove()
      res.json({
        status: 200,
        message: `Шкаф ${coup.title} успешно удален!`
      })
    })
  }
  show = (req: Request, res: Response) => {
    const uid = req.body.uid.user.id
    UserModel.findById(uid, (err: any, user: Users) => {
      if (err || !user) {
        return res.status(404).json({
          status: 404,
          message: `Пользователь с ID:${uid} не найден`
        })
      }
      const chief = user.chief
      if (chief === 0) {
        CoupModel.find({}, (err: any, coup: ICoup) => {
          if (err || !coup) {
            return res.status(404).json({
              status: 404,
              message: ` Нет шкафов для отображения!`
            })
          }
          res.json(coup)
        })
      } else {
        CoupModel.find({areaID: chief}, (err: any, coup: ICoup) => {
          if (err || !coup) {
            return res.status(404).json({
              status: 404,
              message: ` Нет шкафов для отображения!`
            })
          }
          res.json(coup)
        })
      }
    })
  }
}

export default CoupControllers