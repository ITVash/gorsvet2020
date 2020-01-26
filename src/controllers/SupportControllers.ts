import { Request, Response } from "express"

import { SupportModel, UserModel } from "../models"
import { ISupport } from "../models/SupportModels"
import { Users } from "../models/UserModels"

class SupportControllers {
	create = (req: Request, res: Response) => {
		const data: ISupport = req.body
		const PostData = {
			title: data.title,
			areaID: data.areaID,
			func: data.func,
			opora: data.opora,
			coupID: data.coupID,
			support: data.support,
			date_support: data.date_support,
			life_time_support: data.life_time_support,
			supplier_support: data.supplier_support,
			line: data.line,
			note: data.note,
			lat: data.lat,
			lng: data.lng,
			invoice: data.invoice,
		}
		const support = new SupportModel(PostData)
		support
			.save()
			.then((obj: ISupport) => {
				res.status(201).json(obj)
			})
			.catch(err => {
				console.error("Ошибка при добавлении новой опоры")
				res.status(500).json({
					status: 500,
					message: `Ошибка при добавлении новой опоры! ${err}`,
				})
			})
	}
	show = (req: Request, res: Response) => {
		const uid = req.body.uid.user.id
		UserModel.findById(uid, (err: any, user: Users) => {
			if (err || !user) {
				return res.status(404).json({
					status: 404,
					message: `Пользователь с ID:${uid} не найден`,
				})
			}
			const chief = user.chief
			if (chief === 0) {
				SupportModel.find({})
					.populate("coupID")
					.exec((err: any, support: ISupport) => {
						if (err || !support) {
							return res.status(404).json({
								status: 404,
								message: ` Нет опор для отображения!`,
							})
						}
						res.json(support)
					})
			} else {
				SupportModel.find({ areaID: chief })
					.populate("coupID")
          .exec((err: any, support: ISupport) => {
            if (err || !support) {
							return res.status(404).json({
								status: 404,
								message: ` Нет опор для отображения!`,
							})
						}
						res.json(support)
          })
			}
		})
  }
  update = (req: Request, res: Response) => {
    const data: ISupport = req.body
    const id = req.params.id
    const PostData = {
      title: data.title,
			areaID: data.areaID,
			func: data.func,
			opora: data.opora,
			coupID: data.coupID,
			support: data.support,
			date_support: data.date_support,
			life_time_support: data.life_time_support,
			supplier_support: data.supplier_support,
			line: data.line,
			note: data.note,
			lat: data.lat,
			lng: data.lng,
			invoice: data.invoice,
    }
    SupportModel.findByIdAndUpdate({ _id: id }, PostData, { new: true }, (err: any, support: ISupport | any) => {
      if (err || !support) {
        return res.status(404).json({
          status: 404,
          message: `Не найден документ для обновления!`
        })
      }
      res.json(support)
    })
  }
  delete = (req: Request, res: Response) => {
    const id = req.params.id
    SupportModel.findById(id, (err: any, support: ISupport) => {
      if (err || !support) {
        return res.status(404).json({message: `Не удалось найти опору для удаления`})
      }
      support.remove()
      res.json({
        status: 200,
        message: `Опора ${support.title} успешно удалена!`
      })
    })
  }
}

export default SupportControllers
