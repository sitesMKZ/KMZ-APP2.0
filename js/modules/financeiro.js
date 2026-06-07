import { getDB, saveDB, generateId } from '../core/storage.js';

let financeChartInstance = null;

export function initFinanceiro() {
    document.getElementById('formFinanceiro').addEventListener('submit', (e) => {
        e.preventDefault();
        const desc = document.getElementById('finDesc').value;
        const valor = parseFloat(document.getElementById('finValor').value);
        const data = document.getElementById('finData').value;
        const tipo = document.getElementById('finTipo').value;
        const cat = document.getElementById('finCat').value;

        let db = getDB('kmz_financeiro');
        db.push({ id: generateId(), desc, valor, data, tipo, cat });
        saveDB('kmz_financeiro', db);
        e.target.reset();
        renderFinanceiro();
    });
}

export function renderFinanceiro() {
    const db = getDB('kmz_financeiro');
    const list = document.getElementById('listaFinancas');
    list.innerHTML = '';
    
    let receitas = 0;
    let despesas = 0;

    db.sort((a,b) => new Date(b.data) - new Date(a.data)).forEach(f => {
        if(f.tipo === 'receita') receitas += f.valor;
        else despesas += f.valor;
        
        list.innerHTML += `
            <div class="list-item" style="border-left-color: var(--${f.tipo==='receita'?'success':'danger'})">
                <div class="item-info">
                    <h4>${f.desc}</h4>
                    <span class="text-muted text-sm">${f.cat} | ${f.data.split('-').reverse().join('/')}</span>
                </div>
                <div class="item-actions">
                    <strong class="text-${f.tipo==='receita'?'green':'red'}">R$ ${f.valor.toFixed(2)}</strong>
                    <button class="btn btn-danger" onclick="delFinanca('${f.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    document.getElementById('finReceitas').textContent = `R$ ${receitas.toFixed(2).replace('.',',')}`;
    document.getElementById('finDespesas').textContent = `R$ ${despesas.toFixed(2).replace('.',',')}`;

    renderChart(receitas, despesas);
}

window.delFinanca = (id) => { 
    saveDB('kmz_financeiro', getDB('kmz_financeiro').filter(f => f.id !== id)); 
    renderFinanceiro(); 
};

function renderChart(rec, des) {
    const ctx = document.getElementById('financeChart').getContext('2d');
    if(financeChartInstance) financeChartInstance.destroy();
    
    financeChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Receitas', 'Despesas'],
            datasets: [{
                data: [rec, des],
                backgroundColor: ['#10B981', '#EF4444'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, plugins: { legend: { labels: { color: '#F8FAFC' } } } }
    });
}

