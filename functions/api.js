const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose= require('mongoose');
const cors = require('cors');

const app = express();

// your mongoDB Cloud URL
const dbCloudUrl = 'mongodb+srv://Jastine-Siena:Jastine30@cluster0.kwg7ehr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
//if this wont work try this:
//mongodb+srv://Jastine-Siena:<password>@cluster0.kvmr79p.mongodb.net/

// your mongoDB Cloud URL
const dbLocalUrl = 'mongodb://localhost:27017/express-mongo-api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));

mongoose
    .connect(dbCloudUrl || dbLocalUrl)
    .then(() => console.log('Connected to  MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);