const express = require('express');
const { register, login, getUser, getProfile, getUserFromToken } = require('../controller/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/auth/me', getUserFromToken);

// Route để lấy thông tin người dùng qua id
router.get('/:id', getUser);
router.get('/:id/profile', getProfile);


module.exports = router;