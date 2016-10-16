const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const socket = io();


// if (window.innerWidth > window.innerHeight){
//   //landscape orientation, main constraint is height
//   if(window.innerHeight <= canvas.height){
//     canvas.style.height = "100vh";
//     canvas.style.width = "auto";
//   }
// }
// else{
//   //portrait orientation, constraint is width
//   if (window.innerWidth > canvas.width){
//     canvas.style.width = "100%";
//     canvas.style.height = "auto";
//   }
// }

let spectatorMode = false;
//check if session has 2 people already, if so then spectator mode and no player
if (false){
  spectatorMode = true;
}
let localPlayer = new Player(100, 500, socket);
let remotePlayers = {};
ctx.fillStyle = "#FFFFFF";
function gameLoop(){
  ctx.fillRect(0,0,canvas.width,canvas.height);
  if (!spectatorMode){
    localPlayer.update();
    localPlayer.render(ctx);
  }
  for (let ply in remotePlayers){
    remotePlayers[ply].render(ctx);
  }
  window.requestAnimationFrame(gameLoop);
}

gameLoop();
