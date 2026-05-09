/**
 * Writania Core Logic
 */

function initializeData() {
    const initialBlogs = [
      { 
        id: 101, 
        title: "The Renaissance of Generative AI in Creative Writing", 
        category: "Technology", 
        author: "Dr. Julian Voss", 
        authorId: 10, 
        likes: 2450, 
        views: 12800, 
        date: new Date(Date.now() - 86400000 * 1).toISOString(), 
        avatar: 'Julian', 
        content: "Generative AI is not a replacement for human creativity, but a powerful catalyst that augments our ability to weave complex narratives...", 
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200',
        excerpt: "Exploring how AI is reshaping the landscape of storytelling and empowering a new generation of digital authors.",
        readingTime: "8 min read"
      },
      { 
        id: 102, 
        title: "Mental Equilibrium: Navigating the Digital Noise", 
        category: "Wellness", 
        author: "Sarah Jenkins", 
        authorId: 11, 
        likes: 1890, 
        views: 8400, 
        date: new Date(Date.now() - 86400000 * 3).toISOString(), 
        avatar: 'Sarah', 
        content: "In an era of hyper-connectivity, the most valuable skill we can cultivate is the ability to disconnect and find our inner silence...", 
        image: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&w=1200',
        excerpt: "Practical strategies for maintaining focus and emotional balance in an increasingly distracted world.",
        readingTime: "6 min read"
      },
      { 
        id: 103, 
        title: "Architectural Ethos: Designing for the Next Century", 
        category: "Creativity", 
        author: "Marcus Thorne", 
        authorId: 12, 
        likes: 1240, 
        views: 5200, 
        date: new Date(Date.now() - 86400000 * 7).toISOString(), 
        avatar: 'Marcus', 
        content: "Sustainability is no longer an option; it is the fundamental core of future architecture. We must design with the planet in mind...", 
        image: 'https://images.unsplash.com/photo-1448630360428-65ff24a95ad1?auto=format&fit=crop&w=1200',
        excerpt: "A deep dive into sustainable urban design and the materials that will build our future cities.",
        readingTime: "10 min read"
      },
      { 
        id: 104, 
        title: "The Psychology of Peak Performance", 
        category: "Wellness", 
        author: "Dr. Emily Chen", 
        authorId: 13, 
        likes: 3100, 
        views: 15600, 
        date: new Date(Date.now() - 86400000 * 2).toISOString(), 
        avatar: 'Emily', 
        content: "Peak performance is as much about the mind as it is about physical effort. Understanding flow states is key...", 
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200',
        excerpt: "How to harness your cognitive resources to achieve consistent excellence in any field.",
        readingTime: "9 min read"
      },
      { 
        id: 105, 
        title: "Quantum Computing: The Next Frontier", 
        category: "Technology", 
        author: "Prof. Alan Turing II", 
        authorId: 14, 
        likes: 4200, 
        views: 22000, 
        date: new Date(Date.now() - 86400000 * 1).toISOString(), 
        avatar: 'Alan', 
        content: "We are on the brink of a computational revolution. Quantum bits are changing everything we know about security and speed...", 
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200',
        excerpt: "Understanding the complex world of qubits and how they will redefine the future of technology.",
        readingTime: "12 min read"
      },
      { 
        id: 106, 
        title: "The Silent Language of Color", 
        category: "Creativity", 
        author: "Lydia Monet", 
        authorId: 15, 
        likes: 2100, 
        views: 9800, 
        date: new Date(Date.now() - 86400000 * 4).toISOString(), 
        avatar: 'Lydia', 
        content: "Colors speak to our subconscious in ways words never can. Mastering the palette is the first step to visual mastery...", 
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200',
        excerpt: "An exploration of color theory and its emotional impact on design and storytelling.",
        readingTime: "7 min read"
      }
    ];

    const existingBlogs = JSON.parse(localStorage.getItem('writania_blogs'));
    if (!existingBlogs || existingBlogs.length < 5 || existingBlogs[0].title.includes("Minimalist")) {
        localStorage.setItem('writania_blogs', JSON.stringify(initialBlogs));
    }
    if (!localStorage.getItem('writania_users')) {
      localStorage.setItem('writania_users', JSON.stringify([
          { id: 10, name: "Dr. Julian Voss", bio: "AI researcher & futuristic storyteller.", avatar: 'Julian', stories: 25, likes: 45000, streak: 12, joined: '2023-01-15' },
          { id: 11, name: "Sarah Jenkins", bio: "Wellness coach & mindfulness advocate.", avatar: 'Sarah', stories: 18, likes: 22000, streak: 5, joined: '2023-03-20' }
      ]));
    }
}

function getAvatarUrl(seed, fallbackName = 'Creative') {
    if (!seed) return `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(fallbackName)}`;
    if (seed.startsWith('http') || seed.startsWith('data:image') || seed.includes('.png')) return seed;
    const styles = ['lorelei','adventurer','notionists','open-peeps','personas','micah','avataaars'];
    if (styles.includes(seed)) return `https://api.dicebear.com/7.x/${seed}/svg?seed=${encodeURIComponent(fallbackName)}`;
    return `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(seed)}`;
}

/* Save updated user to both users list & currentUser in localStorage */
function updateUser(user) {
    const users = JSON.parse(localStorage.getItem('writania_users')) || [];
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
        users[idx] = { ...users[idx], ...user };
    } else {
        users.push(user);
    }
    localStorage.setItem('writania_users', JSON.stringify(users));
    localStorage.setItem('writania_currentUser', JSON.stringify(user));
}

function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const colors = { 'success': '#10b981', 'error': '#ef4444', 'info': '#6366f1' };
    toast.innerText = message;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
        backgroundColor: colors[type] || colors.success, color: 'white',
        padding: '12px 28px', borderRadius: '50px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        zIndex: '9999', fontWeight: '600', animation: 'fadeIn 0.3s ease'
    });
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function generateNavbar() {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;
    const currentUser = JSON.parse(localStorage.getItem('writania_currentUser'));
    const isLoggedIn = !!currentUser;
    const pathname = window.location.pathname;
    const currentPath = pathname.endsWith('/') ? 'index.html' : pathname.split('/').pop();
    const navItems = [
        { name: 'Home', link: 'index.html' },
        { name: 'Blogs', link: 'blogs.html' },
        { name: 'Leaderboard', link: 'leaderboard.html' },
        ...(isLoggedIn ? [{ name: 'Dashboard', link: 'dashboard.html' }] : []),
        { name: 'Contact', link: 'contact.html' }
    ];

    navContainer.innerHTML = `
      <div class="container d-flex justify-content-between align-items-center h-100">
        <a href="index.html" class="logo">
          <div style="background: var(--primary); color: white; width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
            <i class="fa-solid fa-feather-pointed"></i>
          </div>
          <span class="text-cursive">Writania</span>
        </a>
        <div class="nav-links d-none d-lg-flex gap-4">
          ${navItems.map(item => `<a href="${item.link}" class="${currentPath === item.link ? 'active' : ''}">${item.name}</a>`).join('')}
        </div>
        <div class="d-flex align-items-center gap-3">
          ${isLoggedIn ? `
            <a href="write.html" class="btn btn-primary btn-sm d-none d-sm-inline-block" style="border-radius: 50px; padding: 8px 16px;">Write <i class="fa-solid fa-pen-nib ms-1"></i></a>
            <div class="user-pill d-flex align-items-center gap-2 border rounded-pill px-3 py-1 bg-light cursor-pointer" onclick="window.location.href='dashboard.html'">
              <img src="${getAvatarUrl(currentUser.avatar, currentUser.name)}" style="width: 24px; height: 24px; border-radius: 50%;">
              <span class="small fw-bold">${currentUser.name.split(' ')[0]}</span>
            </div>
            <button onclick="handleLogout()" class="btn-logout" style="background: rgba(0,0,0,0.05); border: none; color: #ef4444; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700;">Logout</button>
          ` : `
            <a href="login.html" class="btn btn-secondary btn-sm">Login</a>
            <a href="signup.html" class="btn btn-primary btn-sm">Join Free</a>
          `}
        </div>
      </div>
    `;
}

function generateFooter() {
    const footer = document.getElementById('main-footer') || document.createElement('footer');
    footer.id = 'main-footer';
    footer.className = 'py-5 mt-5 border-top bg-white';
    footer.innerHTML = `<div class="container text-center"><p class="text-muted mb-0">&copy; 2026 Writania. Empowering storytellers everywhere.</p></div>`;
    if (!document.getElementById('main-footer')) document.body.appendChild(footer);
}

function handleLogout() {
    localStorage.removeItem('writania_currentUser');
    showToast('Logged out', 'info');
    setTimeout(() => window.location.href = 'index.html', 800);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    generateNavbar();
    generateFooter();
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    // Auth listeners
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const users = JSON.parse(localStorage.getItem('writania_users')) || [];
            const user = users.find(u => u.email === email);
            if (user) {
                localStorage.setItem('writania_currentUser', JSON.stringify(user));
                showToast('Welcome back!');
                setTimeout(() => location.href = 'dashboard.html', 1000);
            } else showToast('User not found', 'error');
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const newUser = {
                id: Date.now(),
                name,
                email,
                avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede`,
                joinedDate: new Date().toISOString(),
                bio: '',
                streak: 1,
                stories: 0,
                likes: 0
            };
            const users = JSON.parse(localStorage.getItem('writania_users')) || [];
            users.push(newUser);
            localStorage.setItem('writania_users', JSON.stringify(users));
            localStorage.setItem('writania_currentUser', JSON.stringify(newUser));
            showToast('Account created!');
            setTimeout(() => location.href = 'dashboard.html', 1000);
        });
    }
});
