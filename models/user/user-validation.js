export default class UserValidation {
    constructor() { }
    static usernameExists(username, usersList) {
        if (usersList.some(user => user.username == username)) {
            return true;
        }
        return false;
    }

    static emailExists(email, usersList) {
        if (usersList.some(user => user.email == email)) {
            return true;
        }
        return false;
    }

    static IDExists(id, usersList) {
        if (usersList.some(user => user.id == id)) {
            return true;
        }
        return false;
    }
}
