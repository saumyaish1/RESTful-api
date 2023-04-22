
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const req = require("express/lib/request");
const multer = require('multer');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
    user_id : Number,
    name: String,
    Mob_no: Number,
    branch: String,
    session: String,
    hostel: String,
    room_no: String,
    file: {
        data: Buffer,
        contentType: String
    },
    role:String
});
const User = mongoose.model("User", userSchema);
