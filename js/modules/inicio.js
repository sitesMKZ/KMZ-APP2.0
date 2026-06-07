import { getDB } from '../core/storage.js';

export function initInicio() {
    function updateClock() {
        const now = new Date();
        document.getElementById('clockDisplay').textContent = now.toLocaleTimeString('pt-BR');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let dateStr = now.toLocaleDateString('pt-BR', options);
        document.getElementById('dateDisplay').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }
    setInterval(updateClock, 1000);
    updateClock();
    updateHomeOverview();
}

export function updateHomeOverview() {
    const tarefas = getDB('kmz_estudos').filter(t => !t.concluida).slice(0, 3);
    const ul = document.getElementById('homeTasks');
    ul.innerHTML = '';
    if (tarefas.length === 0) {
        ul.innerHTML = '<p class="text-muted text-center mt-2">Nenhuma tarefa pendente!</p>';
    } else {
        tarefas.forEach(t => {
            ul.innerHTML += `<li class="list-item">
                <div><strong>${t.titulo}</strong><br><small class="text-muted">${t.materia} - ${t.data}</small></div>
            </li>`;
        });
    }

    const financas = getDB('kmz_financeiro');
    const saldo = financas.reduce((acc, curr) => curr.tipo === 'receita' ? acc + curr.valor : acc - curr.valor, 0);
    const homeBalance = document.getElementById('homeBalance');
    homeBalance.textContent = `R$ ${saldo.toFixed(2).replace('.', ',')}`;
    homeBalance.className = saldo >= 0 ? 'text-green' : 'text-red';
}

