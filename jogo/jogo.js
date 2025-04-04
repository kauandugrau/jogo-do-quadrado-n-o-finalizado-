const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');

let gravidade = 0.5;
let gameOver = false;
let pontuacao = 0;
let pontuacaoMaxima = localStorage.getItem('pontuacaoMaxima') || 0;

document.addEventListener('keydown', (evento) => {
    if (evento.code === 'Space' && !personagem.pulando) {
        personagem.velocidade_y = 15;
        personagem.pulando = true;
    }
    if (evento.code === 'KeyA') {
        personagem.movendoEsquerda = true;
    }
    if (evento.code === 'KeyD') {
        personagem.movendoDireita = true;
    }
});

document.addEventListener('keyup', (evento) => {
    if (evento.code === 'KeyA') {
        personagem.movendoEsquerda = false;
    }
    if (evento.code === 'KeyD') {
        personagem.movendoDireita = false;
    }
});

let personagem = {
    x: 100,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    velocidade_x: 5,  
    pulando: false,
    movendoEsquerda: false,
    movendoDireita: false,
    imagem: new Image()
};

personagem.imagem.src = './personagem.jpg';

let obstaculo = {
    x: canvas.width - 100,
    y: canvas.height - 100,
    largura: 30,
    altura: Math.random() * 150 + 50, 
    velocidade_x: -3
};

function desenharPersonagem() {
    ctx.drawImage(personagem.imagem, personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function atualizaPersonagem() {
    if (personagem.movendoEsquerda) {
        personagem.x -= personagem.velocidade_x;
    }
    if (personagem.movendoDireita) {
        personagem.x += personagem.velocidade_x;
    }

    if (personagem.pulando) {
        personagem.y -= personagem.velocidade_y;
        personagem.velocidade_y -= gravidade;
    }

    if (personagem.y >= canvas.height - personagem.altura) {
        personagem.y = canvas.height - personagem.altura;
        personagem.velocidade_y = 0;
        personagem.pulando = false;
    }

    if (personagem.x < 0) {
        personagem.x = 0;
    }
    if (personagem.x + personagem.largura > canvas.width) {
        personagem.x = canvas.width - personagem.largura;
    }
}

function desenharObstaculo() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    if (!gameOver) {
        obstaculo.x += obstaculo.velocidade_x;

        if (obstaculo.x + obstaculo.largura < 0) {
            obstaculo.x = canvas.width;
            obstaculo.velocidade_x -= 1;
            obstaculo.altura = Math.random() * 150 + 50;
            pontuacao++; 
        }
    }
}

function desenharPontuacao() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Pontuação: ${pontuacao}`, 20, 30);
    ctx.fillText(`Recorde: ${pontuacaoMaxima}`, 20, 60);
}

function verificaColisao() {
    if (
        obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.x + obstaculo.largura > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true;
        obstaculo.velocidade_x = 0;
        personagem.velocidade_y = 0;

        ctx.fillStyle = 'black';
        ctx.font = '50px Arial';
        ctx.fillText('Se fodeu', 300, 200);

        restartButton.style.display = 'block'; 

        if (pontuacao > pontuacaoMaxima) {
            pontuacaoMaxima = pontuacao;
            localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima);
        }
    }
}

function reiniciarJogo() {
    gameOver = false;
    personagem.y = canvas.height - 50;
    personagem.x = 100;
    personagem.velocidade_y = 0;
    obstaculo.x = canvas.width - 100;
    obstaculo.velocidade_x = -3;
    pontuacao = 0; 

    restartButton.style.display = 'none';
    loop();
}

restartButton.addEventListener('click', reiniciarJogo);

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharPersonagem();
        atualizaPersonagem();
        desenharObstaculo();
        atualizarObstaculo();
        desenharPontuacao();
        verificaColisao();

        requestAnimationFrame(loop);
    }
}

loop();
