
// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : index.js
// Description  : ...
// =================================================================================



import { Router } from "express";
import AuthRouter from "./auth.router.js";
import { API_BASE } from "../root.config.js";
import { getVersion } from "../libs/version.js";


const RootRouter = Router();



// Routes...
RootRouter.get('/', async (req, res) => {
    res.send({ success: true, status: 200, version: await getVersion(), message: 'Welcome to Portify!!!' });
})



RootRouter.use(`${API_BASE}/auth`, AuthRouter)


export default RootRouter;
