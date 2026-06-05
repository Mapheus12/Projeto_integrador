
let backgroundImage;

let objetos = [];
let estrelas = [];
let vento = 0.8;

function preload() {
  
  // Carrega a imagem de fundo
  backgroundImage = loadImage('./RESOURCES/FundoNave.png');

  // Carrega os objetos (de 0 a 15)
  for (let i = 0;i < 16; i++){
    objetos[i] = [];
    objetos[i][2] = loadImage(`./RESOURCES/objects/${i}.png`);
  }
  
}

function setup() {
  createCanvas(1200, 800);
  backgroundImage.resize(0,height);
  stroke(255);

  for (let i = 0;i < 200; i++){
    estrelas[i] = [];
    estrelas[i][0] = random(width); // x
    estrelas[i][1] = random(height); // y
    estrelas[i][2] = random(1,5); // Parallax layer
  }
  for (let i = 0;i < 16; i++){
    objetos[i][0] = random(100, width - 100); // x
    objetos[i][1] = random(100, height - 100); // y
    objetos[i][2].resize(0,120); // ajusta a escala dos objetos
    objetos[i][3] = random(3,-3) // vX (velocidade no eixo x)
    objetos[i][4] = random(3,-3) // vY (velocidade no eixo y)
  }
}

function draw() {
  background(0,200);

  /* -- estrelas -- */

  for (let i = 0;i< 200; i++){
  
    let vel = map(estrelas[i][2], 1, 5, 0.1, 1.5);
    let tam = map(estrelas[i][2], 1, 5, 4, 12);
    let esp = map(estrelas[i][2], 1, 5, 1.5, 3);
    strokeWeight(esp);
    
    point(estrelas[i][0],estrelas[i][1]);
    estrelas[i][1] += vel;
    estrelas[i][0] += vento;
    if (estrelas[i][1] > height){
      estrelas[i][1] = random(-40, -10);
    }
    if (estrelas[i][0] > width){
      estrelas[i][0] = random(-40, -10);
    }
    if (estrelas[i][0] < -40){
      estrelas[i][0] = random(width, width + 40);
    }
  }

  /* -- nave espacial -- */
  imageMode(CENTER);
  image(backgroundImage, width/2, height/2);

  /* -- Objetos -- */

  for (let i = 0; i < 16; i++){
    let velX = objetos[i][3];
    let velY = objetos[i][4];
    image(objetos[i][2], objetos[i][0], objetos[i][1]);

    objetos[i][0] += velX;
    objetos[i][1] += velY;



    if (objetos[i][0] + objetos[i][2].width/2 >= width){
      
      objetos[i][0] = width - objetos[i][2].width/2 // snap (idéia retirada da IA para solucionar o problema dos objetos "grudarem" nas bordas)
      objetos[i][3] *= -0.9;

    } else if (objetos[i][0] - objetos[i][2].width/2 <= 0 ) {

      objetos[i][0] = objetos[i][2].width/2 // snap (idéia retirada da IA para solucionar o problema dos objetos "grudarem" nas bordas)
      objetos[i][3] *= -0.9;
    }

    if (objetos[i][1] + objetos[i][2].height/2 >= height){

      objetos[i][1] = height - objetos[i][2].height/2 // snap (idéia retirada da IA para solucionar o problema dos objetos "grudarem" nas bordas)
      objetos[i][4] *= -0.9;

    } else if (objetos[i][1] - objetos[i][2].height/2 <= 0 ) {

      objetos[i][1] = objetos[i][2].height/2 // snap (idéia retirada da IA para solucionar o problema dos objetos "grudarem" nas bordas)
      objetos[i][4] *= -0.9;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 16; i++){

    let left = objetos[i][0] - objetos[i][2].width/2;
    let right = objetos[i][0] + objetos[i][2].width/2;
    let top = objetos[i][1] - objetos[i][2].height/2;
    let bottom = objetos[i][1] + objetos[i][2].height/2;

    //Check se o usuário clicou em algum objeto.
    if (mouseX > left && mouseX < right &&
        mouseY > top && mouseY < bottom) {
          objetos[i][3] += random(10,-10) // vX (velocidade no eixo x)
          objetos[i][4] += random(10,-10) // vY (velocidade no eixo y)
    }
  }

}