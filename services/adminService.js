const { createAdmin, findAdminByUsername, checkIfAdminExists } = require('../models/admin');
const bcrypt = require('bcrypt');

// Đăng ký admin mới
async function registerAdmin(adminData) {
    const existingAdmin = await checkIfAdminExists();
    if (existingAdmin) {
        throw new Error("An admin account already exists. Cannot create another.");
    }
    return await createAdmin(adminData);
}

// Xác thực admin khi đăng nhập
async function authenticateAdmin(username, password) {
    const admin = await findAdminByUsername(username);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        throw new Error("Invalid username or password");
    }
    return admin;
}

module.exports = { registerAdmin, authenticateAdmin };
