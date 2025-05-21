import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '.././global.js';

export function authorization(req, res, next) {
    const TOKEN = req.headers.authorization.split(' ')[1];
    if (!TOKEN) return res.status(401).json({ message: 'Unauthorized!' });
    
    const TOKEN_DECRYPTED = jwt.verify(TOKEN, SECRET_KEY);
    if (!TOKEN_DECRYPTED.user.isAdmin)
        return res.status(403).json({ message: 'You are not authorized to perform this action!' });

    return next();
}