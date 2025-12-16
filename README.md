# Alex Kramer - Personal Website

A modern, performant personal website built with Vite and Tailwind CSS, featuring automatic deployment to GitHub Pages.

## Features

- **Modern Build Pipeline**: Vite for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS with automatic purging for minimal file sizes
- **Automatic Deployment**: GitHub Actions workflow for CI/CD
- **Responsive Design**: Mobile-first approach with beautiful typography
- **Performance Optimized**: Minimal CSS output, optimized assets
- **SEO Friendly**: Semantic HTML and proper meta tags

## Tech Stack

- **Build Tool**: Vite 7.x
- **CSS Framework**: Tailwind CSS 3.x
- **Fonts**: Google Fonts (Crimson Pro, DM Sans)
- **Deployment**: GitHub Pages via GitHub Actions
- **CI/CD**: GitHub Actions

## Local Development

### Prerequisites

- Node.js 20+ and npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/alexkramer/alexkramer.github.io.git
cd alexkramer.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to **Pages** (under "Code and automation")
3. Under "Build and deployment":
   - Source: **GitHub Actions**
   - The workflow will handle the rest automatically

### Manual Deployment

To deploy manually:

```bash
npm run build
# The dist/ folder contains your built site
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── blog/
│   ├── _posts/             # Blog posts in markdown
│   ├── index.html          # Generated blog listing (after build)
│   └── *.html              # Generated post pages (after build)
├── scripts/
│   └── build-blog.js       # Blog build script
├── src/
│   └── style.css           # Tailwind CSS imports
├── public/                 # Static assets (if any)
├── index.html             # Main HTML file
├── blog-template.html     # Template for blog posts
├── package.json           # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── README.md             # This file
├── BLOG_MIGRATION.md     # Guide for migrating blog posts
└── SETUP_GUIDE.md        # Setup instructions
```

## Blog System

The site includes a built-in blog system that processes markdown files into static HTML pages.

### Writing Blog Posts

Create markdown files in `blog/_posts/` following this naming convention:
```
YYYY-MM-DD-post-slug.md
```

Example: `2024-03-15-hipaa-compliance.md`

### Post Format

Each post needs front matter:

```markdown
---
title: "Your Post Title"
description: "Brief description for previews and SEO"
categories: ["Category1", "Category2"]
date: 2024-03-15
---

Your post content in markdown...
```

### Building the Blog

The blog is automatically built as part of the main build:

```bash
npm run build
```

This:
1. Processes all markdown files in `blog/_posts/`
2. Generates individual HTML pages for each post
3. Creates a blog index/listing page
4. Builds everything with Vite

### Blog Features

- Markdown to HTML conversion
- Automatic blog listing page
- Responsive design matching site theme
- Code syntax highlighting
- SEO-friendly meta tags
- Category support

For detailed migration instructions, see `BLOG_MIGRATION.md`.

## Customization

### Colors

Edit the color palette in `tailwind.config.js`:

```javascript
colors: {
  cream: '#faf8f3',
  clay: '#c77255',
  // ... etc
}
```

### Fonts

Fonts are loaded from Google Fonts in `index.html`. Update the link tag to change fonts.

### Content

All content is in `index.html`. Update sections as needed:
- Hero section
- Value propositions
- Experience timeline
- Skills/expertise
- Blog preview
- Contact information

## Performance

The build process:
- Purges unused CSS (typically reduces CSS to ~10-20KB)
- Minifies HTML, CSS, and JS
- Optimizes assets
- Generates production-ready code

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Alex C. Kramer. All rights reserved.

## Contact

- Email: ackramer19@gmail.com
- LinkedIn: [linkedin.com/in/alexckramer](https://linkedin.com/in/alexckramer/)
- GitHub: [github.com/alexkramer](https://github.com/alexkramer)
