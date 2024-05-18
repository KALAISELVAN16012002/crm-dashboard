import mongoose from 'mongoose'
import { conn } from '../config/db/db.js'

const Customerschema = mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Email: String,
  Password: String,
  Mobilenumber: String,
  Role: { type: String, default: 'Customer' },
  OTP: String,
  Status: { type: String, default: 'Inactive' }
})
const shipingschema = mongoose.Schema(
  {
    First_Name: String,
    Last_Name: String,
    Address_Type: { type: String, default: 'Home' },
    Email: String,
    Mobilenumber: String,
    Address: String,
    Street_Address: String,
    Country: String,
    State: String,
    City: String,
    Zipcode: String
  },
  { timestamps: true }
)
const Customer = conn.model('customers', Customerschema)
const Shiping = conn.model('shipings', shipingschema)
export { Customer, Shiping }
