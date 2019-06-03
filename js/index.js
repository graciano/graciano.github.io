import { embaralha } from 'embaralha';
import './night-mode'

const tempoEmbaralha = 800;
const intervaloEmbaralha = 5 * 1000;
const h1 = document.querySelector('.h1-embaralha');

setInterval(() => embaralha(h1, tempoEmbaralha), intervaloEmbaralha);
