let fundo;
let img2;
let img3;
let playing = false;
let particulas = [];
let alienW = 150;
let alienH = 150;
let vulcaoW = 200;
let vulcaoH = 200;
let musFundo;
let musLava;
let musAlien;

function preload() {
  fundo = loadImage("./RESOURCES/marte.jpg");
  img2 = loadImage("./RESOURCES/ET.gif");
  img3 = loadImage("./RESOURCES/vulcao.png");

  musFundo = loadSound("./RESOURCES/sounds/fundo.mp3");
  musLava  = loadSound("./RESOURCES/sounds/lava.mp3");
  musAlien = loadSound("./RESOURCES/sounds/alien.mp3");
}

function setup() {
  createCanvas(1300, 800);
  fundo.resize(0, height);
  img2.pause();
  musFundo.loop(); 
}

function draw() {
  image(fundo, 0, 0);
  let x = width - alienW - 48;
  let y = height - alienH - 47;
  let a = 100;
  let b = height - vulcaoH - 120;

  image(img3, a, b, vulcaoW, vulcaoH);

  for (let i = particulas.length - 1; i >= 0; i--) {
    let p = particulas[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1;
    p.vida -= 4;
    fill(255, random(50, 150), 0, p.vida);
    noStroke();
    ellipse(p.x, p.y, p.tamanho);
    if (p.vida <= 0) particulas.splice(i, 1);
  }

  image(img2, x, y, alienW, alienH);
}

function mouseClicked() {
  let x = width - alienW - 48;
  let y = height - alienH - 47;
  let a = 100;
  let b = height - vulcaoH - 56;

  // Clique no alien
  if (mouseX > x && mouseX < x + alienW && mouseY > y && mouseY < y + alienH) {
    if (playing) {
      img2.pause();
      musAlien.stop(); 
      playing = false;
    } else {
      img2.play();
      musAlien.play(); 
      playing = true;
    }
  }

  // Clique no vulcão
  if (mouseX > a && mouseX < a + vulcaoW && mouseY > b && mouseY < b + vulcaoH) {
    musLava.play(); 
    for (let i = 0; i < 30; i++) {
      particulas.push({
        x: a + vulcaoW / 2,
        y: b,
        vx: random(-3, 3),
        vy: random(-8, -3),
        tamanho: random(5, 20),
        vida: 255
      });
    }
  }
}