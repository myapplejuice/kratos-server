
import { allUsers, singleUser, insertUser } from "./user-db.js";

export async function fetchUsers(id) {
    if (!id) return await allUsers()
    else return await singleUser(id)
}

export async function newUser(user) {
    return await insertUser(user)
}

export default class User {
    constructor(id, username, firstname, lastname, age, email, password, role, isAdmin = false) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.email = email;
        this.password = bcrypt.hashSync(password, 15);
        this.role = role;
        this.isAdmin = isAdmin;
    }
}