const PORT = process.env.PORT || 8080
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://akshayanand:formybabu1903@ds119765.mlab.com:19765/babu" || process.env.MONGODB_URI;

var express = require('express');
var app = express();

app.get('/short', (req, res) => {

    var response = "";
    var result1 = "";
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {


        var dbo = db.db("babu");
        if (err) throw err;
        dbo.collection("short").findOne({}, function (err, result) {
            result1 = result
            if (err) throw err;
            //console.log(result.data.short[0]);
            response = "[\"";
            for (var i = 0; i < result.data.short.length; i++) {
                response += result.data.short[i] + "\", \""
            }
            response += "\"]";
            res.status(500).json(result.data)

            console.log(response)
            db.close();
        });
    });
})

app.get('/long', (req, res) => {

    var response = "";
    var result1 = "";
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {


        var dbo = db.db("babu");
        if (err) throw err;
        //collection.findOne({_id: "abc"},...);
        dbo.collection("long").findOne({}, function (err, result) {
            result1 = result
            if (err) throw err;
            response = "[\"";
            for (var i = 0; i < result.data.long.length; i++) {
                response += result.data.long[i] + "\", \""
            }
            response += "\"]";
            res.status(200).json(response)

            console.log(response)
            db.close();
        });
    });
})



app.listen(PORT, function () {
    console.log("Running formybabu on port " + PORT);
});