import { getDB, saveDB, generateId } from '../core/storage.js';
import { updateHomeOverview } from './inicio.js';

export function initEstudos() {
    document.getElementById('formEstudos').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('estudoId').value || generateId();
        const titulo = document.getElementById('estudoTitulo').value;
        const materia = document.getElementById('estudoMateria').value;
        const data = document.getElementById('estudoData').value;
        const prioridade = document.getElementById('estudoPrioridade').value;

        let db = getDB('kmz_estudos');
        const index = db.findIndex(t => t.id === id);
        const task = { id, titulo, materia, data, prioridade, concluida: false };
        
        if (index > -1) { task.concluida = db[index].concluida; db[index] = task; } 
        else { db.push(task); }
        
        saveDB('kmz_estudos', db);
        e.target.reset();
        document.getElementById('estudoId').value = '';
        renderEstudos();
        updateHomeOverview();
    });
    renderEstudos();
}

function renderEstudos() {
    const db = getDB('kmz_estudos');
    const list = document.getElementById('listaEstudos');
    list.innerHTML = '';
    db.sort((a,b) => new Date(a.data) - new Date(b.data)).forEach(t => {
        list.innerHTML += `
            <div class="list-item ${t.concluida ? 'concluida' : ''}">
                <div class="item-info">
                    <h4>${t.titulo} <span class="text-primary text-sm">(${t.prioridade})</span></h4>
                    <span class="text-muted text-sm">${t.materia} | ${t.data.split('-').reverse().join('/')}</span>
                </div>
                <div class="item-actions">
                    <button class="btn btn-success" onclick="toggleEstudo('${t.id}')"><i class="fa-solid fa-check"></i></button>
                    <button class="btn btn-danger" onclick="delEstudo('${t.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });
}

window.toggleEstudo = (id) => {
    let db = getDB('kmz_estudos');
    const item = db.find(t => t.id === id);
    if(item) { item.concluida = !item.concluida; saveDB('kmz_estudos', db); renderEstudos(); updateHomeOverview(); }
};

window.delEstudo = (id) => {
    let db = getDB('kmz_estudos');
    saveDB('kmz_estudos', db.filter(t => t.id !== id));
    renderEstudos();
    updateHomeOverview();
};

