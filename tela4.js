let fundo;
let xFundo = 0;
let esquilo = [];
let gravidade = 10;
let empuxo = 0;
let estadoJogo = "jogando"; 

// Transformando em Arrays (0 = P, 1 = M, 2 = G)
let arvores = [];
let cipos = [];

// obstaculosAtivos armazenará arrays de 5 posições:
// [0] = X (posição horizontal)
// [1] = Índice da Árvore (0, 1, 2) ou -1 se não houver
// [2] = Índice do Cipó (0, 1) ou -1 se não houver
// [3] = Y da Árvore
// [4] = Y do Cipó
let obstaculosAtivos = []; 
let velocidadeJogo = 4; 

function preload(){
  fundo = loadImage("./RESOURCES/fundo_arbustos.png");
  esquilo[0] = loadImage("./RESOURCES/esquilo.png");
  
  // Árvores em Array
  arvores[0] = loadImage("./RESOURCES/obstaculos/arvore_P.png"); // P
  arvores[1] = loadImage("./RESOURCES/obstaculos/arvore_M.png"); // M
  arvores[2] = loadImage("./RESOURCES/obstaculos/arvore_G.png"); // G
  
  // Cipós em Array
  cipos[0] = loadImage("./RESOURCES/obstaculos/cipo_P.png"); // P
  cipos[1] = loadImage("./RESOURCES/obstaculos/cipo_M.png"); // M
}

function setup() {
  createCanvas(1200, 800);
  esquilo[0].resize(0, 100);
  esquilo[1] = height / 2; 
  
  arvores[0].resize(0, 200);
  arvores[1].resize(0, 360);
  arvores[2].resize(0, 520);

  cipos[0].resize(0, 200);
  cipos[1].resize(0, 280); 
}

function draw() {
  if (estadoJogo === "jogando") {
    background(115, 215, 255);

    image(fundo, xFundo, 500, 1200, 300);
    image(fundo, xFundo + width, 500, 1200, 300);
    xFundo -= 2; 
    if (xFundo <= -width) { xFundo = 0; }

    if (frameCount % 100 === 0) {
      gerarObstaculo();
    }

    // Loop de trás para frente no Array
    for (let i = obstaculosAtivos.length - 1; i >= 0; i--) {
      
      // Movimenta o X do obstáculo
      obstaculosAtivos[i][0] -= velocidadeJogo; 
      
      let obsX = obstaculosAtivos[i][0];
      let indArvore = obstaculosAtivos[i][1];
      let indCipo = obstaculosAtivos[i][2];
      let yArv = obstaculosAtivos[i][3];
      let yCip = obstaculosAtivos[i][4];

      // --- DESENHO ---
      if (indArvore !== -1) {
        image(arvores[indArvore], obsX, yArv);
      }
      if (indCipo !== -1) {
        image(cipos[indCipo], obsX, yCip);
      }

      // --- HITBOX NARROW (40px) ---
      let hitboxLargura = 40; 
      let sqX = 50 + 10; 
      let sqY = esquilo[1] + 10; 
      let sqW = esquilo[0].width - 20; 
      let sqH = esquilo[0].height - 20; 

      // 1. Checa Colisão Árvore
      if (indArvore !== -1) {
        let larguraImgArvore = arvores[indArvore].width;
        let hitXArvore = obsX + (larguraImgArvore / 2) - (hitboxLargura / 2);

        if (sqX + sqW > hitXArvore && sqX < hitXArvore + hitboxLargura && 
            sqY + sqH > yArv) { 
          estadoJogo = "gameover";
        }
      }

      // 2. Checa Colisão Cipó
      if (indCipo !== -1) {
        let larguraImgCipo = cipos[indCipo].width;
        let alturaImgCipo = cipos[indCipo].height;
        let hitXCipo = obsX + (larguraImgCipo / 2) - (hitboxLargura / 2);
        let hitYCipo = yCip + alturaImgCipo; 

        if (sqX + sqW > hitXCipo && sqX < hitXCipo + hitboxLargura && 
            sqY < hitYCipo) { 
          estadoJogo = "gameover";
        }
      }

      // Limpeza da memória
      if (obsX < -300) {
        obstaculosAtivos.splice(i, 1);
      }
    }

    image(esquilo[0], 50, esquilo[1]);
    esquilo[1] += gravidade;
    esquilo[1] -= empuxo;
    if (empuxo > 0){ empuxo--; }
    
    if (esquilo[1] > height || esquilo[1] < -100) {
      estadoJogo = "gameover";
    }

  } else if (estadoJogo === "gameover") {
    background(0, 150); 
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(80);
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize(30);
    text("Click to play again", width / 2, height / 2 + 50);
  }
}

function gerarObstaculo() {
  let padrao = floor(random(3)); 
  
  // Usamos -1 para representar que o objeto NÃO vai spawnar
  let indArvoreSorteada = -1;
  let indCipoSorteado = -1;
  
  let yArvoreCalc = 0;
  let yCipoCalc = -20; // Cipó sempre fixa no topo (com folga de 20px)
  
  // 0 = Ambos, 1 = Só Árvore, 2 = Só Cipó
  if (padrao === 0) {
    indArvoreSorteada = floor(random(3)); // 0, 1, 2
    indCipoSorteado = floor(random(2));   // 0, 1
  } else if (padrao === 1) {
    indArvoreSorteada = floor(random(3));
  } else if (padrao === 2) {
    indCipoSorteado = floor(random(2));
  }

  if (indArvoreSorteada !== -1) {
    yArvoreCalc = height - arvores[indArvoreSorteada].height + 20;
  }

  // Se AMBOS existirem, checa a distância entre eles
  if (indArvoreSorteada !== -1 && indCipoSorteado !== -1) {
    let baseDoCipo = yCipoCalc + cipos[indCipoSorteado].height;
    let espacoLivre = yArvoreCalc - baseDoCipo; 
    
    let gapMinimo = 400;

   
    if (espacoLivre < gapMinimo) {
      yArvoreCalc = baseDoCipo + gapMinimo; 
    }
  }
  
  let novoObstaculo = [];
  novoObstaculo[0] = width;              // [0] = X
  novoObstaculo[1] = indArvoreSorteada;  // [1] = Qual Árvore (-1, 0, 1, 2)
  novoObstaculo[2] = indCipoSorteado;    // [2] = Qual Cipó (-1, 0, 1)
  novoObstaculo[3] = yArvoreCalc;        // [3] = Y final da Árvore
  novoObstaculo[4] = yCipoCalc;          // [4] = Y final do Cipó

  obstaculosAtivos.push(novoObstaculo);
}

function mouseClicked() {
  if (estadoJogo === "jogando") {
    empuxo = 25;
  } else if (estadoJogo === "gameover") {
    estadoJogo = "jogando";
    esquilo[1] = height / 2; 
    empuxo = 0; 
    obstaculosAtivos = []; 
    frameCount = 0; 
  }
}