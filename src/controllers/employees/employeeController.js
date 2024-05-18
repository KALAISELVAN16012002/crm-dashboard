import { Employee } from '../../models/EmployeeModel.js'
export const getallEmployees = async (req, res, next) => {
  try {
    const { first, rows, ...othersdata } = req.query
    const filter = Object.keys(othersdata).map(field => ({ [field]: { $regex: req.query[field] ?? '' } }))
    const resdata = await Employee.find(filter.length > 0 ? { $and: filter } : {}).skip(first).limit(rows)
    const totallength = await Employee.countDocuments(filter.length > 0 ? { $and: filter } : {})
    res.send({ resdata, totallength })
  } catch (err) {
    console.error(err)
  }
}
export const saveEmployee = async (req, res, next) => {
  try {
    const resdata = await new Employee(req.body).save()
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}
export const updateEmployee = async (req, res, next) => {
  try {
    const { _id } = req.query
    const resdata = await Employee.findOneandUpdate({ _id }, req.body, { new: true })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}
export const deleteEmployee = async (req, res, next) => {
  try {
    const { _id } = req.query
    const resdata = await Employee.deleteOne({ _id })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}
