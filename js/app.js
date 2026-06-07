import { initRouter } from './core/router.js';
import { initInicio } from './modules/inicio.js';
import { initEstudos } from './modules/estudos.js';
import { initTreino } from './modules/treino.js';
import { initDieta } from './modules/dieta.js';
import { initFinanceiro } from './modules/financeiro.js';
import { initFerramentas } from './modules/ferramentas.js';
import { initFeed } from './modules/feed.js';

window.onload = () => {
    initRouter();
    initInicio();
    initEstudos();
    initTreino();
    initDieta();
    initFinanceiro();
    initFerramentas();
    initFeed();
};

