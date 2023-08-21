import { Schema, model, Types } from "mongoose";

const collection = 'cities';

const schema = new Schema({
    name: { type: String, required: true},
    image: { type: String, required: true},
    country: { type: String, required: true},
    continent: {type: String, required: true},
    created_by: {type: Types.ObjectId, ref: 'users'}
}, {
    timestamps: true
})

const City = model(collection, schema)

export default City;