import { findCustomerByQuery, findOneupdate, saveOrUpdateCustomer } from '../../services/customerService.js'
import sendMail from '../../services/mailService.js'
import bcrypt from 'bcrypt'
import { Customer, Shiping } from '../../models/CustomerModel.js'
const sendotp = async (req, res, next) => {
  try {
    const checkuser = await Customer.findOne({ Email: req.body.Email })
    if (!checkuser || checkuser.Status !== 'Active') {
      const resdata = await sendMail(req.body, 'CRM otp is :')
      if (resdata.status === 'Email Sent') {
        const { Password, ...otherdatas } = req.body
        const haspassword = await bcrypt.hash(Password, 10)
        const data = { ...otherdatas, Password: haspassword, OTP: resdata.otp }
        const res1 = await saveOrUpdateCustomer(data)
        await new Shiping(req.body).save()
        res1 ? res.status(200).send({ status: 'OTP Sent' }) : res.send({ status: 'Email  not exists' })
      } else {
        res.send({ status: 'Email  not exists' })
      }
    } else {
      res.send({ status: 'Already email exists' })
    }
  } catch (err) {
    console.log(err)
  }
}
const registerUser = async (req, res, next) => {
  try {
    const { RefId, ...otherdatas } = req.body
    const checkuser = await findCustomerByQuery(otherdatas)
    if (checkuser) {
      await findOneupdate({ _id: checkuser._id }, { Status: 'Active' })
      res.send({ status: 'Sucessfully registered' })
    } else {
      res.send({ status: 'Invalid OTP' })
    }
  } catch (err) {
    console.log(err)
  }
}

export { sendotp, registerUser }
