import mongoose from 'mongoose';
import {image} from './image.schema';
import {price} from "./price.schema";

export const BookSchema = new mongoose.Schema({
        isbn: {
            type: Array,
            default: [],
            required: true
        },
        quantity: Number,
        price: price,
        seller: String,

    }, {
        timestamps: true
    }, {
    collection: 'book'
    }
)

module.exports = mongoose.model('book', BookSchema)
// export default Book

