var express = require("express");
var app = express();
var http = require('http').Server(app);

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on("connection", function(socket){
  socket.on("addingUser", function(name){
    io.emit("showUserEntered", name);
  });
  socket.on('messageToServer', function(msg){
    io.emit("messageToClient", msg);
    console.log(msg.username + ' said:' + msg.message);
  });
  socket.on('disconnect', function(data){
      console.log(data);
      socket.emit("showDisconnectMsg", data);
  });
});

http.listen(4000);
