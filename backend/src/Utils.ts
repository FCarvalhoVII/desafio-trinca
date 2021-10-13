import jwt from 'jsonwebtoken';
import authConfig from './config/auth';

export default class Utils {

    public static generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret);
    }
}