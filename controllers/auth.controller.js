import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import { verify } from '../helpers/google-verify.js';

const controller = {
    signup: async (req, res, next) => {
        try {
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

            const user = await User.create(req.body)

            return res.status(201).json({
                success: true,
                message: 'Registered user'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error when registering the user'
            })
        }
    },
    signin: async (req, res, next) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            )

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    photo: user.photo
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '10h' }
            )

            user.password = null;

            return res.status(200).json({
                success: true,
                message: 'User successfully logged in',
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        photo: user.photo
                    },
                }
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error authenticating the user'
            })
        }
    },
    googleSignin: async (req, res, next) => {
        const { token_id } = req.body;

        try {
            const { name, email, photo } = await verify(token_id);

            let user = await User.findOne({ email });

            if (!user) {
                const data = {
                    name,
                    email,
                    photo,
                    password: bcryptjs.hashSync(process.env.STANDARD_PASS, 10),
                    google: true,
                    verified_code: crypto.randomBytes(10).toString('hex')
                }

                user = await User.create(data)
            }

            user.online = true;
            await user.save()

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    photo: user.photo
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '10h' }
            )

            res.status(200).json({
                success: true,
                message: 'User successfully logged in with Google',
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        photo: user.photo
                    },
                }
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error authenticating the user'
            })
        }
    },
    signout: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: false },
                { new: true }
            )

            return res.status(200).json({
                success: true,
                message: 'User logged out'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error authenticating the user'
            })
        }
    },
    token: async (req, res, next) => {
        const { user } = req
        try {
            return res.status(200).json({
                user: {
                    name: user.name,
                    email: user.email,
                    photo: user.photo
                },
            })
        } catch (error) {
            next(error)
        }
    }

}

export default controller;