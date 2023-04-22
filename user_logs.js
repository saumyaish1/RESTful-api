
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const req = require("express/lib/request");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
const user_Logs = new mongoose.Schema({
   user_id: Number,
   date_time: {
    type: Date,
    default: Date.now
   },
   done_by : Number,
   place: String,
   outIn: String,
   Device: String
});
const Log = mongoose.model("Log", user_Logs);
