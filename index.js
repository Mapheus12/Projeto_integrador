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
  background(10, 10, 20, 200);
  
  for (let i = 0;i< 200; i++){
    
    let shine = map(estrelas[i][2], 1, 5, 1, 10);
    strokeWeight(map(sin(frameCount * 0.05 + i), -1, 1, 1, 5));
    
    point(estrelas[i][0],estrelas[i][1]);
  }
  
  fill(255);
  rect(15, 30, 3, 35);

  rect(50, 310, 100, 30);
  rect(250, 310, 100, 30);

  fill(0);
  textSize(15);
  text('Escolha uma rota para iniciar sua missão', 24, 51);
  text('Esquerda', 68, 330);
  text('Direita', 278, 330);


  push();

  // move o ponto de rotação
  translate(200, 150);

  // gira
  rotate(angulo);

  // desenha o sol centralizado
   image(sol, -50, -50, 100, 100);

  // volta ao estado anterior da tela, auxiliando não interferir em outras configurações
  pop();

  // aumenta o ângulo
  angulo += 0.02;
  
  //nave
  
  // move o ponto de rotação
  translate(0,200);
  
  // desenha a nave
  image(nave, x, y, 100, 100);
  
  // soma +1 ao valor de x, fazendo a nave 'andar'
  x++;
  
  // condição para a nave retornar a tela após chegar no final
  if( x > width)
    x = -70;
  
  // faz com que a nave se movimemnte para cima e para baixo
  y = 20 * sin(x / 10) + 5;

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
    window.location.href = 'tela2.html';
  } 
  // logica para o segundo botao
  else if (mouseX >= btn2X && mouseX <= btn2X + btnW && mouseY >= btn2Y && mouseY <= btn2Y + btnH) {
    window.location.href = 'tela3.html';
  }
}