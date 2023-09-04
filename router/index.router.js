import express from 'express';
import cityRouter from './city.router.js';
import itineraryRouter from './itinirary.router.js'

const router = express.Router();

router.use('/cities', cityRouter);
router.use('/itineraries', itineraryRouter);

export default router;