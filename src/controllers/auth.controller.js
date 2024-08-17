
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : auth.controller.js
// Description  : Functionality for User Authentication
// =================================================================================




import jwt from 'jsonwebtoken'
import { generateOtp } from "../libs/otp.js";
import { response } from "../libs/response.js";
import { DEBUG } from "../root.config.js";
import { User } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../libs/crypto.js";
import { getExpiryTime } from "../libs/timeConverter.js";
import * as config from '../root.config.js'
import { Tokens } from '../constants/index.js';

import { request as Req, response as Res } from 'express'


// =================================================================================
// Name         : GenerateAuthToken
// Description  : Generates Authentication Token for user login
// =================================================================================
const GenerateAuthToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) return null

        const authToken = user.generateAuthToken()
        return authToken

    } catch (error) {
        console.log(error)
        return null
    }
}





/************************************************************************************
 * Register a new user
 * 
 * @Method POST
 * @Access public
 * @Route /api/v1/auth/register
 * @param {Req} req 
 * @param {Res} res 
 * @returns 
 ***********************************************************************************/
export const RegisterUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = await req.body


        if (!firstName || !lastName || !email || !password) {
            return response(res, 401, { error: 'All fields are required' })
        }


        // TODO: Generate OTP
        const otp = generateOtp()


        // TODO: Find User
        const user = await User.findOne({ email })
        if (user) {
            return response(res, 400, { error: 'User already exist!' })
        }



        if (DEBUG) {
            console.log(`OTP for new Registration - [${email}] - [${otp}]`)
        }
        else {
            // TODO: Write email sending mechanism
            // You can use [nodemailer](https://www.npmjs.com/package/nodemailer) for this
        }


        // TODO: Create JWT Token
        const payload = {
            otp: await hashPassword(otp),
            email,
            lastName,
            firstName,
            password,
        }


        const verificationToken = jwt.sign(payload, config.VERIFICATION_TOKEN_SECRET, { expiresIn: config.VERIFICATION_TOKEN_EXPIRY })

        // TODO: Set Cookies
        res.cookie(
            Tokens.VERIFICATION_TOKEN,
            verificationToken,
            {
                httpOnly: true,
                expires: getExpiryTime(config.VERIFICATION_TOKEN_EXPIRY),
                secure: !DEBUG,
            })

        // TODO: Send token with response
        return response(res, 200, { message: 'OPT Sent successful', verificationToken })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error!' })
    }
}





/************************************************************************************
 * Verify email to complete Registration
 * 
 * @Method POST
 * @Access public
 * @Route /api/v1/auth/register/verify
 * @param {Req} req 
 * @param {Res} res 
 * @returns 
 ***********************************************************************************/
export const VerifyRegistration = async (req, res) => {
    try {
        let verificationToken = undefined

        // For Mobile app verificationToken will come in body
        // For Web verificationToken will come with request.cookie
        const { otp, token } = await req.body

        if (!otp) {
            return response(res, 400, { error: 'OTP is required' })
        }


        if (token) {
            // Accessing token from body
            verificationToken = token
        } else {
            // Accessing token from cookie
            verificationToken = await req.cookies[Tokens.VERIFICATION_TOKEN]
            if (!verificationToken) {
                return response(res, 406, { error: 'Illegal attempt' })
            }
        }

        // TODO: decode verificationToken
        const decodedData = await jwt.verify(verificationToken, config.VERIFICATION_TOKEN_SECRET)

        const { firstName, lastName, email, password } = decodedData
        const decodedOtp = decodedData.otp

        // TODO: Check OTP
        if (!await comparePassword(otp, decodedOtp)) {
            return response(res, 401, { error: 'OTP dose not match' })
        }

        // Create User
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: await hashPassword(password)
        })



        res.clearCookie(
            Tokens.VERIFICATION_TOKEN,
            {
                httpOnly: true,
            }
        )

        return response(res, 200, { message: 'Registration successful', user })
    } catch (error) {
        console.log(error)
        if (error.message === "jwt expired") return response(res, 400, { error: "OTP is expired" })
        else return response(res, 500, { error: "Internal Server Error!", })
    }
}




/************************************************************************************
 * LoginUser
 * 
 * @Method POST
 * @Access public
 * @Route /api/v1/auth/login
 * @param {Req} req 
 * @param {Res} res 
 * @returns 
 ***********************************************************************************/
export const LoginUser = async (req, res) => {

    try {

        const { email, password } = await req.body


        if (!email || !password) {
            return response(res, 401, { error: 'All fields are required' })
        }


        // TODO: Check user exist or not
        const user = await User.findOne({ email })
        if (!user) {
            return response(res, 404, { error: 'No user found!' })
        }
        else if (user && !user.password) {
            return response(res, 400, { error: 'Wrong approach! login with google' })
        }


        // TODO: Check Password
        if (!await comparePassword(password, user.password)) {
            return response(res, 401, { error: 'Invalid password' })
        }



        const authToken = await GenerateAuthToken(user._id)

        res.cookie(Tokens.AUTH_TOKEN, authToken, { httpOnly: true, expires: getExpiryTime(config.AUTH_TOKEN_EXPIRY), secure: !DEBUG })


        return response(res, 200, { message: 'Login successful', authToken, user })

    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error!' })
    }
}





/************************************************************************************
 * Send otp to mail to reset password
 * 
 * @Method POST
 * @Access public
 * @Route /api/v1/auth/forgot-password
 * @param {Req} req 
 * @param {Res} res 
 * @returns 
 ***********************************************************************************/
export const ForgotPassword = async (req, res) => {
    try {
        const { email } = await req.body


        if (!email) {
            return response(res, 401, { error: 'Email is required' })
        }


        // TODO: Generate OTP
        const otp = generateOtp()

        // _-_-_-_-_-_-_-_
        // TODO: Send OTP to email 
        const user = await User.findOne({ email })
        if (!user) {
            return response(res, 404, { error: 'Email is not registered!' })
        }

        if (user && !user.password) {
            return response(res, 400, { error: 'Try login with google' })
        }


        if (DEBUG) {
            console.log(`OTP for Forget Password - [${email}] - [${otp}]`)
        }
        else {
            // TODO: Write email sending mechanism
            // You can use [nodemailer](https://www.npmjs.com/package/nodemailer) for this
        }

        // TODO: Create JWT Token
        const payload = {
            otp: await hashPassword(otp),
            email,
        }


        const verificationToken = jwt.sign(payload, config.VERIFICATION_TOKEN_SECRET, { expiresIn: config.VERIFICATION_TOKEN_EXPIRY })

        // TODO: Set Cookies
        res.cookie(
            Tokens.VERIFICATION_TOKEN,
            verificationToken,
            {
                httpOnly: true,
                expires: getExpiryTime(config.VERIFICATION_TOKEN_EXPIRY),
                secure: !DEBUG,
            })

        // TODO: Send token with response
        return response(res, 200, { message: 'OPT Sent successful', verificationToken })
    } catch (error) {
        console.log(error)
        return response(res, 500, { error: 'Internal Server Error!' })
    }
}





/************************************************************************************
 * Verify email to reset Forgot Password
 * 
 * @Method POST
 * @Access public
 * @Route /api/v1/auth/forgot-password/verify
 * @param {Req} req 
 * @param {Res} res 
 * @returns 
 ***********************************************************************************/
export const VerifyForgotPassword = async (req, res) => {
    try {
        let verificationToken = undefined

        // For Mobile app verificationToken will come in body
        // For Web verificationToken will come with request.cookie
        const { otp, token } = await req.body

        if (!otp) {
            return response(res, 400, { error: 'OTP is required' })
        }


        if (token) {
            // Accessing token from body
            verificationToken = token
        } else {
            // Accessing token from cookie
            verificationToken = await req.cookies[Tokens.VERIFICATION_TOKEN]
            if (!verificationToken) {
                return response(res, 406, { error: 'Illegal attempt' })
            }
        }

        // TODO: decode verificationToken
        const decodedData = await jwt.verify(verificationToken, config.VERIFICATION_TOKEN_SECRET)

        const { email } = decodedData
        const decodedOtp = decodedData.otp

        // TODO: Check OTP
        if (!await comparePassword(otp, decodedOtp)) {
            return response(res, 401, { error: 'OTP doesn\'t match' })
        }


        res.clearCookie(Tokens.VERIFICATION_TOKEN)


        // TODO: Create JWT Token
        const payload = {
            email,
        }


        const resetPasswordToken = jwt.sign(payload, config.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: config.RESET_PASSWORD_TOKEN_EXPIRY })

        // TODO: Set Cookies
        res.cookie(
            Tokens.RESET_PASSWORD_TOKEN,
            resetPasswordToken,
            {
                httpOnly: true,
                expires: getExpiryTime(config.VERIFICATION_TOKEN_EXPIRY),
                secure: !DEBUG,
            })


        return response(res, 200, { message: 'Email verified' })
    } catch (error) {
        console.log(error)
        if (error.message === "jwt expired") return response(res, 400, { error: "OTP is expired" })
        else return response(res, 500, { error: "Internal Server Error!", })
    }
}








/************************************************************************************
 * Reset the Password
 * 
 * @Method POST
 * @Access public
 * @Route /api/v1/auth/forgot-password/reset-password
 * @param {Req} req 
 * @param {Res} res 
 * @returns 
 ***********************************************************************************/
export const ResetPassword = async (req, res) => {
    try {
        let resetPasswordToken = undefined

        // For Mobile app verificationToken will come in body
        // For Web verificationToken will come with request.cookie
        const { password, token } = await req.body

        if (!password) {
            return response(res, 400, { error: 'Password is required' })
        }


        if (token) {
            // Accessing token from body
            resetPasswordToken = token
        } else {
            // Accessing token from cookie
            resetPasswordToken = await req.cookies[Tokens.RESET_PASSWORD_TOKEN]
            if (!resetPasswordToken) {
                return response(res, 406, { error: 'Illegal attempt' })
            }
        }

        // TODO: decode verificationToken
        const decodedData = await jwt.verify(resetPasswordToken, config.RESET_PASSWORD_TOKEN_SECRET)

        const { email } = decodedData

        const user = await User.findOneAndUpdate(
            {
                email
            },
            {
                $set: { password: await hashPassword(password) }
            },
            {
                new: true
            }
        ).select('-password')

        res.clearCookie(Tokens.RESET_PASSWORD_TOKEN)

        return response(res, 200, { message: 'Password reset successful', user })
    } catch (error) {
        console.log(error)
        if (error.message === "jwt expired") return response(res, 400, { error: "OTP is expired" })
        else return response(res, 500, { error: "Internal Server Error!", })
    }
}







/************************************************************************************
 * logout user
 * 
 * @Method POST
 * @Access Protected [auth]
 * @Route /api/v1/auth/logout
 * @param {Req} req 
 * @param {Res} res 
 * @returns 
 ***********************************************************************************/
export const Logout = async (req, res) => {
    res.cookie(
        Tokens.AUTH_TOKEN, '',
        {
            httpOnly: true,
            secure: !DEBUG,
            expires: getExpiryTime('0d'),
        }
    )
    return response(res, 200, { message: 'Logout successful' })

}



