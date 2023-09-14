import express from 'express';
import userController from '../controllers/user.controller.js';
import { validator } from '../middlewares/validator.js';
import registerSchema from '../schema/register.schema.js';
import passport from '../middlewares/passport.js';

const router = express.Router();
const {getUsers, createUser, updateUser, deleteUser} = userController;

router.get('/', getUsers);
router.post('/', validator(registerSchema), createUser);
router.put('/:id', passport.authenticate('jwt', { session: false }), validator(registerSchema), updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

export default router