/**
 * Writania Blog Logic
 */

function createBlogCard(blog, idx) {
    const div = document.createElement('div');
    div.className = 'col-12 col-md-6 col-lg-4 mb-5';
    const fallbackImages = ['img/workspace1.png', 'img/workspace2.png', 'img/workspace3.png', 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=800'];
    const safeIdx = typeof idx === 'number' ? idx : 0;
    const imgUrl = blog.image || fallbackImages[safeIdx % 4];
    const isBookmarked = (JSON.parse(localStorage.getItem('writania_bookmarks')) || []).includes(blog.id);

    div.innerHTML = `
        <div class="blog-card h-100 border rounded-lg overflow-hidden shadow-sm hover-up bg-white" onclick="window.location.href = 'blog-detail.html?id=${blog.id}'">
            <div class="position-relative" style="height: 200px; overflow: hidden;">
                <img src="${imgUrl}" class="w-100 h-100 object-fit-cover" alt="${blog.title}">
                <button onclick="event.stopPropagation(); toggleBookmark(${blog.id})" 
                        class="position-absolute border-0 rounded-circle shadow-sm"
                        style="top: 12px; right: 12px; width: 36px; height: 36px; background: white; color: ${isBookmarked ? 'var(--primary)' : '#64748b'};">
                    <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
                </button>
            </div>
            <div class="p-4 d-flex flex-column" style="flex: 1;">
                <div class="d-flex justify-content-between mb-2 small text-muted">
                    <span class="badge bg-light text-muted border">${blog.category}</span>
                    <span>${blog.date ? new Date(blog.date).toLocaleDateString() : 'Recently'}</span>
                </div>
                <h3 class="h5 fw-bold mb-2">${blog.title}</h3>
                <p class="text-muted small line-clamp-2 mb-4">${blog.excerpt || 'Read more...'}</p>
                <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-2">
                        <img src="${getAvatarUrl(blog.avatar || blog.author, blog.author)}" class="rounded-circle" style="width: 24px; height: 24px;">
                        <span class="small fw-bold">${blog.author}</span>
                    </div>
                    <div class="small text-muted d-flex gap-2">
                        <span><i class="fa-solid fa-eye me-1"></i>${blog.views || 0}</span>
                        <span class="text-danger"><i class="fa-solid fa-heart me-1"></i>${blog.likes || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    return div;
}

function toggleBookmark(blogId) {
    let bookmarks = JSON.parse(localStorage.getItem('writania_bookmarks')) || [];
    const idx = bookmarks.indexOf(blogId);
    if (idx > -1) bookmarks.splice(idx, 1);
    else bookmarks.push(blogId);
    localStorage.setItem('writania_bookmarks', JSON.stringify(bookmarks));
    location.reload();
}

function loadAllBlogs() {
    const grid = document.getElementById('blogsGrid');
    if (!grid) return;
    const blogs = JSON.parse(localStorage.getItem('writania_blogs')) || [];
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const filtered = blogs.filter(b => b.title.toLowerCase().includes(searchQuery) || b.author.toLowerCase().includes(searchQuery));
    grid.innerHTML = '';
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No blogs found matching your search.</p></div>';
    } else {
        filtered.forEach((b, i) => grid.appendChild(createBlogCard(b, i)));
    }
}

function loadBlogDetail() {
    const params = new URLSearchParams(window.location.search);
    const blogId = parseInt(params.get('id'));
    if (!blogId) return;
    const blogs = JSON.parse(localStorage.getItem('writania_blogs')) || [];
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return;
    if (document.getElementById('blogTitle')) document.getElementById('blogTitle').textContent = blog.title;
    if (document.getElementById('blogContent')) document.getElementById('blogContent').innerHTML = blog.content;
    if (document.getElementById('authorName')) document.getElementById('authorName').textContent = blog.author;
    if (document.getElementById('blogHeroImage')) document.getElementById('blogHeroImage').src = blog.image;
    if (document.getElementById('likeCount')) document.getElementById('likeCount').textContent = blog.likes || 0;
}

function handleLike(blogId) {
    const blogs = JSON.parse(localStorage.getItem('writania_blogs')) || [];
    const idx = blogs.findIndex(b => b.id === blogId);
    if (idx !== -1) {
        blogs[idx].likes = (blogs[idx].likes || 0) + 1;
        localStorage.setItem('writania_blogs', JSON.stringify(blogs));
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;
    const path = pathname.endsWith('/') ? 'index.html' : pathname.split('/').pop();
    
    if (path === 'index.html' || path === '' || path.includes('index')) {
        const blogs = JSON.parse(localStorage.getItem('writania_blogs')) || [];
        const trending = [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0));
        const container = document.getElementById('trending-container');
        if (container) {
            container.innerHTML = '';
            trending.slice(0, 3).forEach((b, i) => container.appendChild(createBlogCard(b, i)));
        }
    } else if (path === 'blogs.html') {
        loadAllBlogs();
        document.getElementById('searchInput')?.addEventListener('input', loadAllBlogs);
    } else if (path === 'blog-detail.html') {
        loadBlogDetail();
    }
});
