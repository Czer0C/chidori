import express ,{ Router } from "express";
import { urlencoded, json } from "body-parser";


import AuctionSession from '../models/AuctionSession';
import Product from '../models/Product';

const router = Router();
const app = express();
const checkAuth = require('../middleware/check-auth');

app.use(urlencoded({'extended': 'false'}));
app.use(json());


router.get('/getAllAuctionSession', checkAuth, (req, res, next) => {
    AuctionSession.aggregate([
        {
            $match: {
                status: 0
            }
        },
        {
            $lookup: {
                   from: "product",
                   localField: "productID",
                   foreignField: "_id",
                   as: "p"
                 }
        },
        {
            $project: {
                sessionID: 1,
                bidTime: 1,
                initPrice: 1,
                currentPrice: 1,
                "p.productID": 1,
                "p.productName": 1,
                "p.productType": 1,
                "p.productImage": 1
                
            }
        }
    ], (err, result) => {
        if (err) {
            return next(err);
        }
        return res.json(result);
    })
});

router.get('/getAuctionSession/:type', checkAuth, (req, res, next) => {
    const { type } = req.params;
    getAuctionByProductType(type, res, next);

});


function getAuctionByProductType(type, res, next) {
    Product.aggregate([
        {
            $match: {
                productType: type
            }
        },
        {
            $lookup: { 
                from: 'auction_session',
                localField: '_id',
                foreignField: 'productID',
                as: 'p'
            } 
        }, 
        {
            $project: {
                productID: 1,
                productName: 1,
                productType: 1,
                productImage: 1,
                "p.sessionID": 1,
                "p.bidTime": 1,
                "p.initPrice": 1,
                "p.status": 1
            }
        },
        {
            $match: {
                "p.status" : 0 // 0: đang đấu | -1: kết thúc.
            }
        }
        
    ], (err, result) => {
        if (err) {
            return next(err);
        }
        //console.log(result[0].p);
        return res.json(result);
    });


    
}

export default router;

