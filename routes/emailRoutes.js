const express = require('express');
const {handleAddEmail, handleListEmails, handleGetEmail, handleDeleteEmail} = require('../controllers/emailController');
const insertEmailLimiter = require('../middlewares/rateLimitMiddleware');
const authenticateToken  = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/insert-email', insertEmailLimiter, handleAddEmail);


router.get('/get-all-email', authenticateToken, handleListEmails);
router.get('/get-email/:id', authenticateToken, handleGetEmail);
router.delete('/delete-email/:id', authenticateToken, handleDeleteEmail);

module.exports = router;

