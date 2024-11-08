require('dotenv').config();
const {connectToDb} = require('./config/db');  
const app = require('./app');

const PORT = process.env.PORT;

connectToDb((err) => {
    if(err){
        console.log("Unable to connect to database", err);
        process.exit(1);
    } else {
        console.log("Connected to the database");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});