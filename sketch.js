var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

}

function draw() {
  background(0);
  
  if(gameState == 'play'){
    if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x -3;
  }

  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x +3;
  }

  if(keyDown('SPACE')){
    ghost.velocityY = -4;
  }

  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0;
  }

  if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
    ghost.destroy();
    gameState = 'end';
  }

  score = score + Math.round(getFrameRate()/60);
  ghost.velocityY = ghost.velocityY +0.8;
  spawnDoors();
  drawSprites();
  }
  else if(gameState == 'end'){
    stroke('yellow');
    fill('yellow');
    textSize(30);
    text("GAME OVER", 230,250);
  }

}

function spawnDoors(){
  if(frameCount%250 == 0){
    door = createSprite(Math.round(random(120,400)), -50);
    door.addImage(doorImg);
    door.velocityY = 3 + Math.round(score/300);
    door.lifetime = 200;
    doorsGroup.add(door);
    climber = createSprite(door.x,10);
    climber.addImage(climberImg);
    climber.velocityY = door.velocityY;
    climber.lifetime = 200;
    climbersGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth += 1;
    invisibleBlock = createSprite(door.x,15,climber.width,2);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = door.velocityY;
    invisibleBlockGroup.add(invisibleBlock);

  }
}