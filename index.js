const header = document.querySelector('header');
window.addEventListener('scroll',() =>{
    header.classList.toggle('scrolled', window.scrollY > 50);
} );

const track = document.querySelector('.div-cards');
const container = document.querySelector('.div-cards').parentElement;
let cards = Array.from(document.querySelectorAll('.card'));
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

const cardWidth = cards[0].offsetWidth + 20; 
const visiveis = Math.floor(container.offsetWidth / cardWidth) || 1;

const clonesInicio = cards.slice(-visiveis).map(c => c.cloneNode(true));
const clonesFim = cards.slice(0, visiveis).map(c => c.cloneNode(true));
clonesInicio.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));
clonesFim.forEach(clone => track.appendChild(clone));

let index = visiveis;

function posicionar(comAnimacao = true) {
    track.style.transition = comAnimacao ? 'transform 0.4s ease' : 'none';
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}
posicionar(false);


track.addEventListener('transitionend', () => {
    const totalReal = cards.length;

    if (index >= totalReal + visiveis) {
        index = visiveis;
        posicionar(false);
    }

    if (index < visiveis) {
        index = totalReal + index - visiveis + visiveis; 
        index = totalReal + (index - visiveis); 
        posicionar(false);
    }
});

// transforma a lógica de avançar em função separada, pra reaproveitar
function avancar() {
    index++;
    posicionar(true);
}

function voltar() {
    index--;
    posicionar(true);
}

btnNext.addEventListener('click', avancar);
btnPrev.addEventListener('click', voltar);

// autoplay
let autoplay = setInterval(avancar, 1000); // avança a cada 3 segundos

// pausa quando o mouse entra na área do carrossel
container.addEventListener('mouseenter', () => {
    clearInterval(autoplay);
});

// retoma quando o mouse sai
container.addEventListener('mouseleave', () => {
    autoplay = setInterval(avancar, 3000);
});

document.getElementById('btnRolar').addEventListener('click', () =>{
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
});

function enviarWhats(event){
    event.preventDefault()

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const telefone = '5511960846817'
    const texto = `Olá! Me chamo ${nome}, estou entrando em contato para: ${mensagem}`
    const msgFormatada = encodeURIComponent(texto)
    const url = `https://whatsa.me/${telefone}/?t=${msgFormatada}`

    window.open(url, '_blank')
}


