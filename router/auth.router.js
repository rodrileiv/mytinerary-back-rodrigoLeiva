import express from 'express';
import authController from '../controllers/auth.controller.js';
import { accountExistsSignin } from '../middlewares/auth/accountExistsSignin.js';
import { accountExistsSignup } from '../middlewares/auth/accountExistsSignup.js';
import { accountHasBeenVerified } from '../middlewares/auth/accountHasBeenVerified.js';
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.js';
import passport from '../middlewares/passport.js';

const { signup, signin, signout, token, googleSignin } = authController;

const router = express.Router();

router.post('/signup',
    accountExistsSignup,
    signup)

router.post('/signin',
    accountExistsSignin,
    accountHasBeenVerified,
    passwordIsOk,
    signin)

router.post('/google', googleSignin)

router.post('/signout', passport.authenticate('jwt', { session: false }), signout)

router.post('/token', passport.authenticate('jwt', { session: false }), token)

export default router;