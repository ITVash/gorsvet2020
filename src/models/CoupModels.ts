import mongoose, { Schema, Document } from 'mongoose'

export interface ICoup extends Document {
  title: string,
  sugo: string,
  sugo_name: string,
  meter: string,
  meter_name: string,
  supplier_sugo: string,
  supplier_meter: string,
  supplier_k1: string,
  supplier_k2: string,
  note: string,
  lat: number,
  lng: number,
  life_time_sugo: string,
  life_time_meter: string,
  life_time_k1: string,
  life_time_k2: string,
  kontaktor1: boolean,
  kontaktor2: boolean,
  kontaktor1_name: string,
  kontaktor2_name: string,
  func: boolean,
  date_sugo: string,
  date_meter: string,
  date_k1: string,
  date_k2: string,
  areaID: number,
  breac1: boolean,
  breac2: boolean,
  breac3: boolean,
  breac4: boolean,
  breac5: boolean,
  breac6: boolean,
  breac7: boolean,
  breac8: boolean,
  breac9: boolean,
  invoice: string
} 
const date = new Date()
const dateFormat = `${('0' + (date.getDate())).slice(-2)}.${('0' + (date.getMonth() +1)).slice(-2)}.${date.getFullYear()}`
const CoupSchema = new Schema({
  title: {
    type: String,
    default: 'Имя шкафа'
  },
  sugo: {
    type: String,
    default: 'Тип СУГО'
  },
  sugo_name: {
    type: String,
    default: 'Название СУГО'
  },
  meter: {
    type: String,
    default: 'Тип Счетчика'
  },
  meter_name: {
    type: String,
    default: 'Название Счетчика'
  },
  supplier_sugo: {
    type: String,
    default: 'Поставщик СУГО'
  },
  supplier_meter: {
    type: String,
    default: 'Поставщик Счетчика'
  },
  supplier_k1: {
    type: String,
    default: 'Поставщик К1'
  },
  supplier_k2: {
    type: String,
    default: 'Поставщик К2'
  },
  note: {
    type: String,
    default: 'Примечание'
  },
  lat: {
    type: Number,
    default: 0
  },
  lng: {
    type: Number,
    default: 0
  },
  life_time_sugo: {
    type: String,
    default: 'Срок службы СУГО'
  },
  life_time_meter: {
    type: String,
    default: 'Срок службы Счетчика'
  },
  life_time_k1: {
    type: String,
    default: 'Срок службы К1'
  },
  life_time_k2: {
    type: String,
    default: 'Срок службы К2'
  },
  kontaktor1: {
    type: Boolean,
    default: false
  },
  kontaktor2: {
    type: Boolean,
    default: false
  },
  kontaktor1_name: {
    type: String,
    default: 'Имя Контактора'
  },
  kontaktor2_name: {
    type: String,
    default: 'Имя Контактора'
  },
  func: {
    type: Boolean,
    default: true
  },
  date_sugo: {
    type: String,
    default: `${dateFormat}`
  },
  date_meter: {
    type: String,
    default: `${dateFormat}`
  },
  date_k1: {
    type: String,
    default: `${dateFormat}`
  },
  date_k2: {
    type: String,
    default: `${dateFormat}`
  },
  areaID: {
    type: Number,
    default: 0
  },
  breac1: {
    type: Boolean,
    default: false
  },
  breac2: {
    type: Boolean,
    default: false
  },
  breac3: {
    type: Boolean,
    default: false
  },
  breac4: {
    type: Boolean,
    default: false
  },
  breac5: {
    type: Boolean,
    default: false
  },
  breac6: {
    type: Boolean,
    default: false
  },
  breac7: {
    type: Boolean,
    default: false
  },
  breac8: {
    type: Boolean,
    default: false
  },
  breac9: {
    type: Boolean,
    default: false
  },
  invoice: {
    type: String,
    default: 'Накладная'
  }
}, { timestamps: true, versionKey: false })

const CoupModel = mongoose.model<ICoup>('Coup', CoupSchema)

export default CoupModel