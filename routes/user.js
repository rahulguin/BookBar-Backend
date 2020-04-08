import Joi from 'joi';
import express from 'express';
import User from '../models/user.schema';
import {signUp} from '../validations/user';
import {parseError, sessionizeUser} from "../util/helper";

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
    try {
        const {username, email, password, userType} = req.body
        await Joi.validate({username, email, password}, signUp);

        const newUser = new User({username, email, password, userType});
        const sessionUser = sessionizeUser(newUser);
        await newUser.save();
        req.session.user = sessionUser;
        res.send(sessionUser);
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

export default userRoutes;
