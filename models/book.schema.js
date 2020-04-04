import mongoose from 'mongoose';
import {image} from '/models/image.schema';
import {price} from "./price.schema";

export const BookSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        authors: {
            type: Array,
            default: [],
            required: true
        },
        publisher: String,

        description: {
            type: String,
            required: true
        },
        isbn: {
            type: Array,
            default: [],
            required: true
        },

        pageCount: Number,

        category: {
            type: Array,
            default: [],
            required: true
        },

        averageRating: Number,
        ratingsCount: Number,
        image: image,
        price: price,

        seller: String,

    }, {
        timestamps: true
    }, {
    collection: 'book'
    }
)

const Book = mongoose.model('book', BookSchema)
export default Book

