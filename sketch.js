var edges
var PLAY = 1
var END1 = 0
var END2 = 3
var gameState = PLAY
var bg, bgImg
var guardian, guardianR, guardianL
var asteroidImg, ufoImg, spaceTrashImg, blackHoleImg
var ufo, ufoGroup
var asteroid, asteroidGroup
var blackHole, blackHoleGroup
var trash, trashGroup
var side
var laser
var score
var checkPointSound, dieSound
var ufoCount = 0



function preload(){
  bgImg = loadImage("Images/Space.jpg")
  guardianR = loadImage("Images/Guardian_of_the_galaxyR.png")
  guardianL = loadImage("Images/Guardian_of_the_galaxyL.png")
  spaceTrashImg = loadImage("Images/Scrap_Metal.png")
  blackHoleImg = loadImage("Images/Black_hole.png")
  ufoImg = loadImage("Images/Ufo.png")
  asteroidImg = loadImage("Images/Asteroid.png")
  
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(800,1200)
  bg = createSprite(500,400)
  bg.addImage(bgImg)
  bg.y = bg.height/2
  bg.scale = 1.8
  bg.velocityY = 1

  guardian = createSprite(400,1000)
  guardian.addImage(guardianR)
  guardian.scale = 0.8
  //guardian.debug = true;
  guardian.setCollider("rectangle",0,0,150,220)

  side = "right"

  ufoGroup = new Group();
  asteroidGroup = new Group();
  trashGroup = new Group();
  blackHoleGroup = new Group();

  score = 0;
  edges = createEdgeSprites()
  //dieSound.setLoop(false)
}

function draw() {
background(0);
console.log(ufoCount)


if(ufoGroup.isTouching(guardian)){
  dieSound.play();
  gameState = END1;
}
if(blackHoleGroup.isTouching(guardian)){
  dieSound.play();
  gameState = END1;
}
if(trashGroup.isTouching(guardian)){
  dieSound.play();
  gameState = END1;
}
if(asteroidGroup.isTouching(guardian)){
  dieSound.play();
  gameState = END1;
}

if(gameState === PLAY){
if(bg.y>800){
bg.y = bg.height/2
}

score = score + Math.round(getFrameRate()/60);
if (score % 100 === 0 && score > 0 ){
  checkPointSound.play();
}
if(ufoGroup.isTouching(edges[3])){
  ufoGroup.destroyEach() 
  ufoCount ++
}

if(ufoCount === 3){
  dieSound.play();
  gameState = END2
}

if(keyDown("left") && guardian.x > 100){
  guardian.x = guardian.x - 10
  guardian.addImage(guardianL)
  side = "left"
}

if(keyDown("right") && guardian.x < 700){
  guardian.x = guardian.x + 10
  guardian.addImage(guardianR)
  side = "right"
}

if(keyDown("up") && guardian.y > 100){
  guardian.y = guardian.y - 10
  if(side === "right"){
  guardian.addImage(guardianR)
  }
  if(side === "left"){
    guardian.addImage(guardianL)
  }
}

if(keyDown("down") && guardian.y < 1100){
  guardian.y = guardian.y + 10
  if(side === "right"){
    guardian.addImage(guardianR)
  }
  if(side === "left"){
    guardian.addImage(guardianL)
  }
}

guardian.scale = 0.5;


spawnUfo()
spawnAsteroid()
spawnBlackHole()
spawnTrash()


if(keyWentDown("space")){
  console.log(guardian.y)
  if(side === "left"){
  //strokeWeight(5)
  //stroke("red")
  //line(guardian.x-30,guardian.y-80, guardian.x-30, 0)
  laser = createSprite(guardian.x-30,0, 5, guardian.y*2-80)
  laser.shapeColor = "red"
  console.log(laser.height)
  }

  if(side === "right"){
    //strokeWeight(5)
    //stroke("red")
    //line(guardian.x+30,guardian.y-80, guardian.x+30, 0)
    laser = createSprite(guardian.x+30,0, 5, guardian.y*2-80)
    laser.shapeColor = "red"
    }

    if(ufoGroup.isTouching(laser)){
      ufoGroup.destroyEach()  
    }

}

  if(keyWentUp("space")){
    laser.destroy()
  }
  

}
    drawSprites()

  if(gameState === END1){
    ufoGroup.setVelocityYEach(0);
    ufoGroup.setLifetimeEach(-1);

    asteroidGroup.setVelocityYEach(0);
    asteroidGroup.setLifetimeEach(-1);

    trashGroup.setVelocityYEach(0);
    trashGroup.setLifetimeEach(-1);

    blackHoleGroup.setVelocityYEach(0);
    blackHoleGroup.setLifetimeEach(-1);
    bg.velocityY = 0  
    textSize(50)
    fill(255)
    text("Game Over",300,600)
    dieSound.stop()
  }

  if(gameState === END2){
  ufoGroup.setVelocityYEach(0);
  ufoGroup.setLifetimeEach(-1);

  asteroidGroup.setVelocityYEach(0);
  asteroidGroup.setLifetimeEach(-1);

  trashGroup.setVelocityYEach(0);
  trashGroup.setLifetimeEach(-1);

  blackHoleGroup.setVelocityYEach(0);
  blackHoleGroup.setLifetimeEach(-1);
  bg.velocityY = 0  
  textSize(50)
  fill(255)
  text("Game Over",250,600)
  text("Mission Failed",250,650)
  text("Aliens have taken over the galaxy",50,700)
  }
  fill("white");
  textSize(24);
  text("Score: " + score, 600,100)

  dieSound.stop()
}



function spawnUfo(){
  if(frameCount% 420 === 0){
    ufo=createSprite(Math.round(random(100,700)),0)
    ufo.addImage(ufoImg)
    ufo.scale = 0.6
    ufo.velocityY = 3;
    ufo.lifetime = 500
    //ufo.debug = true;
    ufo.setCollider("rectangle",0,0,240,120)
    ufoGroup.add(ufo);
  }
}

function spawnAsteroid(){
  if(frameCount% 130 === 0){
    asteroid=createSprite(Math.round(random(100,700)),0)
    asteroid.addImage(asteroidImg)
    asteroid.scale = 0.5
    asteroid.velocityY = (3 + 3*score/200)
    asteroid.lifetime = 500
    //asteroid.debug = true;
    asteroid.setCollider("rectangle",0,0,150,150)
    asteroidGroup.add(asteroid);
  }
}

function spawnTrash(){
  if(frameCount% 90 === 0){
    trash=createSprite(Math.round(random(100,700)),0)
    trash.addImage(spaceTrashImg)
    trash.scale = 0.45
    trash.velocityY = (3 + 3*score/200)
    trash.lifetime = 500
    //trash.debug = true;
    trash.setCollider("rectangle",0,0,150,120)
    trashGroup.add(trash);
  }
}

function spawnBlackHole(){
  if(frameCount% 230 === 0){
    blackHole=createSprite(Math.round(random(100,700)),0)
    blackHole.addImage(blackHoleImg)
    blackHole.scale = 0.75
    blackHole.velocityY = (3 + 3*score/200)
    blackHole.lifetime = 500
    //blackHole.debug = true;
    blackHole.setCollider("rectangle",0,0,120,120)
    blackHoleGroup.add(blackHole);
  }
}