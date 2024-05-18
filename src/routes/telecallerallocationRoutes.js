import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { deleteTelecallerAllocation, getalltelecallerallocation, saveTelecallerAllocation, updateTelecallerAllocation } from '../controllers/telecallerallocation/telecallerallocationController.js'

const telecallerallocationRouter = express.Router()
telecallerallocationRouter.get('/apigetalltelecallerallocation', authMiddleware(['SuperAdmin','TeamLeader','Telecaller']), getalltelecallerallocation )
// uploadRouter.get('/apigetuniquevaluebyfield', authMiddleware(['SuperAdmin']), getuniquevaluebyfield)
telecallerallocationRouter.post('/apisavetelecallerallocation', authMiddleware(['SuperAdmin','TeamLeader']), saveTelecallerAllocation)
telecallerallocationRouter.put('/apiupdatetelecallerallocation', authMiddleware(['SuperAdmin','Team Leader']),updateTelecallerAllocation)
telecallerallocationRouter.delete('/apideletetelecallerallocation', authMiddleware(['SuperAdmin','Team Leader']),deleteTelecallerAllocation )
// uploadRouter.get('/apisearchupload', authMiddleware(['SuperAdmin','Team Leader']), searchCategory)
export default telecallerallocationRouter
