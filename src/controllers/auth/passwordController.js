import sendMail from '../../services/mailService.js'
import bcrypt from 'bcrypt'
import { Employee } from '../../models/EmployeeModel.js'
import { Customer } from '../../models/CustomerModel.js'

export const sentotpforgotPassword = async (req, res, next) => {
  try {
    const { Email } = req.body
    const checkuser = await Employee.findOne({ Email })
    const checkuser1 = await Customer.findOne({ Email })
    if (checkuser?.Status === 'Active') {
      const resdata = await sendMail(req.body, 'DMark otp is :')
      if (resdata.status === 'Email Sent') {
        await Employee.findOneAndUpdate({ Email }, { OTP: resdata.otp })
        res.status(200).send({ status: 'OTP Sent' })
      } else {
        res.send({ status: 'Email not exists' })
      }
    } else if (checkuser1?.Status === 'Active') {
      const resdata = await sendMail(req.body, 'DMark Forgot Password otp is :')
      if (resdata.status === 'Email Sent') {
        await Customer.findOneAndUpdate({ Email }, { OTP: resdata.otp })
        res.status(200).send({ status: 'OTP Sent' })
      } else {
        res.send({ status: 'Email not exists' })
      }
    } else {
      res.send({ status: 'Email not exists' })
    }
  } catch (err) {
    console.error(err)
  }
}

export const verifyforgotPasswordotp = async (req, res, next) => {
  try {
    const checkuser = await Employee.findOne(req.body)
    const checkuser1 = await Customer.findOne(req.body)
    if (checkuser || checkuser1) {
      res.send({ status: 'Sucessfully otp verified' })
    } else {
      res.send({ status: 'Invalid OTP' })
    }
  } catch (err) {
    console.log(err)
  }
}
export const updateforgotPassword = async (req, res, next) => {
  try {
    const { Email, Password } = req.body
    const checkuser = await Employee.findOne({ Email })
    const checkuser1 = await Customer.findOne({ Email })
    if (checkuser?.Status === 'Active') {
      const haspassword = await bcrypt.hash(Password, 10)
      await Employee.updateOne({ Email }, { Password: haspassword })
      res.send({ status: 'Sucessfully Password changed' })
    } else if (checkuser1?.Status === 'Active') {
      const haspassword = await bcrypt.hash(Password, 10)
      await Customer.updateOne({ Email }, { Password: haspassword })
      res.send({ status: 'Sucessfully Password changed' })
    } else {
      res.send({ status: 'Invalid Email' })
    }
  } catch (err) {
    console.log(err)
  }
}
