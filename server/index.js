const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const { MongoClient } = require('mongodb');
require('dotenv').config()
const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true }

const getAllVehicles = require('./api/automobilesController.js')
const connect = require('./connection/dbConnection.js')

const PORT = 4000;

const app = express()
    .use(cors())
    .use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Methods",
            "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .use(morgan("tiny"))
    .use(express.static("./server/assets"))
    .use(bodyParser.json())

    .get("/", getAllVehicles)

async function setup() {
    try {
        const connection = await connect();

        if (connection) {
            app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
        }
    } catch (error) {
        throw new Error(`Error connecting to server - ${error}`)
    }
}
setup();
const client = new MongoClient(MONGO_URI, options);
client.connect();
app.locals.db = client.db("BIMM");