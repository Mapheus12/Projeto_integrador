let nave, sol;
let x = 0, y = 0;
let angulo = 0;
let estrelas = [];

function preload() {
  nave = loadImage('.//RESOURCES/nave.png');
  sol = loadImage('./RESOURCES/sol.png');
}

function setup() {
  createCanvas(1200, 800);
  strokeWeight(3);
  stroke(255);
  for (let i = 0;i < 200; i++){
    estrelas[i] = [];
    estrelas[i][0] = random(width); // x
    estrelas[i][1] = random(height); // y
    estrelas[i][2] = random(1,5); // Parallax layer
  }
}

function draw() {
  imageMode(CENTER);
  background(10, 10, 20, 200);
  
  stroke(255)
  for (let i = 0;i< 200; i++){
    
    let shine = map(estrelas[i][2], 1, 5, 1, 10);
    strokeWeight(map(sin(frameCount * 0.05 + i), -1, 1, 1, 5));
    
    point(estrelas[i][0],estrelas[i][1]);
  }
  

  let btnW = 120;
  let btnH = 40;
  let btn1X = width / 2 - 150 - btnW / 2;
  let btn1Y = height - 100;
  let btn2X = width / 2 + 150 - btnW / 2;
  let btn2Y = height - 100;

  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);
  text('Escolha uma rota para iniciar sua missão', width / 2, 60);

  // Button 1 (Esquerda)
  if (mouseX >= btn1X && mouseX <= btn1X + btnW && mouseY >= btn1Y && mouseY <= btn1Y + btnH) {
    fill(200, 200, 255); // Hover color
    cursor(HAND);        // Change cursor to pointer
  } else {
    fill(255);
  }
  rect(btn1X, btn1Y, btnW, btnH, 10); // '10' adds rounded corners

  // Button 2 (Direita)
  if (mouseX >= btn2X && mouseX <= btn2X + btnW && mouseY >= btn2Y && mouseY <= btn2Y + btnH) {
    fill(200, 200, 255); 
    cursor(HAND);        
  } else {
    fill(255);
  }
  rect(btn2X, btn2Y, btnW, btnH, 10);

  // Button Text
  fill(0);
  textSize(16);
  text('Esquerda', btn1X + btnW / 2, btn1Y + btnH / 2);
  text('Direita', btn2X + btnW / 2, btn2Y + btnH / 2);


  // aumenta o ângulo
  angulo += 0.02;
  
  //NAVE
  
  // move o ponto de rotação
  translate(width/2,height/2);
  
  // desenha a nave
  image(nave, x, y, 100, 100);
  
  // soma +1 ao valor de x, fazendo a nave 'andar'
  x++;
  
  // condição para a nave retornar a tela após chegar no final
  if (x > width / 2 + 50) {
    x = -width / 2 - 50;
  }
  
  // faz com que a nave se movimemnte para cima e para baixo
  y = 20 * sin(x / 10) +150;


  
}
function mouseClicked(){

  let btnW = 120;
  let btnH = 40;
  let btn1X = width / 2 - 150 - btnW / 2;
  let btn1Y = height - 100;
  let btn2X = width / 2 + 150 - btnW / 2;
  let btn2Y = height - 100;

  // Logica para o primeiro botao
  if (mouseX >= btn1X && mouseX <= btn1X + btnW && mouseY >= btn1Y && mouseY <= btn1Y + btnH) {
    window.location.href = 'tela1.html';
  } 
  // logica para o segundo botao
  else if (mouseX >= btn2X && mouseX <= btn2X + btnW && mouseY >= btn2Y && mouseY <= btn2Y + btnH) {
    window.location.href = 'tela2.html';
  }
}