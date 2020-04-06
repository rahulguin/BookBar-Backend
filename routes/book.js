import express from "express";
const book = require('../models/book.schema')

/*router.route('/booksBySeller').get((req,res)=>{
    let query = req.query.q;
    book.find({seller:query})
        .then(books=>res.json(books))
        .catch(err=>res.status(400).json('Error: '+err))
})*/
const bookRouter = express.Router();

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

export default bookRouter;




