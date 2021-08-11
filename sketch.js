const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1;
var platform;
var POLYGON;
var backgroundImg;
gameState = "connected";

function preload() {
    backgroundImg = loadImage("sprites/bg.jpg");
    getTime()
}

function setup(){
    var canvas = createCanvas(1700,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,2200,20);
    ground2 = new Ground(1350,250,300,10)
    ground3 = new Ground(1000,300,300,10)
    //platform = new Ground(150, 305, 300, 170);

    box1 = new Box(900,250,70,70);
    box2 = new Box(1000,250,70,70);
    box3 = new Box(1100,250,70,70);
    box4 = new Box(950,180,70,70);
    box5 = new Box(1050,180,70,70);
    box6 = new Box(1000,100,70,70);
    box7 = new Box(1250,200,70,70);
    box8 = new Box(1350,200,70,70);
    box9 = new Box(1450,200,70,70);
    box10 = new Box(1300,150,70,70);
    box11 = new Box(1400,150,70,70);
    box12 = new Box(1350,50,70,70);
    POLYGON = new polygon(100,100);
    chain = new slingShot(POLYGON.body, {x:200,y:300});
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    ground2.display();
    ground3.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();
    box8.display();
    box9.display();
    box10.display();
    box11.display();
    box12.display();

    POLYGON.display();
    //platform.display();
    //log6.display();
    chain.display();
}

function mouseDragged(){
    if(gameState !== "launched"){
    Matter.Body.setPosition(POLYGON.body,{x: mouseX, y: mouseY})
    }
}

function mouseReleased(){
    chain.fly();
    gameState = "launched"
}

function keyPressed(){
    if(keyCode === 32){
        chain.attach(POLYGON.body);
    }
}

async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Chicago");
    console.log(response);
    var responseJson = await response.json();
    console.log(responseJson);
    var dateTime = responseJson.datetime
    var hour = dateTime.slice(11,13);
    console.log(hour);

    if(hour < 19 && hour > 7){
        bg = "sprites/bg.jpg" 
    }
    else{
        bg = "sprites/bg2.jpg"
    }
    backgroundImg = loadImage(bg);
}