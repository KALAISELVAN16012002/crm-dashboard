import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'

const Dealersschema = mongoose.Schema({
  dealer_id: String,
  company_name: String,
  First_Name: String,
  Last_Name: String,
  Email: String,
  Password: String,
  Mobilenumber: String,
  Address: String,
  City: String,
  State: String,
  Country: String,
  Role: { type: String, default: 'Dealer' },
  Status: { type: String, default: 'Inactive' }
})

const Dealer = conn.model('dealers', Dealersschema)
export { Dealer }
