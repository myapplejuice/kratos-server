export default function encryptId(length) {
    //NOT SURE IF WORKING, CHECK NEXT USING CHATGPT
    try {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const crypto = require('crypto');
        const bytes = crypto.randomBytes(length);
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

export default function encryptPassword(password) {
    //ENCRYPT PASS USING  BCRYPT
    return encryptedPassword;
}