import 'dotenv/config';

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export default {
    secret: TOKEN_SECRET || 'desafio trinca'
}