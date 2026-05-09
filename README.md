# ✍️ Writania — Write, Share, Inspire

A modern blogging platform frontend built with **HTML, CSS, and Vanilla JavaScript**.

> A feature-rich platform for writers to publish stories, earn recognition, and connect with readers.

---

## 📁 Project Structure

```
fee project/
│
├── index.html          # 🏠 Homepage — Hero, trending stories, features
├── blogs.html          # 📝 All blogs — Browse & filter posts
├── blog-detail.html    # 📖 Single blog view — Read, like, comment
├── write.html          # ✍️  Write page — Create & publish new posts
├── dashboard.html      # 📊 User dashboard — My posts, analytics
├── leaderboard.html    # 🏆 Leaderboard — Top writers by points
├── about.html          # ℹ️  About — Our mission & team
├── contact.html        # 📬 Contact — Get in touch & FAQ
├── login.html          # 🔐 Login page
├── signup.html         # 📋 Sign up page
├── profile.html        # 👤 Public profile page
│
├── css/
│   └── style.css       # Global design system & component styles
│
├── js/
│   ├── main.js         # Core logic: navbar, footer, theme, localStorage
│   ├── auth.js         # Authentication: login, signup, session
│   └── blog.js         # Blog logic: CRUD, likes, comments, filtering
│
└── img/
    ├── avatar1.png     # Author avatar assets
    ├── avatar2.png
    ├── avatar3.png
    └── workspace*.png  # Workspace imagery
```

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔐 Auth System | Sign up / Login / Logout with LocalStorage persistence |
| ✍️ Write & Publish | Rich text editor to create and publish blog posts |
| 📊 Dashboard | View your posts, total likes, views, and writing streak |
| 🏆 Leaderboard | Ranked list of top authors by engagement points |
| ❤️ Likes & Comments | Interactive like and comment system per blog post |
| 🤖 AI Summaries | Auto-generated post summaries (simulated) |
| 🌙 Dark Mode | Toggle between light and dark themes |
| 📬 Contact Page | Contact form with FAQ and social links |
| 📱 Responsive | Mobile-friendly layout across all pages |
| 📤 Export | Export blog posts as `.txt` files |

---

## 🛠️ How to Run

This is a **pure frontend project** — no build step or server needed.

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/writania.git
   cd writania
   ```

2. **Open in browser:**
   - Simply open `index.html` in any modern browser, **or**
   - Use VS Code **Live Server** extension for best experience

3. **That's it!** All data is stored in the browser's `localStorage`.

---

## 📄 Pages Overview

| Page | URL | Description |
|---|---|---|
| Home | `index.html` | Landing page with hero, featured stories & stats |
| Blogs | `blogs.html` | Browse all published blogs with filtering |
| Blog Detail | `blog-detail.html` | Read a full post, like and comment |
| Write | `write.html` | Create and publish a new blog post |
| Dashboard | `dashboard.html` | Manage your posts and view analytics |
| Leaderboard | `leaderboard.html` | See the top writers ranked by points |
| About | `about.html` | Our mission and platform story |
| Contact | `contact.html` | Reach out, FAQs, social links |
| Login | `login.html` | Sign in to your account |
| Sign Up | `signup.html` | Create a new account |

---

## 🎨 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom design system (variables, animations, dark mode)
- **Vanilla JavaScript** — No frameworks, pure JS
- **LocalStorage** — Client-side data persistence
- **Font Awesome 6** — Icons
- **Google Fonts** — Typography

---

## 👤 Demo Account

After opening the site, you can create a free account via **Sign Up** or use sample data that loads automatically on first launch.

---

*Made with ❤️ for storytellers.*
