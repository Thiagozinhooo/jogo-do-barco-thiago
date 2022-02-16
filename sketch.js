const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boat = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  
  //boat = new Boat(width -80, height - 100, 170,170,-80)
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
    collisionB_B(i);
  }

  cannon.display();

  showBoats();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >= height -50){
      ball.remove(index);
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function showBoats(){

  if(boat.length > 0){
    if(boat[boat.length -1] === undefined || boat[boat.length -1].body.position.x < width -300){

      var positions = [-20,-40,-60,-50];
      var position = random(positions);
      var boat1 = new Boat (width -80, height - 60, 170, 170,position);

      boat.push(boat1);
    }

    for (var i = 0; i < boat.length; i++){
      if(boat[i]){
       Body.setVelocity(boat[i].body, {x:-2 ,y:0})
       boat[i].display();
      }
    }
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  else {

    var boat1 = new Boat (width -80, height - 60, 170, 170,-80);
    boat.push(boat1);
  }
}

function collisionB_B(index){

  for (var i = 0; i < boat.length; i++){

    if(balls[index] !== undefined && boats[i] !== undefined){

      var collision = Matter.SAT.collides(balls[index].body,boat[i].body);


    }

    if (collision.collided){

      boat[i].remove(i);
      
      world.remove(world,boat[index].body);
      delete balls[index];

    }
  }
}