import express from 'express'
import { deleteEmployee, getallEmployees, saveEmployee, updateEmployee } from '../controllers/employees/employeeController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
const employeesRouter = express.Router()
employeesRouter.get('/apigetallemployees', authMiddleware(['Admin']), getallEmployees)
employeesRouter.post('/apisaveemployee', authMiddleware(['Admin']), saveEmployee)
employeesRouter.put('/apiupdateemployee', authMiddleware(['Admin']), updateEmployee)
employeesRouter.delete('/apideleteemployee', authMiddleware(['Admin']), deleteEmployee)
export default employeesRouter
