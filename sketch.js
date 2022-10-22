var path,boy,cash,diamonds,coin,bomb, Replay;
var pathImg,boyImg,cashImg,diamondsImg,coinImg,bombImg,ReplayButton;
var score = 0;
var cashG,diamondsG,coinG,bombGroup;
var collectSound, gameOverSound;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  coinImg = loadImage("coin.png");
  bombImg = loadImage("bomb.png");
  endImg =loadImage("gameOver.png");
  collectSound= loadSound("collect.mp3");
  gameOverSound= loadSound("fail.mp3");
  ReplayButton= loadImage("replay.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
path=createSprite(width/2,200, windowWidth, windowHeight);
path.addImage(pathImg);


//creating boy running
boy = createSprite(width/2,height-170,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("GameOver", endImg);
boy.scale=0.15;

Replay = createSprite(width/2,(height/2)+200,20,50);
Replay.addImage(ReplayButton);
Replay.scale= 0.9;
Replay.visible= false;

gameOver = createSprite(width/2,height/2,20,50);
gameOver.addImage(endImg);
gameOver.scale= 1.5;
gameOver.visible=false;
  
cashG=new Group();
diamondsG=new Group();
coinG=new Group();
bombGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background("#4C4D4F");
  boy.x = World.mouseX;
 
 // TESTS

 // if (boy.x>0) {
 //   console.log(boy.x);
 // }

  console.log(path.velocityY);


  path.velocityY= (6 + 3*score/100);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createcoin();
    createbomb();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      score=score+50;
      collectSound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score=score+100;
      collectSound.play();
    }
    else if(coinG.isTouching(boy)) {
      coinG.destroyEach();
      score= score + 150;
      collectSound.play();
    }
  
    if(bombGroup.isTouching(boy)) {
        gameState=END;
        gameOverSound.play();
    }

  }

  if (gameState==END) {

        path.velocityY=0;
     
        boy.visible=false;

        Replay.visible= true;

        gameOver.visible=true;

        cashG.destroyEach();
        diamondsG.destroyEach();
        coinG.destroyEach();
        bombGroup.destroyEach();

        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        coinG.setVelocityYEach(0);
        bombGroup.setVelocityYEach(0);

        if(mousePressedOver (Replay)|| touches.length>0){
          playAgain();
          touches=[];
        }
  }



  drawSprites();

  textSize(50);
  fill("orange");
  textFont("Courier New");
  textSize(25);
  text("TREASURE COLLECTED:"+ score,width/3,height-30);
  }

  function playAgain() {
    gameState=PLAY;
    Replay.visible=false;
    gameOver.visible=false;

    boy.visible=true;

    score=0;

  }

function createCash() {
  if (World.frameCount % 300 == 0) {
  var cash = createSprite(Math.round(random(100, width-100),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.15;
  cash.velocityY = (6 + 3*score/100);
  cash.lifetime = 550;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 420 == 0) {
  var diamonds = createSprite(Math.round(random(100, width-100),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.015;
  diamonds.velocityY = (6 + 3*score/100);
  diamonds.lifetime = 550;
  diamondsG.add(diamonds);
}
}

function createcoin() {
  if (World.frameCount % 540 == 0) {
  var coin = createSprite(Math.round(random(100, width-100),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.02;
  coin.velocityY = (6 + 3*score/100);
  coin.lifetime = 550;
  coinG.add(coin);
  }
}

function createbomb(){
  if (World.frameCount % 660 == 0) {
  var bomb = createSprite(Math.round(random(100, width-100),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale=0.1;
  bomb.velocityY = (6 + 3*score/100);
  bomb.lifetime = 550;
  bombGroup.add(bomb);


  }
}

