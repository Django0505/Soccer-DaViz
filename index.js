var express = require('express');
var app = express();
var http = require('http').Server(app); 


app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
}); 


 
var port = process.env.soccer_viz_port || 3000;

http.listen( port, function(){
  console.log('listening on *:' + port);
});


