import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, '../blog/_posts');
const OUTPUT_DIR = path.join(__dirname, '../blog');
const TEMPLATE_PATH = path.join(__dirname, '../blog-template.html');

// Configure marked for better code highlighting
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Make sure that the code blocks are styled
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

// Read all markdown files
function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('No _posts directory found, creating it...');
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.md'));

  const posts = files.map(filename => {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Extract date from filename (YYYY-MM-DD-title.md format)
    const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
    let date = new Date();
    let slug = filename.replace('.md', '');

    if (match) {
      const [, year, month, day, title] = match;
      date = new Date(year, month - 1, day);
      slug = title;
    }

    return {
      slug,
      date,
      title: data.title || slug,
      description: data.description || '',
      categories: data.categories || [],
      content: marked(content),
      ...data
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) => b.date - a.date);
}

// Generate individual post pages
function generatePostPage(post, template) {
  const html = template
    .replace(/\{\{TITLE\}\}/g, post.title)
    .replace(/\{\{DATE\}\}/g, post.date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))
    .replace('{{CONTENT}}', post.content)
    .replace('{{DESCRIPTION}}', post.description);

  const outputPath = path.join(OUTPUT_DIR, `${post.slug}.html`);
  fs.writeFileSync(outputPath, html);
  console.log(`Generated: ${post.slug}.html`);
}

// Generate blog index page
function generateIndexPage(posts) {
  const postsHTML = posts.map(post => `
    <a href="/blog/${post.slug}.html" class="group bg-warm-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all p-8 block">
      <div class="flex items-center gap-2 mb-4">
        <span class="bg-clay/10 text-clay px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
          ${post.categories[0] || 'Article'}
        </span>
        <span class="text-sm text-warm-grey">${post.date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
      </div>
      <div>
        <div class="text-sm text-warm-grey mb-2">${post.date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</div>
        <h3 class="font-serif text-xl lg:text-2xl font-semibold text-charcoal mb-3 group-hover:text-clay transition-colors">${post.title}</h3>
        <p class="text-warm-grey leading-relaxed">${post.description || 'Read more...'}</p>
      </div>
    </a>
  `).join('\n');

  const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Writing - Alex Kramer</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta name="description" content="Insights on healthcare technology, product leadership, and technical architecture">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/src/style.css">
</head>
<body class="font-sans bg-cream text-charcoal">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 bg-cream/95 backdrop-blur-md z-50 px-6 lg:px-12 py-6 border-b border-clay/15">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <a href="/" class="font-serif font-semibold text-xl text-clay hover:text-terracotta transition-colors">Alex C. Kramer</a>
            
            <!-- Desktop Navigation -->
            <ul class="hidden lg:flex gap-10">
                <li><a href="/#about" class="text-base hover:text-clay transition-colors">About</a></li>
                <li><a href="/#experience" class="text-base hover:text-clay transition-colors">Experience</a></li>
                <li><a href="/blog/" class="text-sm lg:text-base text-clay font-medium">Blog</a></li>
                <li><a href="/#contact" class="text-base hover:text-clay transition-colors">Contact</a></li>
            </ul>

            <!-- Mobile Menu Button -->
            <button 
                id="mobile-menu-button" 
                class="lg:hidden p-2 hover:bg-sand/50 rounded-lg transition-colors"
                aria-label="Toggle mobile menu"
            >
                <!-- Menu icon (hamburger) -->
                <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <!-- Close icon (X) -->
                <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div 
            id="mobile-menu" 
            class="lg:hidden hidden fixed inset-0 top-[73px] left-0 right-0 bg-cream z-40"
        >
            <ul class="flex flex-col py-6 bg-cream">
                <li><a href="/#about" class="mobile-menu-link block px-8 py-4 text-lg hover:bg-sand/50 hover:text-clay transition-colors">
                    About
                </a></li>
                <li><a href="/#experience" class="mobile-menu-link block px-8 py-4 text-lg hover:bg-sand/50 hover:text-clay transition-colors">
                    Experience
                </a></li>
                <li><a href="/blog/" class="mobile-menu-link block px-8 py-4 text-lg bg-clay/10 text-clay font-medium">
                    Blog
                </a></li>
                <li><a href="/#contact" class="mobile-menu-link block px-8 py-4 text-lg hover:bg-sand/50 hover:text-clay transition-colors">
                    Contact
                </a></li>
            </ul>
        </div>
    </nav>

    <!-- Blog Header -->
    <section class="mt-24 lg:mt-32 px-6 lg:px-12 py-16 bg-gradient-to-br from-warm-white to-cream">
        <div class="max-w-7xl mx-auto text-center">
            <div class="inline-block text-xs lg:text-sm uppercase tracking-widest text-clay font-medium mb-4">Writing & Insights</div>
            <h1 class="font-serif text-4xl lg:text-6xl font-semibold text-charcoal mb-6">Blog</h1>
            <p class="text-lg lg:text-xl text-warm-grey max-w-2xl mx-auto">Thoughts on healthcare technology, product leadership, compliance, and building great teams</p>
        </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="px-6 lg:px-12 py-16 lg:py-20">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${postsHTML}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="text-center px-6 py-12 text-warm-grey border-t border-sand">
        <div class="flex justify-center gap-8 mb-4 flex-wrap">
            <a href="https://github.com/alexkramer" target="_blank" class="hover:text-clay transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/alexckramer/" target="_blank" class="hover:text-clay transition-colors">LinkedIn</a>
            <a href="mailto:ackramer19@gmail.com" class="hover:text-clay transition-colors">Email</a>
        </div>
        <p class="text-sm">&copy; <span id="copyright-year"></span> Alex C. Kramer. Greater Boston Area.</p>
        <script>
          document.getElementById('copyright-year').textContent = new Date().getFullYear();
        </script>
    </footer>

    <script>
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const menuButton = document.getElementById('mobile-menu-button')
            const mobileMenu = document.getElementById('mobile-menu')
            const menuIcon = document.getElementById('menu-icon')
            const closeIcon = document.getElementById('close-icon')
            let isMenuOpen = false

            if (menuButton && mobileMenu) {
                menuButton.addEventListener('click', () => {
                    isMenuOpen = !isMenuOpen
                    
                    if (isMenuOpen) {
                        // Show menu
                        mobileMenu.classList.remove('hidden')
                        // Switch icons
                        menuIcon.classList.add('hidden')
                        closeIcon.classList.remove('hidden')
                    } else {
                        // Hide menu
                        mobileMenu.classList.add('hidden')
                        // Switch icons
                        menuIcon.classList.remove('hidden')
                        closeIcon.classList.add('hidden')
                    }
                })

                // Close menu when clicking a link
                const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link')
                mobileMenuLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        isMenuOpen = false
                        mobileMenu.classList.add('hidden')
                        menuIcon.classList.remove('hidden')
                        closeIcon.classList.add('hidden')
                    })
                })

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (isMenuOpen && !menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                        isMenuOpen = false
                        mobileMenu.classList.add('hidden')
                        menuIcon.classList.remove('hidden')
                        closeIcon.classList.add('hidden')
                    }
                })
            }
        })
    </script>
</body>
</html>`;

  const indexPath = path.join(OUTPUT_DIR, 'index.html');
  fs.writeFileSync(indexPath, indexHTML);
  console.log('Generated: blog/index.html');
}

// Main build function
function buildBlog() {
  console.log('Building blog...');

  // Ensure blog directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read template
  let template = '';
  if (fs.existsSync(TEMPLATE_PATH)) {
    template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  } else {
    console.log('Template not found, will be created...');
  }

  // Get all posts
  const posts = getAllPosts();
  console.log(`Found ${posts.length} blog posts`);

  // Generate individual post pages
  if (template) {
    posts.forEach(post => generatePostPage(post, template));
  }

  // Generate index page
  generateIndexPage(posts);

  // Generate homepage preview snippet
  generateHomepagePreview(posts);

  console.log('Blog build complete!');
}

// Generate homepage preview snippet
function generateHomepagePreview(posts) {
  const recentPosts = posts.slice(0, 3); // Get 3 most recent
  
  if (recentPosts.length === 0) {
    console.log('No posts to generate preview');
    return;
  }
  
  const previewHTML = recentPosts.map(post => `
                <!-- Blog Card -->
                <a href="/blog/${post.slug}.html" class="group bg-warm-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all p-8 block">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="bg-clay/10 text-clay px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                            ${post.categories[0] || 'Article'}
                        </span>
                        <span class="text-sm text-warm-grey">${post.date.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                    </div>
                    <div>
                        <div class="text-sm text-warm-grey mb-2">${post.date.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</div>
                        <h3 class="font-serif text-xl lg:text-2xl font-semibold text-charcoal mb-3 group-hover:text-clay transition-colors">${post.title}</h3>
                        <p class="text-warm-grey leading-relaxed">${post.description || 'Read more...'}</p>
                    </div>
                </a>
  `).join('\n');
  
  const previewPath = path.join(__dirname, '../blog-preview.html');
  fs.writeFileSync(previewPath, previewHTML);
  console.log('Generated: blog-preview.html (for homepage)');
}

buildBlog();
