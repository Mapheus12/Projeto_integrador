let sol;
let estrelas = [];
let x = 0, y = 0;
let angulo = 0;
let girando = false;
let orbitaMercurio = 75;
  
  function preload() {
  sol = loadImage('./RESOURCES/planets/sun.png');
  mercurio = loadImage('./RESOURCES/planets/mercurio.png');
  venus = loadImage('./RESOURCES/planets/venus.png');
  terra = loadImage('./RESOURCES/planets/terra.png');
  marte = loadImage('./RESOURCES/planets/marte.png');
  jupter = loadImage('./RESOURCES/planets/jupter.png');
  lua = loadImage('./RESOURCES/planets/lua.png');
}

  function setup(){
  createCanvas(1100, 800);
  strokeWeight(3);
  stroke(255);
  imageMode(CENTER);

  for (let i = 0;i < 300; i++){
  estrelas[i] = [];
  estrelas[i][0] = random(width); // x
  estrelas[i][1] = random(height); // y
  estrelas[i][2] = random(1,5); // Parallax layer
  }
}
    
function draw() {
  background(0, 200);
  
    for (let i = 0;i< 200; i++){
    
    let shine = map(estrelas[i][2], 1, 5, 1, 10);
    strokeWeight(map(sin(frameCount * 0.05 + i), -1, 1, 1, 5));
    

    stroke(255);
    point(estrelas[i][0],estrelas[i][1]);
  }
  
  
  noFill(); 
  stroke(50); 
  strokeWeight(3); 
  
  circle(width/2, height/2, 750);
  circle(width/2, height/2, 600);
  circle(width/2, height/2, 450);
  circle(width/2, height/2, 300);
  circle(width/2, height/2, 150);

  translate(width/2, height/2);
  
  image(sol, 0, 0, 80, 80);

  let mercurioX = cos(frameCount * 0.015 ) * 150 / 2;
  let venusX = cos(frameCount * 0.01 ) * 300 / 2;
  let terraX = cos(frameCount * 0.008 ) * 450 / 2;
  let marteX = cos(frameCount * 0.005 ) * 600 / 2;
  let jupterX = cos(frameCount * 0.003 ) * 750 / 2;

  
  let mercurioY = sin(frameCount * 0.015 ) * 150 / 2;
  let venusY = sin(frameCount * 0.01 ) * 300 / 2;
  let terraY = sin(frameCount * 0.008 ) * 450 / 2;
  let marteY = sin(frameCount * 0.005 ) * 600 / 2;
  let jupterY = sin(frameCount * 0.003 ) * 750 / 2;



  image(mercurio, mercurioX, mercurioY , 30, 30);
  image(venus, venusX, venusY, 35, 35);
  image(terra, terraX, terraY, 38, 38);
  image(marte, marteX, marteY, 40, 40);
  image(jupter, jupterX, jupterY, 80, 80);
  image(lua, terraX + cos(frameCount * 0.03) * 35, terraY + sin(frameCount * 0.03) * 35, 15, 15);

}

