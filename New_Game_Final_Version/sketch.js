var bg, bgImg
var guardian, guardianR, guardianL
var asteroidImg, ufoImg, spaceTrashImg, blackHoleImg
var obstacle, obstaclesGroup
var side 

function preload(){
  bgImg = loadImage("Images/Space.jpg")
  guardianR = loadImage("Images/Guardian_of_the_galaxyR.png")
  guardianL = loadImage("Images/Guardian_of_the_galaxyL.png")
  spaceTrashImg = loadImage("Images/Scrap_Metal.png")
  blackHoleImg = loadImage("Images/Black_hole.png")
  ufoImg = loadImage("Images/Ufo.png")
  asteroidImg = loadImage("Images/Asteroid.png")
  
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

  side = "right"
  obstaclesGroup = new Group();

}

function draw() {
background(0)
if(bg.y>800){
bg.y = bg.height/2
}

if(keyDown("left")){
  guardian.x = guardian.x - 10
  guardian.addImage(guardianL)
  side = "left"
}

if(keyDown("right")){
  guardian.x = guardian.x + 10
  guardian.addImage(guardianR)
  side = "right"
}


spawnObstacle()
drawSprites()

if(keyDown("space")){
  console.log(side)
  if(side === "left"){
  strokeWeight(5)
  stroke("red")
  line(guardian.x-30,guardian.y-80, guardian.x-30, 0)
  }

  if(side === "right"){
    strokeWeight(5)
    stroke("red")
    line(guardian.x+30,guardian.y-80, guardian.x+30, 0)
    }
}

}

function spawnObstacle(){
  if(frameCount% 120 === 0){
    obstacle=createSprite(Math.round(random(200,600)),0)
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(ufoImg);
              break;
      case 2: obstacle.addImage(spaceTrashImg);
              obstacle.scale = 0.5
              break;
      case 3: obstacle.addImage(blackHoleImg);
              break;
      case 4: obstacle.addImage(asteroidImg);
              obstacle.scale = 0.7
              break;
      default: break;
    }
    obstacle.velocityY = 3
    obstacle.lifetime = 500
    obstaclesGroup.add(obstacle);
    

  }
}
