const express = require('express');
const { getPersonalRanking, getAllInforUserRanking } = require('../controller/rankingController');
const router = express.Router();

router.get('/personal', getPersonalRanking);
router.get('/personal/:id', getAllInforUserRanking);
module.exports = router;