import { Customer } from '../models/CustomerModel.js'

const findCustomerByQuery = async (query, projection) => {
  return await Customer.findOne(query, projection ?? {}).lean()
}
const findallCustomerByQuery = async (query, projection) => {
  return await Customer.find(query, projection ?? {})
}
const newCustomer = async (data) => {
  const resCustomer = await new Customer(data).save()
  return resCustomer
}
const saveOrUpdateCustomer = async (data) => {
  const checkCustomer = await findCustomerByQuery({ Email: data.Email })

  if (checkCustomer === null) {
    const newCustomer = await new Customer(data).save()
    return newCustomer
  } else {
    return await Customer.findOneAndUpdate({ _id: checkCustomer._id }, data)
  }
}
const findOneupdate = async (query, data) => {
  return await Customer.findOneAndUpdate(query, data)
}
export { newCustomer, findallCustomerByQuery, findCustomerByQuery, saveOrUpdateCustomer, findOneupdate }
