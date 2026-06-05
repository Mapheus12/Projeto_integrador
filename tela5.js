let chuva = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255, random(100, 220), 0);
    for(let i = 0; i < 200; i++){
      chuva[i] = [];
      chuva[i][0] = random(width); // valores de x
      chuva[i][1] = random(height); // valores de y
      chuva[i][2] = random(1, 5); // valores de profundidade
    }
}

function draw() {
  background(0  , 50);
    for(let i = 0; i < 200; i++){
      let vel = map(chuva[i][2], 1, 5, 3, 8);
      let tam = map(chuva[i][2], 1, 5, 4, 12);
      let esp = map(chuva[i][2], 1, 5, 0.5, 2.5);
      strokeWeight(esp);

      line(chuva[i][0], chuva[i][1], chuva[i][0], chuva[i][1] + tam);
      chuva[i][1] += vel;
      
      if(chuva[i][1] > height){
         chuva[i][1] = random(-40, -10);
      }
  
    }
}