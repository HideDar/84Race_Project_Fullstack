const express = require('express');
const { getAddress } = require('../controller/addressController');
const router = express.Router();

router.get('/:id', getAddress);

module.exports = router;