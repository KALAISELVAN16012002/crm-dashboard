import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { autosearchDealer, deleteDealer, getallDealer, saveDealer, updateDealer } from '../controllers/dealers/dealersController.js'
const dealerRouter = express.Router()
dealerRouter.get('/apigetalldealer', authMiddleware(['Employee', 'Admin']), getallDealer)
dealerRouter.post('/apisavedealer', authMiddleware(['Employee', 'Admin']), saveDealer)
dealerRouter.post('/apiautosearchdealer', authMiddleware(['Employee', 'Admin']), autosearchDealer)
dealerRouter.put('/apiupdatedealer', authMiddleware(['Employee', 'Admin']), updateDealer)
dealerRouter.delete('/apideletedealer', authMiddleware(['Employee', 'Admin']), deleteDealer)
export default dealerRouter
