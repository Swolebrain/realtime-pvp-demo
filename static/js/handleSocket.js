socket.on("player_update", function(playerSnapshot){
  for (let socketId in playerSnapshot){
    if (socketId === localPlayer.socket.id){
      //pass for now, we can do speed hack validation
    }
    else{
      let coords = playerSnapshot[socketId];
      if (!remotePlayers[socketId]){
        //create it
        remotePlayers[socketId] = new Player(coords.x, coords.y, null);
      }
      remotePlayers[socketId].x = coords.x;
      remotePlayers[socketId].y = coords.y;
    }
  }
  for (let socketId in remotePlayers){
    if (!playerSnapshot.hasOwnProperty(socketId) && socketId != localPlayer.socket.id)
      delete remotePlayers[socketId];
  }
});
