import express from "express";
const book = require('../models/book.schema')

/*router.route('/booksBySeller').get((req,res)=>{
    let query = req.query.q;
    book.find({seller:query})
        .then(books=>res.json(books))
        .catch(err=>res.status(400).json('Error: '+err))
})*/
const bookRouter = express.Router();


/*Post a book*/
bookRouter.route('/Addbook').post(async (req, res) => {
    const body = req.body;
    let checkBook = await book.find({title: body.title});
    if (checkBook.length > 0) {
        return res.send({status: "Book is already present"});
    }
    const newBook = new book(body);
    newBook.save()
        .then(()=>res.json({status:'Book added!!'}))
        .catch(err=>res.status(400).json('Error: '+err))
})

/*Get all books*/
bookRouter.route('/getAllBooks').get((req, res) => {
    book.find()
        .then(books => res.json(books))
        .then(() => res.json({status: 'Showing all Books'}))
        .catch(err => res.status(400).json('Error: '+err))
})

/*Get book by ID*/
bookRouter.route('/getBookById/:bid').get((req, res) => {
    const bookId = req.params['bid'];
    book.findById(bookId)
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Error: '+err))
})

bookRouter.route('/search').get((req, res) => {
    let query = req.query.q;
    book.find({$or:[{title: {"$regex": query,"$options":"i"}},
            {authors:{"$elemMatch":{"$regex":query,"$options":"i"}}},{category:{"$elemMatch":{"$regex":query,"$options":"i"}}}]})
        .then(books=>res.json(books))
        .catch(err=>res.status(400).json('Error: '+err));
})




export default bookRouter;




