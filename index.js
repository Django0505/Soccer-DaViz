var express = require('express');
var app = express();
var http = require('http').Server(app); 
//var io = require('socket.io')(http); 




app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
}); 

/*io.on('connection', function(socket){
  console.log('Ready to twist!'); 

var varCounter = 0; 


setInterval(function(){ 
varCounter += 10;
io.emit('twist', { counter: varCounter}); 
}, 2000);
*/

/*
var five = require("johnny-five"),board, myPotentiometer;
board = new five.Board();
board.on("ready", function() {
	myPotentiometer = new five.Sensor({
	pin: "A0",
	freq: 250
});

myLed = new five.Led(9);

myPotentiometer.on("read", function() { 
		varCounter = this.raw;
		io.emit('twist', { counter: varCounter});
});
	

});

*/



//}); 

 



http.listen(3000, function(){
  console.log('listening on *:3000');
}); 

/*
document.ready(function(){
setTimeout(function() {console.log("It works!!")}, 5000);
}); 
*/
 


