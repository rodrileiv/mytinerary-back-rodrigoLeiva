import express from 'express';
import userRouter from './user.router.js';


const router = express.Router();

//req es objeto solicitud//
//res es el objeto respuest//

router.get('/', (req, res) => {
    res.send('Hello world')
});

router.use('./users', userRouter);

export default router;