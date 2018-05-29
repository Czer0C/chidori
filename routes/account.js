import express from 'express';
const router = express.Router();

import mongoose from 'mongoose';
import Account from "../models/Account";

/* GET ALL ACCOUNT */
router.get('/', (req, res, next) => {
    Account.find((err, account) => {
        if (err) return next(err);
        res.json(account);
    });
});

/* GET SINGLE ACCOUNT BY ID */
router.get('/:id', (req, res, next) => {
    Account.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE ACCOUNT */
route.post('/', (req, res, next) => {
    Account.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE ACCOUNT */
route.put('/:id', (req, res, next) => {
    Account.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE ACCOUNT */
route.delete('/:id', (req, res, next) => {
    Account.findByIdAndRemove(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

export default router;