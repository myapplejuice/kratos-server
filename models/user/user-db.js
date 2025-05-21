
import { readFile, writeFile } from 'fs/promises';
import { __dirname } from '../../global.js';
import path from 'path';
import User from './user-model.js';
import UserEncryption from './user-encryption.js';
import UserValidation from './user-validation.js';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../global.js';

export default class UserDB {
    static async allUsers() {
        const DB_PATH = path.join(__dirname, 'db', 'users-db.json')
        const USERS = JSON.parse(await readFile(DB_PATH));

        if (!USERS || !Array.isArray(USERS) || USERS.length == 0) return null;
        USERS.forEach(user => delete user.password);

        return USERS;
    }

    static async singleUser(id) {
        const DB_PATH = path.join(__dirname, 'db', 'users-db.json')
        const USER = JSON.parse(await readFile(DB_PATH)).find(user => user.id == id);

        if (!USER) return null;
        delete USER.password;

        return USER;
    }

    static async insertUser(user) {
        const USERS_DB = JSON.parse(await readFile(path.join(__dirname, 'db', 'users-db.json')));
        if (UserValidation.usernameExists(user.username, USERS_DB)) return { success: false, message: "Username already in use" }
        if (UserValidation.emailExists(user.email, USERS_DB)) return { success: false, message: "Email already in use" }

        const RANDOM_NUM = Math.floor(Math.random() * (18 - 12 + 1)) + 12;
        let ID = UserEncryption.generateId(RANDOM_NUM);
        while (UserValidation.IDExists(ID, USERS_DB))
            ID = UserEncryption.generateId(RANDOM_NUM);

        const ENCRYPTED_PASSWORD = await UserEncryption.encryptPassword(user.password);
        const NEW_USER = new User(ID, user.username, user.firstname, user.lastname, user.age, user.email, ENCRYPTED_PASSWORD, user.role, user.isModerator, user.isAdmin);
        USERS_DB.push(NEW_USER);
        await writeFile(path.join(__dirname, 'DB', 'users-db.json'), JSON.stringify(USERS_DB, null, 2));

        delete NEW_USER.password;
        const TOKEN = jwt.sign({ user: NEW_USER }, SECRET_KEY, { algorithm: 'HS256' });
        return { success: true, TOKEN };
    }

    static async selectUser(credentials) {
        const USERS_DB = JSON.parse(await readFile(path.join(__dirname, 'db', 'users-db.json')));
        const EXTRACTED_USER = USERS_DB.find(EXTRACTED_USER => credentials.authentication == EXTRACTED_USER.email
            || credentials.authentication == EXTRACTED_USER.username);
        if (!EXTRACTED_USER) return { success: false, message: "One or both fields are incorrect!" }
        if (!await UserEncryption.comparePassword(credentials.password, EXTRACTED_USER.password)) return { message: "One or both fields are incorrect!" }

        const USER = User.JSONParse(EXTRACTED_USER);
        delete USER.password;
        let token = jwt.sign({ user: USER }, SECRET_KEY, { algorithm: 'HS256' });
        return { success: true, token };
    }

    static async updateUser(requestId, id, currentPassword, update) {
        const USERS_DB = JSON.parse(await readFile(path.join(__dirname, 'db', 'users-db.json')));
        if (requestId == 0) {
            const USER = USERS_DB.find(user => user.id == id);
            if (!USER) return { message: "User not found!" }

            if (await UserEncryption.comparePassword(currentPassword, USER.password)) {
                const ENCRYPTED_PASSWORD = await UserEncryption.encryptPassword(update);
                if (!ENCRYPTED_PASSWORD) return null;

                USER.password = ENCRYPTED_PASSWORD;
                const INDEX = USERS_DB.findIndex(user => user.id == id);
                USERS_DB[INDEX] = USER;

                await writeFile(path.join(__dirname, 'DB', 'users-db.json'), JSON.stringify(USERS_DB, null, 2));
                const USER_OBJ = User.JSONParse(USER);
                delete USER_OBJ.password;
                let token = jwt.sign({ user: USER_OBJ }, SECRET_KEY, { algorithm: 'HS256' });
                return { success: true, token };
            }
            else return { success: false, message: "One or both fields are incorrect!" }
        }
        if (requestId == 1) {
            const USER = USERS_DB.find(user => user.id == id);

            if (await UserEncryption.comparePassword(currentPassword, USER.password)) {
                USER.email = update;
                const INDEX = USERS_DB.findIndex(user => user.id == id);
                USERS_DB[INDEX] = USER;

                await writeFile(path.join(__dirname, 'DB', 'users-db.json'), JSON.stringify(USERS_DB, null, 2));
                const USER_OBJ = User.JSONParse(USER);
                delete USER_OBJ.password;
                let token = jwt.sign({ user: USER_OBJ }, SECRET_KEY, { algorithm: 'HS256' });
                return { success: true, token };
            }
            else return { success: false, message: "One or both fields are incorrect!" }
        }
    }
}