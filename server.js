var express = require("express");
var app = express();

app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect("mongodb+srv://testboy:testboy@cluster0.pkzla.mongodb.net/ServTest?retryWrites=true&w=majority"
, (err, client) => {
    db = client.db('webstore')
})

// dispaly a message for root path to show that API is working
app.get('/'
, function (req, res) {
    res.send('Select a collection, e.g., /collection/messages')
})

// get the collection name
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)

    // console.log('collection name:', req.collection)
    return next()
})

app.get('/collection/:collectionName', (req, res) => {
    req.collection.find({}).toArray((e, results) => {
    if (e) return next(e)
    res.send(results)
    })
})

app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (e, results) => {
        if (e) return next(e)
        res.send(results.ops)
    })
})

app.listen(3000, function() {
    console.log("Hi");
});