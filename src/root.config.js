import { config } from 'dotenv'
config()



// Server...
export const PORT = "5000";
export const API_VERSION = "v1";
export const API_BASE = `/api/${API_VERSION}`;


// CORS
export const ALLOWED_HOST = [
    // Production
    "https://example.com",


    // development 
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]


// Exports from .env -----------------------------------

export const PROJECT_NAME = process.env.PROJECT_NAME
export const DEBUG = process.env.NODE_ENV === 'development'


// Database -
export const MONGODB = process.env.MONGODB

// Authentication -
export const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET
export const AUTH_TOKEN_EXPIRY = process.env.AUTH_TOKEN_EXPIRY

export const VERIFICATION_TOKEN_SECRET = process.env.VERIFICATION_TOKEN_SECRET
export const VERIFICATION_TOKEN_EXPIRY = process.env.VERIFICATION_TOKEN_EXPIRY

export const RESET_PASSWORD_TOKEN_SECRET = process.env.RESET_PASSWORD_TOKEN_SECRET
export const RESET_PASSWORD_TOKEN_EXPIRY = process.env.RESET_PASSWORD_TOKEN_EXPIRY