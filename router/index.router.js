import express from 'express';
import userRouter from './user.router.js';
import cityRouter from './city.router.js'

const router = express.Router();

//req es objeto solicitud//
//res es el objeto respuest//

router.get('/', (req, res) => {
    res.send('Hello world')
});

router.use('/users', userRouter);

router.use('/cities', cityRouter);

export default router;