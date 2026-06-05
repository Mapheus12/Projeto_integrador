let chuva = [];
let macaco; 
let campo; 
let banana; 
let pontos = 0;
let jogoAcabou = false;
let ganhou = false; 

function preload(){
  macaco = loadImage("./RESOURCES/floresta/macaco.png");
  campo = loadImage("./RESOURCES/floresta/campo.png");
  banana = loadImage("./RESOURCES/floresta/banana.png");
}

function setup() {
  createCanvas(1200, 800);
  

  for(let i = 0 ; i < 60 ; i++){
    chuva[i] = [];
    chuva[i][0] = random(0, width);  
    chuva[i][1] = random(-800, 0); 
    chuva[i][2] = random(1, 2); 
  }
}

function draw() {
  background(campo);
  
  if (jogoAcabou) {
    fill(255, 0, 0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(20);
    fill(255);
    text("Clique na tela para reiniciar", width / 2, height / 2 + 50);
    return;
  }

  if (ganhou) {
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(255, 215, 0); // Cor dourada
    text("VOCÊ GANHOU!", width / 2, height / 2 - 80);
    
    textSize(20);
    fill(255);
    text("Clique para escolher um lado para seguir:", width / 2, height / 2 - 30);
   
    // Definições de tamanho e posição dos botões (Centralizados)
    let btnW = 220; // Largura
    let btnH = 80;  // Altura
    let btnY = height / 2 + 20; // Posição Y
    
    let btn1X = width / 2 - btnW - 20; // Posição X Botão Esquerdo
    let btn2X = width / 2 + 20;        // Posição X Botão Direito
    
    // Checa se o mouse está sobre o botão esquerdo
    let hoverEsq = mouseX > btn1X && mouseX < btn1X + btnW && mouseY > btnY && mouseY < btnY + btnH;
    // Checa se o mouse está sobre o botão direito
    let hoverDir = mouseX > btn2X && mouseX < btn2X + btnW && mouseY > btnY && mouseY < btnY + btnH;
    
    stroke(255);
    strokeWeight(2);
    
    // Desenha o Botão Esquerdo com Hover
    if (hoverEsq) {
      fill(0, 200, 255, 200); // Cor mais clara (Hover)
    } else {
      fill(0, 150, 255, 150); // Cor normal
    }
    rect(btn1X, btnY, btnW, btnH, 10);   
    
    // Desenha o Botão Direito com Hover
    if (hoverDir) {
      fill(0, 200, 255, 200); // Cor mais clara (Hover)
    } else {
      fill(0, 150, 255, 150); // Cor normal
    }
    rect(btn2X, btnY, btnW, btnH, 10);    
    
    // Textos dos botões
    noStroke();
    fill(255);
    text("Caminho Esquerdo", btn1X + btnW / 2, btnY + btnH / 2);
    text("Caminho Direito", btn2X + btnW / 2, btnY + btnH / 2);
    return; 
  }


  fill(255);
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  text("Pontos: " + pontos, 30, 30);
  

  let macacoX = mouseX - 25; 
  let macacoY = mouseY - 25;
  image(macaco, macacoX, macacoY, 50, 50);


  if (mouseY < 30) {
    ganhou = true;
  }


  for (let i = 0 ; i < chuva.length ; i++){
    let vel = map(chuva[i][2], 1 , 2 , 3 , 5); 
    let tam = map(chuva[i][2], 1 , 5 , 15, 25); 

    image(banana, chuva[i][0], chuva[i][1], tam, tam);

    chuva[i][1] += vel;
    
 
    if(chuva[i][1] > height){
      chuva[i][1] = random(-150, -10);
      chuva[i][0] = random(0, width);
      pontos++; 
    }

    let distancia = dist(macacoX + 25, macacoY + 25, chuva[i][0] + tam/2, chuva[i][1] + tam/2);
    if (distancia < (25 + tam/2) - 5) { 
      jogoAcabou = true;
    }
  }
}

function reiniciarJogo() {
  pontos = 0;
  jogoAcabou = false;
  ganhou = false;
  for(let i = 0 ; i < chuva.length ; i++){
    chuva[i][1] = random(-800, 0);
    chuva[i][0] = random(0, width);
  }
}


function mousePressed() {
  if (jogoAcabou) {
    reiniciarJogo();
  } else if (ganhou) {
    // Mesmas medidas usadas no draw()
    let btnW = 220; 
    let btnH = 80;  
    let btnY = height / 2 + 20; 
    let btn1X = width / 2 - btnW - 20; 
    let btn2X = width / 2 + 20;        

    // Verifica clique exato no botão esquerdo
    if (mouseX > btn1X && mouseX < btn1X + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        window.location.href = 'tela3.html';
    } 
    // Verifica clique exato no botão direito
    else if (mouseX > btn2X && mouseX < btn2X + btnW && mouseY > btnY && mouseY < btnY + btnH) {
        window.location.href = 'tela4.html';
    }
  }
}