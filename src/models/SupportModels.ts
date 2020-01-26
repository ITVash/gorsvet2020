import mongoose, { Schema, Document } from "mongoose"

export interface ISupport extends Document {
	title: string
	areaID: number
	func: boolean
	opora: boolean
	coupID: {
		type: Schema.Types.ObjectId
		ref: string
	}
	support: string
	date_support: string
	life_time_support: string
	supplier_support: string
	line: string
	note: string
	lat: number
	lng: number
	invoice: string
}

const date = new Date()
const dateFormat = `${("0" + date.getDate()).slice(-2)}.${(
	"0" +
	(date.getMonth() + 1)
).slice(-2)}.${date.getFullYear()}`

const SupportSchema = new Schema(
	{
		title: {
			type: String,
			default: "Опора",
		},
		areaID: {
			type: Number,
			default: 0,
		},
		func: {
			type: Boolean,
			default: true,
		},
		opora: {
			type: Boolean,
			default: false,
		},
		coupID: {
      type: Schema.Types.ObjectId,
      //default: '000',
			ref: 'Coup',
		},
		support: {
			type: String,
			default: "Кронштейн",
		},
		date_support: {
			type: String,
			default: `${dateFormat}`,
		},
		life_time_support: {
			type: String,
			default: "Срок службы",
		},
		supplier_support: {
			type: String,
			default: "Поставщик кронштейна",
		},
		line: {
			type: String,
			default: "Линия",
		},
		note: {
			type: String,
			default: "Примечание",
		},
		lat: {
			type: Number,
			default: 0,
		},
		lng: {
			type: Number,
			default: 0,
		},
		invoice: {
			type: String,
			default: "Накладная",
		},
	},
	{ timestamps: true, versionKey: false },
)

const SupportModel = mongoose.model<ISupport>("Support", SupportSchema)

export default SupportModel
