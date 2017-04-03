var express = require('express');
var app = express();

app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000,function(){
    console.log('server has running')
});
