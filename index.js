// Configure Locale Environment Variables
import { config } from 'dotenv'
config()


import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { getVersion } from './src/libs/version.js';
import { databaseConfig } from './src/configs/db.config.js'


import RootRouter from './src/routers/index.js'
import { ALLOWED_HOST, PORT } from './src/root.config.js'


// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : Server (index.js)
// Description  : Root of Express App
// =================================================================================


// Express App
const expressApp = express();

// CORS
expressApp.use(cors({
    credentials: true,
    origin: ALLOWED_HOST
}));


// Parsers...
expressApp.use(cookieParser());
expressApp.use(bodyParser.json());

// Static Files Directory
expressApp.use(express.static('./public'));



// Database Connection...
databaseConfig();

// Attaching the Root Router
expressApp.use(`/`, RootRouter);


// Running the Server.. 
expressApp.listen(PORT, async () => {
    console.log()
    console.log(`Starting...`)
    console.log()
    console.log(`${process.env.PROJECT_NAME} - v${await getVersion()}`)
    console.log(`✓  Server is up & running on http://localhost:${PORT} `)
})
