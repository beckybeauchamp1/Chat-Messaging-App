// loading the socket.io client into our application, exposes a io global object in the browser then connecting
$(document).ready(function(){
  var socket = io();

  $(".sendName").on("click", function(){
    username = $(".grabName").val();
    $(".name").hide();
    $(".message-form").css("display", "inline");
    socket.emit("addingUser", username);
  });

  socket.on("showUserEntered", function(username){
    $("h1").append($("<p class='show-username'></p>").text(username + " has entered the Chatroom!"));
    setTimeout(function(){
      $(".show-username").fadeOut();
    }, 2000);
  });

  socket.on("showDisconnectMsg", function(username){
    $("h1").append($("<p class='show-username'></p>").text(username + " has left the Chatroom!"));
    setTimeout(function(){
      $(".show-username").fadeOut();
    }, 2000);
  });

  $(".send-button").on("click", function(){
    var msg= $("#msg").val();
    socket.emit("messageToServer", {
      username: username,
      message: msg
    });
    $("#msg").val("");
    return false;
  });

  socket.on("messageToClient", function(msg){
    $(".messages").append($("<li></li>").text(msg.username + ": " + msg.message));
  });



});
