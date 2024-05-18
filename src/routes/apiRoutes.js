// apiRoutes.js
import express from 'express'
import { Login } from '../controllers/auth/loginController.js'
import { sendotp, registerUser } from '../controllers/auth/registerContoller.js'
import { sentotpforgotPassword, updateforgotPassword, verifyforgotPasswordotp } from '../controllers/auth/passwordController.js'

const apiRouter = express.Router()

apiRouter.post('/apilogin', Login)
apiRouter.post('/apisendotp', sendotp)
apiRouter.put('/apiverifyotp', registerUser)
apiRouter.post('/apisentotpforgotPassword', sentotpforgotPassword)
apiRouter.post('/apiverifyforgotPasswordotp', verifyforgotPasswordotp)
apiRouter.put('/apiupdateforgotPassword', updateforgotPassword)
export default apiRouter
