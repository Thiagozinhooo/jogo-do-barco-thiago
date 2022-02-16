class Boat{

    constructor(x,y,width,height,boatPos){

        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x,y,width,height);

        this.boatPosition = boatPos;

        this.image = loadImage("./assets/boat.png")

        World.add(world, this.body);

    }

    display(){

        var angle = this.body.angle;
        //var pos = this.body.position;

        push();
        translate(this.body.position.x,this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,this.boatPosition,this.width,this.height);
        pop();
    }

    remove(index){

        Body.setVelocity(this.body, {x:0, y:0});

        setTimeout(() =>{

            World.remove(world, this.body);

            delete balls[index];


        },1000);

        
    }
}