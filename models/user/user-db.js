
import { readFile, writeFile } from 'fs/promises';
import { __dirname } from '../../global.js';
import path from 'path';
import User from './user-model.js';
import { encryptPassword, encryptId } from './user-encryption.js';

const USERS_DB = JSON.parse(await readFile(path.join(__dirname, 'DB', 'users-db.json')));

export async function allUsers() {
    return USERS_DB;
}

export async function singleUser(id) {
    return USERS_DB.find(user => user.id == id);
}

export async function insertUser(user) {
    const ID = encryptId(12);
    const ENCRYPTED_PASSWORD = encryptPassword(user.password);
    if (!ID || !ENCRYPTED_PASSWORD) return null;

    const NEW_USER = new User(ID, user.username, user.firstname, user.lastname, user.age, user.email, ENCRYPTED_PASSWORD, user.role, user.isAdmin);
    USERS_DB.push(USER);

    await writeFile(path.join(__dirname, 'DB', 'users-db.json'), JSON.stringify(USERS_DB, null, 2));
    return NEW_USER;
}


