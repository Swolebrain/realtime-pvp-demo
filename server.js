const express = require('express');
const app = express();
const PORT = 3001;
const CONNECTION_TIMEOUT = 30000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('static'));

let players = {};

io.on("connection", function(socket){
  console.log("A user has connected, socket id: "+socket.id);
  //for each player
    //if player has a lastMove property greater than 30secs ago
      //kill him
  for (let socketId in players){
    if (!players[socketId].lastMove ||
      new Date().getTime() - players[socketId].lastMove > CONNECTION_TIMEOUT){
        delete players[socketId];
      }
  }

  //count how many active players there are:
  let count = 0;
  for (let socketId in players){
    count++;
  }

  //if there are two players
    //somehow let client know he's phantom
  //else
    //somehow let client know he's active
    //add his id and loc to players object
    players[socket.id] = {x: 100, y: 500};


  socket.on("disconnect", function(){
    console.log("A user disconnected");
    delete players[socket.id];
  });
  socket.on("player_update", function(data){
    // console.log("player_update"+JSON.stringify(data));
    // console.log(players);
    players[socket.id] = data;
    io.emit("player_update",players);
  });
});

http.listen(PORT, ()=>console.log("Listening on "+PORT));
