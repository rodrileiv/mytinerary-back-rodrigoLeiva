import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js';
import { validator } from '../middlewares/validator.js';
import { createItinerarySchema, updateItinerarySchema } from '../schema/itinerary.schema.js';
import passport from '../middlewares/passport.js';


const itinerariesRouter = express.Router();
const {getItineraries, createItinerary, getItineraryById, updateItinerary, deleteItinerary} = itineraryController;

itinerariesRouter.get('/', getItineraries);
itinerariesRouter.get('/:id', getItineraryById);
itinerariesRouter.post('/', passport.authenticate('jwt', { session: false }), validator(createItinerarySchema), createItinerary);
itinerariesRouter.put('/:id', passport.authenticate('jwt', { session: false }), validator(updateItinerarySchema), updateItinerary);
itinerariesRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteItinerary);

export default itinerariesRouter;