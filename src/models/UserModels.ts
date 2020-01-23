import mongoose, { Schema, Document } from 'mongoose'

export interface Users extends Document {
  login: string,
  email: string,
  access: number,
  chief: number,
  password: string
}

const UserSchema = new Schema({
  login: {
    required: 'Login обязателен для заполнения',
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: 'Email обязателен для заполнения'
  },
  access: {
    type: Number,
    required: 'Access обязателен для заполнения'
  },
  chief: {
    type: Number,
    required: 'Начальник районов должно ровнятся району или нулю'
  },
  password: {
    type: String,
    required: 'Password обязателен для заполнения'
  }
},
  {
    timestamps: true
})


const UserModel = mongoose.model<Users>('Users', UserSchema)

export default UserModel