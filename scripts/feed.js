async function cargarFeed() {
    try {
        const res = await fetch('http://localhost:3000/api/posts');
        const posts = await res.json();
        renderFeed(posts);
    } catch (err) {
        console.error('Error al cargar el feed:', err);
    }
}

function renderFeed(posts) {
    const container = document.querySelector('.feed-container');
    container.innerHTML = '';
    posts.forEach(post => {
        // Si tienes authorId como objeto poblado, usa su nombre o username
        const author = post.authorId && (post.authorId.username || post.authorId.name || 'Usuario');
        const avatar = author ? author[0].toUpperCase() : 'U';
        const tags = (post.tags || []).map(t => `#${t}`).join(' ');
        let media = '';
        if (post.media && post.media.length > 0) {
            const m = post.media[0];
            media = m.type === "image"
                ? `<img src="${m.url}" alt="media">`
                : `<video controls src="${m.url}" style="max-height:200px;"></video>`;
        }
        container.innerHTML += `
        <div class="post-card">
            <div class="post-header">
                <div class="avatar">${avatar}</div>
                <div>
                    <div><strong>@${author}</strong></div>
                    <div style="font-size:0.9em; color:#ad1457;">${new Date(post.createdAt).toLocaleString()}</div>
                </div>
            </div>
            <div class="post-media">
                ${media}
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            <div class="post-tags">
                ${tags}
            </div>
            <div class="post-footer">
                <button class="like-btn">❤️ ${(post.likes ? post.likes.length : 0)}</button>
                <span>${(post.comments ? post.comments.length : 0)} comentario${(post.comments && post.comments.length !== 1) ? 's' : ''}</span>
                <span>Ubicación: ${(post.location && post.location.name) || 'N/A'}</span>
            </div>
        </div>
        `;
    });
}

cargarFeed();