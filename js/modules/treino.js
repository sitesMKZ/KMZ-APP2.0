import { getDB, saveDB, generateId } from '../core/storage.js';

export function initTreino() {
    document.getElementById('formTreino').addEventListener('submit', (e) => {
        e.preventDefault();
        const ex = document.getElementById('treinoExercicio').value;
        const s = document.getElementById('treinoSeries').value;
        const r = document.getElementById('treinoReps').value;
        const p = document.getElementById('treinoPeso').value;

        let db = getDB('kmz_treino');
        db.unshift({ id: generateId(), ex, s, r, p, date: new Date().toLocaleDateString('pt-BR') });
        saveDB('kmz_treino', db);
        e.target.reset();
        renderTreino();
    });
    renderTreino();
}

function renderTreino() {
    const list = document.getElementById('listaTreinos');
    list.innerHTML = '';
    getDB('kmz_treino').forEach(t => {
        list.innerHTML += `
            <div class="list-item">
                <div class="item-info">
                    <h4>${t.ex}</h4>
                    <span class="text-muted text-sm">${t.s}x${t.r} - ${t.p}kg | ${t.date}</span>
                </div>
                <button class="btn btn-danger" onclick="delTreino('${t.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    });
}

window.delTreino = (id) => {
    saveDB('kmz_treino', getDB('kmz_treino').filter(t => t.id !== id));
    renderTreino();
};

