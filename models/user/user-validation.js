export default class UserValidation {
    static usernameExists(username, usersList) {
        return usersList.some(user => user.username == username)
    }

    static emailExists(email, usersList) {
        return usersList.some(user => user.email == email)
    }

    static IDExists(id, usersList) {
        return usersList.some(user => user.id == id)
    }
}
