const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const emailRoutes = require('./routes/emailRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/admin', adminRoutes);
app.use('/email', emailRoutes);


module.exports = app;