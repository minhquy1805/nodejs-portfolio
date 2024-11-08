const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

async function insertEmail(emailData) {
    const db = getDb();
    return await db.collection("email").insertOne(emailData);
}   

async function getAllEmails(page = 0, emailPerPage = 20) {
    const db = getDb();
    return await db.collection("email")
        .find()
        .sort({ name: 1 })
        .skip(emailPerPage * page)
        .limit(emailPerPage)
        .toArray();
}

async function getEmailById(id) {
    const db = getDb();
    if(!ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
    }
    return await db.collection('email').findOne({ _id: new ObjectId(id) });
}

async function deleteEmailById(id) {
    const db = getDb();
    if(!ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
    }
    return await db.collection('email').deleteOne({ _id: new ObjectId(id) });
}

module.exports = { insertEmail, getAllEmails, getEmailById, deleteEmailById };