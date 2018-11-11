var Mapboxclient = require('mapbox')
var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(__dirname)); // '/public'));

app.get('/', function (req, res) {

    res.sendFile('index.html');

});


app.listen(8081, () => console.log('Example app listening on port 8081!'))