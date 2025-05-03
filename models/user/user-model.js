
import { allUsers, singleUser, insertUser, updateUser} from "./user-db.js";

export default class User {
    constructor(id, username, firstname, lastname, age, email, password, role, isAdmin = false) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isAdmin = isAdmin;
    }
    
    static async adjustUser(id, updateRequest) {
        if (updateRequest.requestType == 'updatePassword') 
            return await updateUser(0 ,id, updateRequest.password, updateRequest.newPassword)
        else if (updateRequest.requestType == 'updateEmail')
            return await updateUser(1, id, updateRequest.password, updateRequest.newEmail)
    }

    static async fetchUsers(id) {
        if (!id) return await allUsers()
        else return await singleUser(id)
    }
    
    static async newUser(user) {
        return await insertUser(user)
    }
}