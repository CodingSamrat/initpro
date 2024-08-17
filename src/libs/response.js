

// =================================================================================
// Author       : Sam (Coding Samrat)
// Name         : response
// Description  : Sending response of API Requeest
// =================================================================================



export const response = (res, status, msg) => {
    return res.status(status).json(msg)
}

