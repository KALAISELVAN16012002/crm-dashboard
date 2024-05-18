import mongoose from 'mongoose'
import { Customer } from '../../models/CustomerModel.js'

// export const getallCustomers = async (req, res, next) => {
//   try {
//     const { first, rows, globalfilter, ...othersdata } = req.query
//     const individualFilters = Object.keys(othersdata).map(field => ({ [field]: { $regex: req.query[field] ?? '' } }))
//     const fieldArray = Object.keys(Customer.schema.obj)
//     const globalFilter = globalfilter ? { $or: fieldArray.filter((field1) => Customer.schema.path(field1) instanceof mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) } : {}
//     const filter = { $and: [globalFilter, ...individualFilters] }
//     const resdata = await Customer.find(filter).skip(first).limit(rows)
//     const totallength = await Customer.countDocuments(filter)
//     res.send({ resdata, totallength })
//   } catch (err) {
//     console.error(err)
//   }
// }

export const getallCustomers = async (req, res, next) => {
  try {
    const { first, rows, globalfilter, email, ...othersdata } = req.query;
    const individualFilters = Object.keys(othersdata).map(field => ({ [field]: { $regex: req.query[field] ?? '' } }));
    const fieldArray = Object.keys(Customer.schema.obj);
    const emailFilter = email ? { Email: email } : {};
    const globalFilter = globalfilter ? { $or: fieldArray.filter((field1) => Customer.schema.path(field1) instanceof mongoose.Schema.Types.String).map(field => ({ [field]: { $regex: globalfilter, $options: 'i' } })) } : {};
    const filter = { $and: [emailFilter, globalFilter, ...individualFilters] };
    const resdata = await Customer.find(filter).skip(first).limit(rows);
    const totallength = await Customer.countDocuments(filter);
    res.send({ resdata, totallength });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const getuniquevaluebyfield = async (req, res, next) => {
  try {
    const { field } = req.query
    const resdata = await Customer.distinct(field)
    res.send(resdata)
  } catch (err) {
    console.error(err)
  }
}
