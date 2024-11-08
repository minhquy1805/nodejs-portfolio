const express = require('express');
const { handleCreateAdmin, handleLogin } = require('../controllers/adminController');
const router = express.Router();

router.post('/create-admin', handleCreateAdmin);

router.post('/login', handleLogin);

module.exports = router;