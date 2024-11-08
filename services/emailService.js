const {insertEmail , getAllEmails, getEmailById, deleteEmailById} = require('../models/email');

async function addEmail(emailData) {
    return await insertEmail(emailData);
}

async function listEmails(page = 0, emailPerPage = 20) {
    return await getAllEmails(page, emailPerPage);
}

async function getEmail(id) {
    const email = await getEmailById(id);
    if(!email) {
        throw new Error('Email not found');
    }
    return email;
}

async function removeEmail(id) {
    const result = await deleteEmailById(id);
    if(result.deletedCount === 0) {
        throw new Error('Email not found');
    }
    return result;
}

module.exports = { addEmail, listEmails, getEmail, removeEmail };