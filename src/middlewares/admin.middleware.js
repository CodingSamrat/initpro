import { response } from "../libs/response.js";

const admin = async (req, res, next) => {
    try {
        if (!req?.user?.isAdmin) {
            return response(res, 403, { error: '[Admin!] Go Back!!! You don\'t have enough permission' })
        }

        next()
    } catch (error) {
        console.log(error.message)
        next(error)
    }
};

export default admin;