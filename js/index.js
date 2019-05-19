import { embaralha } from 'embaralha';

const tempoEmbaralha = 800;
const intervaloEmbaralha = 10 * 1000;
const h1 = document.querySelector('.h1-embaralha');

setInterval(() => embaralha(h1, tempoEmbaralha), intervaloEmbaralha);
