import UserDB from "./user-db.js";

export default class User {
    constructor(id, username, firstname, lastname, age, email, password, role, isModerator = false, isAdmin = false) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isModerator = isModerator;
        this.isAdmin = isAdmin;
    }

    static async updateUser(id, request) {
        return await UserDB.updateUser(request.requestType, id, request.password, request.update)
    }

    static async getUsers(id) {
        if (!id) return await UserDB.allUsers()
        else return await UserDB.singleUser(id)
    }

    static async createUser(user) {
        return await UserDB.insertUser(user)
    }

    static async loginUser(credentials) {
        return await UserDB.selectUser(credentials)
    }

    static JSONParse(user) {
        return new User(user.id, user.username, user.firstname, user.lastname, user.age, user.email, user.password, user.role, user.isModerator, user.isAdmin)
    }
}