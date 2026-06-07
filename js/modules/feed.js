export function initFeed() {
    window.loadRSSFeed = async () => {
        const feedContainer = document.getElementById('feedContainer');
        const sourceSelect = document.getElementById('feedSource').value;
        
        feedContainer.innerHTML = '<p class="text-center text-muted"><i class="fa-solid fa-spinner fa-spin"></i> Buscando notícias...</p>';

        let feedsToLoad = sourceSelect === 'all' ? [
            'https://tecnoblog.net/feed/',
            'https://canaltech.com.br/rss/',
            'https://www.adrenaline.com.br/feed/'
        ] : [sourceSelect];

        try {
            let allItems = [];
            for(let url of feedsToLoad) {
                const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
                const response = await fetch(api);
                const data = await response.json();
                
                if(data.status === 'ok') {
                    const items = data.items.map(i => ({...i, sourceName: data.feed.title}));
                    allItems = allItems.concat(items);
                }
            }

            allItems.sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate));
            allItems = allItems.slice(0, 20);

            feedContainer.innerHTML = '';
            if(allItems.length === 0) {
                feedContainer.innerHTML = '<p class="text-center text-muted">Não foi possível carregar as notícias.</p>';
                return;
            }

            allItems.forEach(item => {
                let img = item.thumbnail || (item.enclosure && item.enclosure.link) ? item.enclosure.link : 'https://via.placeholder.com/400x200/1E293B/F97316?text=Notícia';
                if(img.includes('placeholder') && item.description.match(/<img[^>]+src="([^">]+)"/)) {
                    img = item.description.match(/<img[^>]+src="([^">]+)"/)[1];
                }

                const dateStr = new Date(item.pubDate).toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'});

                feedContainer.innerHTML += `
                    <div class="news-card">
                        <img src="${img}" alt="Capa" class="news-img" onerror="this.src='https://via.placeholder.com/400x200/1E293B/F97316?text=Sem+Imagem'">
                        <div class="news-content">
                            <span class="text-primary text-sm">${item.sourceName}</span>
                            <h4 class="news-title">${item.title}</h4>
                            <span class="news-date">${dateStr}</span>
                            <a href="${item.link}" target="_blank" class="btn btn-full">Ler Notícia <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                    </div>
                `;
            });
        } catch(err) {
            feedContainer.innerHTML = '<p class="text-center text-red">Erro ao buscar feed. Verifique sua conexão.</p>';
            console.error(err);
        }
    };
}

