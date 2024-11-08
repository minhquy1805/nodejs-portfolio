const rateLimit = require('express-rate-limit');

const insertEmailLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 phút
    max: 3,
    message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút.',
});

module.exports = insertEmailLimiter;