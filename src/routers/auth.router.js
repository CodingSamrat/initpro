
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : auth.router
// Description  : Routers for User Authentication
// =================================================================================



import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
    ForgotPassword,
    LoginUser,
    Logout,
    RegisterUser,
    ResetPassword,
    VerifyForgotPassword,
    VerifyRegistration,
} from "../controllers/auth.controller.js";
const AuthRouter = express.Router();



// ACCESS : Public []
AuthRouter.post('/register', RegisterUser)
AuthRouter.post('/register/verify', VerifyRegistration)

AuthRouter.post('/login', LoginUser)

AuthRouter.post('/forgot-password', ForgotPassword)
AuthRouter.post('/forgot-password/verify', VerifyForgotPassword)
AuthRouter.post('/forgot-password/reset-password', ResetPassword)



// ACCESS : Private [auth,]
AuthRouter.post('/logout', auth, Logout)




export default AuthRouter;
