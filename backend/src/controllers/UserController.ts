import User from '../models/User';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import mongoose from '../database/connection';
import Utils from '../Utils';

interface IUser extends mongoose.Document {
    password?: string;
    name?: string;
    email?: string;
}

export default class UserController {

    public static async register(req: Request, res: Response) {
        const { email, password, name } = req.body;

        try {
            const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

            if (!name) {
                return res.status(400).send({ error: 'Null name' });
            }

            if (!validEmail.test(email)) {
                return res.status(400).send({ error: 'Email invalid' });
            }

            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'User already registered' });
            }

            const hash = await bcrypt.hash(password, 10);

            const user: IUser = await User.create({
                email,
                password: hash,
                name
            });

            user.password = undefined;

            return res.send({ user });

        } catch(err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    }

    public static async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user: IUser|null = await User.findOne({ email });

            if (!user) {
                return res.status(400).send({ error: 'User not exists' });
            }

            if (!await bcrypt.compare(password, user.password!)) {
                return res.status(400).send({ error: 'Invalid password' });
            }

            return res.send({ token: Utils.generateToken({ userId: user._id, name: user.name }) });

        } catch(err) {
            return res.status(400).send({ error: 'Login failed' });
        }
    }
}