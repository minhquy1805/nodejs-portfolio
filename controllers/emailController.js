const {addEmail, listEmails, getEmail, removeEmail} = require('../services/emailService');  
const Joi  = require('joi');
const nodemailer = require('nodemailer');

const emailSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().max(100).required(),
    budget: Joi.number().positive().min(5000000).required(),
    description: Joi.string().max(500).optional()
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function handleAddEmail(req, res) {
    const {error} = emailSchema.validate(req.body);
    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    try {
        const result = await addEmail(req.body);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFICATION_EMAIL,
            subject: 'New Email Added Notification',
            text: `A new email has been added with the following details:\n
                   Name: ${req.body.name}\n
                   Email: ${req.body.email}\n
                   Subject: ${req.body.subject}\n
                   Budget: ${req.body.budget}\n
                   Description: ${req.body.description || 'N/A'}`,
            html: `<h2>New Email Request</h2>
                   <p><strong>Name:</strong> ${req.body.name}</p>
                   <p><strong>Email:</strong> ${req.body.email}</p>
                   <p><strong>Subject:</strong> ${req.body.subject}</p>
                   <p><strong>Budget:</strong> ${req.body.budget}</p>
                   <p><strong>Description:</strong> ${req.body.description || 'N/A'}</p>`
        };
        await transporter.sendMail(mailOptions);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

async function handleListEmails(req, res) {
    try{
        const page = parseInt(req.query.page) || 0;
        const emailPerPage = 20; 
        const emails = await listEmails(page, emailPerPage);
        res.status(200).json(emails);  
    } catch(error){
        res.status(400).json({error: error.message});

    }
}

async function handleGetEmail(req, res) {
    try {
        const email = await getEmail(req.params.id);
        res.status(200).json(email);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

async function handleDeleteEmail(req, res) {
    try {
        const result = await removeEmail(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: err.message });   
    }
}

module.exports = { handleAddEmail, handleListEmails, handleGetEmail, handleDeleteEmail };