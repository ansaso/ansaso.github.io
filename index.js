function setup() {
    let numBalls = 20;
    let spring = 0.05;
    let friction = -0.1;
    let balls = [];
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.background(0)
    canvas.parent('background')
    for (let i = 0; i < numBalls; i++) {
        balls[i] = new Ball(
          random(width),
          random(height),
          random(30, 70),
          i,
          balls
        );
      }
 }

class Ball {
    constructor(x, y, r, id, oin) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.diameter = d;
      this.id = id;
      this.others = oin;
    }
  
    collide() {
      for (let i = this.id + 1; i < numBalls; i++) {
        // console.log(others[i]);
        let dx = this.others[i].x - this.x;
        let dy = this.others[i].y - this.y;
        let distance = sqrt(dx * dx + dy * dy);
        let minDist = this.others[i].diameter / 2 + this.diameter / 2;
        //   console.log(distance);
        //console.log(minDist);
        if (distance < minDist) {
          //console.log("2");
          let angle = atan2(dy, dx);
          let targetX = this.x + cos(angle) * minDist;
          let targetY = this.y + sin(angle) * minDist;
          let ax = (targetX - this.others[i].x) * spring;
          let ay = (targetY - this.others[i].y) * spring;
          this.vx -= ax;
          this.vy -= ay;
          this.others[i].vx += ax;
          this.others[i].vy += ay;
        }
      }
    }
  
    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x + this.diameter / 2 > width) {
        this.x = width - this.diameter / 2;
        this.vx *= friction;
      } else if (this.x - this.diameter / 2 < 0) {
        this.x = this.diameter / 2;
        this.vx *= friction;
      }
      if (this.y + this.diameter / 2 > height) {
        this.y = height - this.diameter / 2;
        this.vy *= friction;
      } else if (this.y - this.diameter / 2 < 0) {
        this.y = this.diameter / 2;
        this.vy *= friction;
      }
    }
  
    display() {
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  }

 function draw() {
    background(0);
    balls.forEach(ball => {
      ball.collide();
      ball.move();
      ball.display();
    });
}
 
 function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 }

