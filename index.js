/*app.get('/agregarDocumento', function(req, res){
    const collection = db.collection('albums');

    collection.insert({
       //datos del documento 
    }), function(err, res){
        if(err){
            console.error(err);
            response.send(err);
            return;
        }

        response.send("yey se agrego!");
    };
});*/



const express = require('express'),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient;
//ObjectID = require('mongodb').ObjectID;

var app = express(),
    db;

const dbName = 'tienda';

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static('public'));

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db(dbName);

    app.listen(3000);
});

app.get("/", function (req, res) {
    res.render("index");
});

app.get('/tienda', function (req, res) {
    const collection = db.collection('productos');
    const collectionTwo = db.collection('albums');
    let dokss;

    collectionTwo.find().toArray(function (err, doks) {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        dokss = doks;
    });

    collection.find().toArray(function (err, docs) {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }


        const contexto = {
            products: docs,
            albums: dokss
        };

        console.log(docs)
        res.render('tienda', contexto);
    });


});

app.get("/tienda/producto", function (req, res) {
    var nombreProducto = req.query.title;
    console.log(nombreProducto);
    const collectionTwo = db.collection('albums');
    collectionTwo.find({}).toArray(function(err, docs){
        var cualquiera = docs.find(function(obj){
           return obj.title == nombreProducto; 
        });
        res.render('albums', cualquiera);
    });

    //console.log(req.query.title);

    /* collectionTwo.filter({
         title: req.query.title
     });

     collectionTwo.toArray((err,result) => {
         //console.log('hi server')
         res.render('albums', {
             producto: result[0],
         });
     });
     */
});