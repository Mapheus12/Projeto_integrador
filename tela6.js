let sol;
let estrelas = [];
let mercurio, venus, terra, marte, jupiter, saturno, urano, netuno, lua;
  
  function preload() {
  sol = loadImage('./RESOURCES/planets/sun.png');
  mercurio = loadImage('./RESOURCES/planets/mercurio.png');
  venus = loadImage('./RESOURCES/planets/venus.png');
  terra = loadImage('./RESOURCES/planets/terra.png');
  marte = loadImage('./RESOURCES/planets/marte.png');
  jupter = loadImage('./RESOURCES/planets/jupter.png');
  saturno = loadImage('./RESOURCES/planets/saturno.png');
  urano = loadImage('./RESOURCES/planets/urano.png');
  netuno = loadImage('./RESOURCES/planets/netuno.png');
  lua = loadImage('./RESOURCES/planets/lua.png');
}

  function setup(){
  createCanvas(windowWidth, windowHeight);
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
  background(0,0,0, 200);
  
    for (let i = 0;i< 300; i++){
    
    let shine = map(estrelas[i][2], 1, 5, 1, 10);
    strokeWeight(map(sin(frameCount * 0.05 + i), -1, 1, 1, 5));
    

    stroke(255);
    point(estrelas[i][0],estrelas[i][1]);
  }
  
  
  noFill(); 
  stroke(50); 
  strokeWeight(3); 
  
  // Órbitas dos planetas
  circle(width/2, height/2, 150);  
  circle(width/2, height/2, 300);  
  circle(width/2, height/2, 450);  
  circle(width/2, height/2, 600);  
  circle(width/2, height/2, 750);  
  circle(width/2, height/2, 900);  
  circle(width/2, height/2, 1050); 
  circle(width/2, height/2, 1200); 

  translate(width/2, height/2);
  
  image(sol, 0, 0, 80, 80);

  // velocidades dos planetas
  let vMercurio = 0.04;
  let vVenus = 0.02;
  let vTerra = 0.01;
  let vMarte = 0.006;
  let vJupiter = 0.002;
  let vSaturno = 0.001;
  let vUrano = 0.0006;
  let vNetuno = 0.0003;
  let vLua = 0.05;


  let mercurioX = cos(frameCount * vMercurio) * 150 / 2;
  let mercurioY = sin(frameCount * vMercurio) * 150 / 2;
  
  let venusX = cos(frameCount * vVenus) * 300 / 2;
  let venusY = sin(frameCount * vVenus) * 300 / 2;
  
  let terraX = cos(frameCount * vTerra) * 450 / 2;
  let terraY = sin(frameCount * vTerra) * 450 / 2;
  
  let marteX = cos(frameCount * vMarte) * 600 / 2;
  let marteY = sin(frameCount * vMarte) * 600 / 2;
  
  let jupiterX = cos(frameCount * vJupiter) * 750 / 2;
  let jupiterY = sin(frameCount * vJupiter) * 750 / 2;

  let saturnoX = cos(frameCount * vSaturno) * 900 / 2;
  let saturnoY = sin(frameCount * vSaturno) * 900 / 2;

  let uranoX = cos(frameCount * vUrano) * 1050 / 2;
  let uranoY = sin(frameCount * vUrano) * 1050 / 2;

  let netunoX = cos(frameCount * vNetuno) * 1200 / 2;
  let netunoY = sin(frameCount * vNetuno) * 1200 / 2;



// Draw Planets
  image(mercurio, mercurioX, mercurioY, 25, 25);
  image(venus, venusX, venusY, 35, 35);
  image(terra, terraX, terraY, 38, 38);
  image(lua, terraX + cos(frameCount * vLua) * 35, terraY + sin(frameCount * vLua) * 35, 15, 15);
  image(marte, marteX, marteY, 30, 30);
  image(jupter, jupiterX, jupiterY, 80, 80);
  image(saturno, saturnoX, saturnoY, 115, 70); 
  image(urano, uranoX, uranoY, 50, 50);
  image(netuno, netunoX, netunoY, 48, 48);

}

