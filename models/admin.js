const { getDb } = require('../config/db');
const bcrypt = require('bcrypt');

async function createAdmin({ username, password, email, phone }) {
    const db = getDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminData = { username, password: hashedPassword, email, phone };
    const result = await db.collection("admin").insertOne(adminData);
    return result;
}

async function findAdminByUsername(username) {
    const db = getDb();
    return await db.collection("admin").findOne({ username });
}

async function checkIfAdminExists() {
    const db = getDb();
    return await db.collection("admin").findOne({});
}

module.exports = { createAdmin, findAdminByUsername, checkIfAdminExists };
