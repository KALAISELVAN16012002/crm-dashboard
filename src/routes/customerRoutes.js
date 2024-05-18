import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { getallCustomers, getuniquevaluebyfield } from '../controllers/customers/customerController.js'
const customersRouter = express.Router()
customersRouter.get('/apigetallcustomers', authMiddleware(['Team Leader', 'Admin']), getallCustomers)
customersRouter.get('/apigetuniquevaluebyfield', getuniquevaluebyfield)
export default customersRouter
