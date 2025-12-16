import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEX_PATH = path.join(__dirname, '../index.html');
const PREVIEW_PATH = path.join(__dirname, '../blog-preview.html');

// Read the files
const indexHTML = fs.readFileSync(INDEX_PATH, 'utf-8');
const previewHTML = fs.readFileSync(PREVIEW_PATH, 'utf-8');

// Replace the hardcoded blog posts with dynamic ones
// Look for the comment markers in index.html
const START_MARKER = '<!-- BLOG_POSTS_START -->';
const END_MARKER = '<!-- BLOG_POSTS_END -->';

const startIndex = indexHTML.indexOf(START_MARKER);
const endIndex = indexHTML.indexOf(END_MARKER);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find blog post markers in index.html');
  console.error('Add these comments around the blog posts section:');
  console.error('<!-- BLOG_POSTS_START -->');
  console.error('<!-- BLOG_POSTS_END -->');
  process.exit(1);
}

// Build the new HTML
const before = indexHTML.substring(0, startIndex + START_MARKER.length);
const after = indexHTML.substring(endIndex);
const newHTML = before + '\n' + previewHTML + '\n                ' + after;

// Write back
fs.writeFileSync(INDEX_PATH, newHTML);
console.log('✓ Updated index.html with latest blog posts');
