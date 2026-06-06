  let chuva = [];
  let objetos = [];
  let pantano, pedras, galhos, plantinha;

  let galhoX, galhoY;
  let pedraX, pedraY
  let plantaX, plantaY;

  function preload() {
    pantano = loadImage('./RESOURCES/pantano.png');
    pedras = loadImage('./RESOURCES/pantano_objetos/pedras.png');
    galhos = loadImage('./RESOURCES/pantano_objetos/galhos.png');
    plantinha = loadImage('./RESOURCES/pantano_objetos/plantinha.png');



    for (let i = 0; i < 3; i++) {
      objetos[i] = [];
      objetos[i][2] = loadImage(`./RESOURCES/pantano_objetos/${i}.png`);
    }
  }

  function setup() {
    createCanvas(1200, 800);

    // --- 1. CONFIGURAÇÃO DOS OBJETOS MÓVEIS (Loop) ---
    // Índices: [0]=X, [1]=Y, [2]=Imagem, [3]=vX, [4]=vY, [5]=offsetX, [6]=offsetY
    for (let i = 0; i < 3; i++) {
      objetos[i][0] = random(100, width - 100);  
      objetos[i][1] = random(200, height - 200); // Mantém mais no centro da água
      objetos[i][2].resize(0, 90);               
      
      objetos[i][3] = random(0, 3);             // vX (Velocidade horizontal)
      objetos[i][4] = 0;                         // vY = 0 (Sem movimento vertical)
      
      // Como a imagem tem altura de 90px e desenhamos a partir do canto (CORNER),
      // o centro-base aproximado é x + 45 e y + 80. Ajuste conforme a imagem real!
      objetos[i][5] = 45; // offsetX (Ajuste preciso no eixo X da imagem)
      objetos[i][6] = 80; // offsetY (Ajuste preciso no eixo Y da imagem)
    }


    // --- 3. CONFIGURAÇÃO DA CHUVA (Ripples) ---
    for (let i = 0; i < 100; i++) {
      chuva[i] = [];
      chuva[i][0] = 0;
      chuva[i][1] = 0;
      chuva[i][2] = 0;
      chuva[i][3] = 0;
      chuva[i][4] = 0; 
    }

    galhoX = random(width), galhoY = random(height);
    pedraX = random(width), pedraY = random(height);
    plantaX = random(width), plantaY = random(height);

    pedras.resize(0,90);
    galhos.resize(0,90);
    plantinha.resize(0,120);
  }

  function draw() {
    // Fundo de água
    background(115, 172, 155);
    imageMode(CORNER);  
    
    // --- DESENHA RIPPLES ---
    for (let i = 0; i < 100; i++) {
      if (chuva[i][4] === 1) { 
        chuva[i][2] += 1.5; 
        chuva[i][3] -= 4;   

        noFill();
        stroke(255, 255, 255, chuva[i][3]);
        strokeWeight(2);
        ellipse(chuva[i][0], chuva[i][1], chuva[i][2] * 2, chuva[i][2]);
        
        if (chuva[i][3] <= 0) {
          chuva[i][4] = 0; 
        }
      }
    }

    noStroke();
    
    for (let i = 0; i < 3; i++) {
      
      // Atualiza apenas a posição X (vY é sempre 0)
      objetos[i][0] += objetos[i][3]; 

      // Wrap around para o eixo X
      if (objetos[i][3] > 0 && objetos[i][0] > width + 100) {
        objetos[i][0] = -100;
      } else if (objetos[i][3] < 0 && objetos[i][0] < -100) {
        objetos[i][0] = width + 100;
      }

      // Cria as ondulações do rastro natualmente na base do objeto
      if (frameCount % 30 === 0) {
        // Usa as coordenadas precisas de Offset X e Y
        let trailX = objetos[i][0] + objetos[i][5]; 
        let trailY = objetos[i][1] + objetos[i][6]; 
        
        for (let j = 0; j < 100; j++) {
          if (chuva[j][4] === 0) {
            chuva[j][0] = trailX;
            chuva[j][1] = trailY; 
            chuva[j][2] = 0;
            chuva[j][3] = 150;
            chuva[j][4] = 1; 
            break; 
          }
        }
      }

      // Desenha o objeto
      image(objetos[i][2], objetos[i][0], objetos[i][1]);
    }

      image(pedras, pedraX, galhoY);
      image(galhos, galhoX, galhoY);
      image(plantinha, plantaX, plantaY);

    // --- DESENHA A MÁSCARA DO PÂNTANO POR CIMA DE TUDO ---
    imageMode(CENTER);
    image(pantano, width / 2, height / 2, 1200 * 1.6, 655 * 1.6);
  }

  function mousePressed() {
    for (let i = 0; i < 100; i++) {
      if (chuva[i][4] === 0) {
        chuva[i][0] = mouseX;
        chuva[i][1] = mouseY;
        chuva[i][2] = 0;
        chuva[i][3] = 255;
        chuva[i][4] = 1; 
        break; 
      }
    }
  }