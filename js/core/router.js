import { loadRSSFeed } from '../modules/feed.js';
import { renderFinanceiro } from '../modules/financeiro.js';
import { updateHomeOverview } from '../modules/inicio.js';

export function initRouter() {
    const views = document.querySelectorAll('.view');
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            views.forEach(view => view.classList.remove('active'));
            
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            if (targetId === 'view-feed' && document.getElementById('feedContainer').innerHTML.includes('Carregando')) {
                loadRSSFeed();
            }
        });
    });

    // Anexando ao window para o HTML conseguir chamar
    window.openSubView = (id) => {
        views.forEach(view => view.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        if(id === 'view-financeiro') renderFinanceiro();
    };

    window.closeSubView = () => {
        views.forEach(view => view.classList.remove('active'));
        document.getElementById('view-inicio').classList.add('active');
        updateHomeOverview();
    };
}

