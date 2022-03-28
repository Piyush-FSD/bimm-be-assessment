const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true }

let mongodbConnection;
const connect = async () => {
    try {
        const client = new MongoClient(MONGO_URI, options);

        mongodbConnection = await client.connect();
        return mongodbConnection;

    } catch (error) {
        throw new Error("Issue connecting to db")
    };
};

const getConnection = () => {
    if (mongodbConnection) {
        return mongodbConnection;
    }
    throw new Error('No connection for mongoDbConnection')
};

const close = async () => {
    await mongodbConnection.close();
};

module.exports = connect, getConnection, close;
