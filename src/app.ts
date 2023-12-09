// server/app.js
import express from 'express';

import cors from 'cors';
const mongoose = require("mongoose")
import apiRoutes from './routes/api';
import mainRouter from './routes/mainRouter'
import path from 'path';
import bodyParser from 'body-parser';
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine", "ejs");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error: any) => console.error('MongoDB connection error:', error));

app.use('/api', apiRoutes);
app.use("/", mainRouter)
app.use("/assets", express.static(path.join(__dirname, "../assets")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
