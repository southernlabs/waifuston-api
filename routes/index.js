const express = require('express');
const waifuController = require('../controllers/waifu.controller');
const userController = require('../controllers/user.controller');
const generalController = require('../controllers/general.controller');
const router = express.Router(); 

router.get('/user/:pubKey',userController.user);
router.get('/count',generalController.count);
router.get('/waifu/:id', waifuController.waifu);
router.get('/waifus', waifuController.all_waifus);
router.get('/waifus/bids', waifuController.bids);
router.get('/waifus/offers', waifuController.offers);
router.get('/waifus/:n', waifuController.latest_waifus); 


module.exports = router