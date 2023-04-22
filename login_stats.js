
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
const loginStat =new mongoose.Schema({
    userId: Number,
    Status: String
});
const Status = mongoose.model("Stat", loginStat);
app.route("/loginStat")
    .get(function (req, res) {
        Status.find(function (err, foundStats) {
            if (!err) {
                res.send(foundStats);
            } else {
                res.send(err);
            }
        });
    })
    .post(function (req, res) {

        const newStatus = new Status({
            userId: req.body.userId,
            Status: req.body.Status
        });
        newStatus.save(function (err) {
            if (!err) {
                res.send("Succesfully added a new Status ");
            } else {
                res.send(err);
            }

        });
    })
    .delete(function (req, res) {
        Status.deleteMany(function (err) {
            if (!err) {
                res.send("Succefully deleted all the Stats");
            } else {
                res.send(err);
            }
        });
    });
////////////////////////////////////Request targetting specific Statuss//////////////////////////////////////////////

app.route("/loginStat/:StatususerId")
    .get(function (req, res) {
        Status.findOne({ userId: req.params.StatususerId }, function (err, foundStatus) {
            if (!err) {
                res.send(foundStatus);
            } else {
                res.send("No Status matching that userId was found");
            }
        })
    })
    .put(function (req, res) {
        Status.updateOne({ userId: { $eq: req.params.StatususerId } }, { userId: req.body.userId, Status: req.body.Status },

            function (err, updatedStatus) {
                if (!err) {
                    res.send("Successfully updated Status " + updatedStatus);
                }
            });
    })
    .patch(function (req, res) {
        Status.updateMany(
            { userId: req.params.StatususerId },
            { $set: req.body },
            function (err, updatedStatus) {
                if (!err) {
                    res.send("Successfully updated Status " + updatedStatus);
                }
            });
    })
    .delete(function (req, res) {
        Status.deleteOne(
            { userId: req.params.StatususerId },
            function (err) {
                if (!err) {
                    res.send("Successfully deleted the selected Status");
                } else {
                    res.send(err);
                }
            });
    });
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
