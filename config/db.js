require('dotenv').config();
const { MongoClient } = require('mongodb');

let dbConnection;
const uri = process.env.MONGODB_URI;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db('test-email');
                console.log("Connected to MongoDB");
                return cb();
            }).catch((err) => {
                console.error("Error connecting to MongoDB:", err);
                return cb(err);
            });
    },
    getDb: () => {
        if (!dbConnection) {
            throw new Error("No database connection established");
        }
        return dbConnection;
    }
};
