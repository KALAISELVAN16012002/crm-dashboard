import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'

const Employeeschema = mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: String,
  Password: String,
  Mobilenumber: String,
  Role: { type: String, default: 'User' },
  OTP: String,
  Status: { type: String, default: 'Inactive' }
}, { timestamps: true })

const Employee = conn.model('employees', Employeeschema)
export { Employee }
