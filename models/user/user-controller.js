/*!!! ALL FUNCTIONS ARE TEMPORARY, CREATE PROPER PROTOCOLS LATER !!!*/
/*!!! USE REGEX !!!*/
/*!!! ENCRYPTION REQUIRED !!!*/
/*!!! USE JWT FOR AUTHENTICATION !!!*/
/*!!! USE PROPER ERROR HANDLING !!!*/
/*!!! ADJUST REQUESTS AND RESPONSES TO BE MORE USER FRIENDLY, ALL RESPONSES ARE TEMPORARY !!!*/
import User from "./user-model.js"
import { AppError } from "../../utils/app-error.js"

export default class UserController {
    static async getUsers(req, res) {
        const users = await User.getUsers()
        if (!users) throw new AppError('No users found!', 404);

        return res.status(200).json({ message: 'Users list fetch request success!', users })
    }

    static async getUserById(req, res) {
        //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
        if (String(req.params.id).length < 12 && String(req.params.id).length > 18) throw new AppError('Invalid ID!', 400);

        const user = await User.getUsers(req.params.id)
        if (!user) throw new AppError('User not found!', 404);

        return res.status(200).json({ message: 'User fetch request success!', user })
    }

    static async createUser(req, res) {
        //ENCRYPT PASSWORD, EMAIL AND USERNAME LATER...
        //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
        if (!req.body.username || !req.body.firstname || !req.body.lastname || !req.body.age || !req.body.email || !req.body.password || !req.body.role)
            throw new AppError('Missing data, all fields are required!', 400);

        const RESPONSE = await User.createUser(req.body)
        if (!RESPONSE) throw new AppError('User creation failed!', 500);
        if (!RESPONSE.success) throw new AppError(RESPONSE.message, 401);

        const token = RESPONSE.token
        return res.status(200).json({ message: 'User successfully created!', token })
    }

    static async loginUser(req, res) {
        //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
        if (!req.body.authentication || !req.body.password)
            throw new AppError('Missing data, all fields are required!', 400);

        const RESPONSE = await User.loginUser(req.body)
        if (!RESPONSE) throw new AppError('User login failed!', 500);
        if (!RESPONSE.success) throw new AppError(RESPONSE.message, 401);

        const token = RESPONSE.token
        return res.status(200).json({ message: 'User successfully logged in!', token })
    }

    static async updateUser(req, res) {
        //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
        if (String(req.params.id).length != 12) throw new AppError('Invalid ID!', 400);

        const RESPONSE = await User.updateUser(req.params.id, req.body)
        if (!RESPONSE) throw new AppError('User update failed!', 500);
        if (!RESPONSE.success) throw new AppError(RESPONSE.message, 401);

        const token = RESPONSE.token
        return res.status(200).json({ message: 'User info update successful!', token })
    }

    static async deleteUser(req, res) {
        return res.status(200).json({ message: 'Nothing'})
    }
}

