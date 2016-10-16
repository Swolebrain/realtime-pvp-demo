function Player(x,y, socket){
  this.x = x;
  this.y = y;
  this.velX = 0;
  this.velY = 0;
  this.spriteWidth = 50;
  this.spriteHeight = 50;
  this.speed = 10;
  let c = document.getElementById("canvas");
  this.maxX = c.width;
  this.maxY = c.height;
  this.socket = socket;
  initControls(this);
}
Player.prototype.update = function(){
  this.x += this.velX;
  this.y += this.velY;
  this.keepInBounds();
  socket.emit("player_update", {x:this.x, y:this.y} );
};
Player.prototype.render = function(ctx){
  if (!this.socket){ //remote players
    ctx.save();
    ctx.strokeStyle = "#00FF00";
    ctx.strokeRect(this.x-this.spriteWidth/2, this.y-this.spriteHeight/2, 50, 50);
    ctx.restore();
  }
  else
    ctx.strokeRect(this.x-this.spriteWidth/2, this.y-this.spriteHeight/2, 50, 50);
};
Player.prototype.keepInBounds = function(){
  if (this.x < this.spriteWidth/2) this.x = this.spriteWidth/2;
  if (this.x + this.spriteWidth/2 > this.maxX ) this.x = this.maxX - this.spriteWidth/2;
  if (this.y < this.spriteHeight/2) this.y = this.spriteHeight/2;
  if (this.y + this.spriteHeight/2 > this.maxY) this.y = this.maxY - this.spriteHeight/2;
}


function initControls(player){
  document.addEventListener("keydown", function(e){
    if (e.keyCode === 37) player.velX = -player.speed;
    if (e.keyCode === 38) player.velY = -player.speed;
    if (e.keyCode === 39) player.velX = player.speed;
    if (e.keyCode === 40) player.velY = player.speed;
  });

  document.addEventListener("keyup", function(e){
    if (e.keyCode === 37 && player.velX < 0) player.velX = 0;
    if (e.keyCode === 38 && player.velY < 0) player.velY = 0;
    if (e.keyCode === 39 && player.velX > 0) player.velX = 0;
    if (e.keyCode === 40 && player.velY > 0) player.velY = 0;
  });
}
