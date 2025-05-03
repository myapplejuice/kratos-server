import { randomBytes } from 'crypto';
import { genSalt, hash, compare } from 'bcrypt';

export function generateRandomId(length) {
    //NOT SURE IF WORKING, CHECK NEXT USING CHATGPT
    try {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const bytes = randomBytes(length);
        let id = '';

        for (let i = 0; i < length; i++) {
            id += charset[bytes[i] % charset.length];
        }
        return id;
    } catch (error) {
        console.error('Error generating ID:', error);
        return null;
    }
}

export async function encryptPassword(password) {
    const saltRounds = 15;
    
    try {
        const salt = await genSalt(saltRounds);
        const ecrypted = await hash(password, salt);
        return ecrypted;
    } catch (err) {
        console.error('Error encrypting password:', err);
        return null;
    }
}

export async function comparePassword(password, hashedPassword) {
    try {
        const isMatch = await compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        console.error('Error comparing password:', err);
        return false;
    }
}