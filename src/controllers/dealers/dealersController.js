import { Mongoose } from 'mongoose'
import { Dealer } from '../../models/DealersModel.js'
import { uniqueorderid } from '../../services/uniqueidService.js'

export const autosearchDealer = async (req, res, next) => {
  try {
    const { field, value } = req.body
    const resdata = await Dealer.find({ [field]: { $regex: value ?? '', $options: 'i' } })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const getallDealer = async (req, res, next) => {
  try {
    const { first, rows, globalfilter, ...othersdata } = req.query
    const individualFilters = Object.keys(othersdata).map(field => ({ [field]: { $regex: req.query[field] ?? '' } }))
    const fieldArray = Object.keys(Dealer.schema.obj)
    const globalFilter = globalfilter ? { $or: fieldArray.filter((field1) => Dealer.schema.path(field1) instanceof Mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) } : {}
    const filter = { $and: [globalFilter, ...individualFilters] }
    const resdata = await Dealer.find(filter).skip(first).limit(rows)
    const totallength = await Dealer.countDocuments(filter)
    res.send({ resdata, totallength })
  } catch (err) {
    console.error(err)
  }
}

export const saveDealer = async (req, res, next) => {
  try {
    const getlastid = await Dealer.find({}, { dealer_id: 1, _id: 0 })
    const uoid = await uniqueorderid('DCAB', getlastid)
    const resdata = await new Dealer({ ...req.body, ...{ dealer_id: uoid } }).save()
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const updateDealer = async (req, res, next) => {
  try {
    const { _id } = req.query
    const resdata = await Dealer.findOneandUpdate({ _id }, req.body, { new: true })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}

export const deleteDealer = async (req, res, next) => {
  try {
    const { _id } = req.query
    const resdata = await Dealer.deleteOne({ _id })
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}
