const {registerAdmin, authenticateAdmin} = require('../services/adminService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


// Xử lý yêu cầu tạo admin mới
async function handleCreateAdmin(req, res) {
    try{
        const {username, password, email, phone} = req.body;
        if(!username || !password || !email || !phone){
            return res.status(400).json({message: "Missing required information"});
        }
        const result = await registerAdmin({username, password, email, phone});
        res.status(201).json({message: "Admin created successfully", data: result});
    } catch(err){
        res.status(400).json({message: err.message});
    }
}


// Xử lý yêu cầu đăng nhập admin
async function handleLogin(req, res){
    try {
        const {username, password} = req.body;
        const admin = await authenticateAdmin(username, password);

        // Tạo JWT token nếu xác thực thành công
        const token = jwt.sign({ id: admin._id, username: admin.username, email: admin.email, phone: admin.phone }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch(err){
        res.status(400).json({message: err.message});
    }
}

module.exports = {handleCreateAdmin, handleLogin};