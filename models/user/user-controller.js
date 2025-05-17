/*!!! ALL FUNCTIONS ARE TEMPORARY, CREATE PROPER PROTOCOLS LATER !!!*/
/*!!! USE REGEX !!!*/
/*!!! ENCRYPTION REQUIRED !!!*/
/*!!! USE JWT FOR AUTHENTICATION !!!*/
/*!!! USE PROPER ERROR HANDLING !!!*/
/*!!! ADJUST REQUESTS AND RESPONSES TO BE MORE USER FRIENDLY, ALL RESPONSES ARE TEMPORARY !!!*/
import User from "./user-model.js"
import { AppError } from "../../utils/app-error.js"

export default class UserController {
    constructor() { }

    static async getUsers(req, res) {
        let token = await User.getUsers()
        if (!token) throw new AppError('No users found!', 404);

        return res.status(200).json({ message: 'Users list fetch request success!', token })
    }

    static async getUserById(req, res) {
        //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
        if (String(req.params.id).length != 12) throw new AppError('Invalid ID!', 400);

        let token = await User.getUsers(req.params.id)
        if (!token) throw new AppError('User not found!', 404);

        return res.status(200).json({ message: 'User fetch request success!', token })
    }

    static async createUser(req, res) {
        //ENCRYPT PASSWORD, EMAIL AND USERNAME LATER...
        //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
        if (!req.body.username || !req.body.firstname || !req.body.lastname || !req.body.age || !req.body.email || !req.body.password || !req.body.role)
            throw new AppError('Missing data, all fields are required!', 400);

        let response = await User.createUser(req.body)
        if (!response) throw new AppError('User creation failed!', 500);
        if (!response.success) throw new AppError(response.message, 401);

        let token = response.token
        return res.status(200).json({ message: 'User successfully created!', token })
    }

    static async loginUser(req, res) {
        //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
        if (!req.body.authentication || !req.body.password)
            throw new AppError('Missing data, all fields are required!', 400);

        let response = await User.loginUser(req.body)
        if (!response) throw new AppError('User login failed!', 500);
        if (!response.success) throw new AppError(response.message, 401);

        let token = response.token
        return res.status(200).json({ message: 'User successfully logged in!', token })
    }

    static async updateUser(req, res) {
        //TEMPORARY SOLUTION, CREATE PROPER VALIDATION LATER
        if (String(req.params.id).length != 12) throw new AppError('Invalid ID!', 400);

        let response = await User.updateUser(req.params.id, req.body)
        if (!response) throw new AppError('User update failed!', 500);
        if (!response.success) throw new AppError(response.message, 401);

        let token = response.token
        return res.status(200).json({ message: 'User info update successful!', token })
    }

    static async deleteUser(req, res) {
        return res.status(200).json({ message: 'Nothing'})
    }
}

