import express from 'express'
import apiRouter from './apiRoutes.js'

import customersRouter from './customerRoutes.js'
import employeesRouter from './employeeRoutes.js'
import userRouter from './userRoutes.js'

import telecallerallocationRouter from './telecallerallocationRoutes.js'
import allocationRouter from './allocationRoutes.js'



const router = express.Router()
router.use('/api', apiRouter)

//
//

//
//
router.use('/employees', employeesRouter)
router.use('/telecallerallocation', telecallerallocationRouter)
router.use('/users',userRouter)
router.use('/allocation',allocationRouter)
router.use('/customers', customersRouter)
export default router
