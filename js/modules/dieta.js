import { getDB, saveDB, generateId } from '../core/storage.js';

export function initDieta() {
    document.getElementById('formDieta').addEventListener('submit', (e) => {
        e.preventDefault();
        const hora = document.getElementById('dietaHora').value;
        const ref = document.getElementById('dietaRefeicao').value;
        const obs = document.getElementById('dietaObs').value;

        let db = getDB('kmz_dieta');
        db.push({ id: generateId(), hora, ref, obs, date: new Date().toLocaleDateString('pt-BR') });
        saveDB('kmz_dieta', db);
        e.target.reset();
        renderDieta();
    });
    renderDieta();
}

function renderDieta() {
    const list = document.getElementById('listaDieta');
    list.innerHTML = '';
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    getDB('kmz_dieta').filter(d => d.date === hoje).sort((a,b) => a.hora.localeCompare(b.hora)).forEach(d => {
        list.innerHTML += `
            <div class="list-item">
                <div class="item-info">
                    <h4><i class="fa-regular fa-clock"></i> ${d.hora} - ${d.ref}</h4>
                    <span class="text-muted text-sm">${d.obs}</span>
                </div>
                <button class="btn btn-danger" onclick="delDieta('${d.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    });
}

window.delDieta = (id) => { 
    saveDB('kmz_dieta', getDB('kmz_dieta').filter(d => d.id !== id)); 
    renderDieta(); 
};

