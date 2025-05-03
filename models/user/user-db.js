
import { readFile, writeFile } from 'fs/promises';
import { __dirname } from '../../global.js';
import path from 'path';
import User from './user-model.js';
import { encryptPassword, generateRandomId, comparePassword } from './user-encryption.js';

const USERS_DB = JSON.parse(await readFile(path.join(__dirname, 'DB', 'users-db.json')));

export async function allUsers() {
    return USERS_DB;
}

export async function singleUser(id) {
    return USERS_DB.find(user => user.id == id);
}

export async function insertUser(user) {
    const ID = generateRandomId(12);
    const ENCRYPTED_PASSWORD = await encryptPassword(user.password);
    if (!ID || !ENCRYPTED_PASSWORD) return null;

    const NEW_USER = new User(ID, user.username, user.firstname, user.lastname, user.age, user.email, ENCRYPTED_PASSWORD, user.role, user.isAdmin);
    USERS_DB.push(NEW_USER);

    await writeFile(path.join(__dirname, 'DB', 'users-db.json'), JSON.stringify(USERS_DB, null, 2));
    return NEW_USER;
}

export async function updateUser(requestId, id, currentPassword, newUpdate) {
    if (requestId == 0){
        const USER = USERS_DB.find(user => user.id == id);

        if (await comparePassword(currentPassword, USER.password)) {
            const ENCRYPTED_PASSWORD = await encryptPassword(newUpdate);
            if (!ENCRYPTED_PASSWORD) return null;

            USER.password = ENCRYPTED_PASSWORD;
            const INDEX = USERS_DB.findIndex(user => user.id == id);
            USERS_DB[INDEX] = USER;

            await writeFile(path.join(__dirname, 'DB', 'users-db.json'), JSON.stringify(USERS_DB, null, 2));
            return USER;
        }
    }
    if (requestId == 1){
        const USER = USERS_DB.find(user => user.id == id);

        if (await comparePassword(currentPassword, USER.password)) {
            USER.email = newUpdate;
            const INDEX = USERS_DB.findIndex(user => user.id == id);
            USERS_DB[INDEX] = USER;

            await writeFile(path.join(__dirname, 'DB', 'users-db.json'), JSON.stringify(USERS_DB, null, 2));
            return USER;
        }
    }
}


