# Study Plan - Learning Resources

A visually appealing markdown rendering system with sidebar navigation, perfect for organizing and viewing learning roadmaps and study materials.

## Features

- **Auto-discovery**: Automatically finds and lists all markdown files in the repository
- **Sidebar Navigation**: Clean, modern sidebar with file list for easy navigation
- **Beautiful Design**: Professional documentation-style interface inspired by GitBook and Read the Docs
- **Syntax Highlighting**: Code blocks are automatically highlighted with proper syntax coloring
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **GitHub Pages Ready**: Pure client-side rendering, works seamlessly with GitHub Pages

## Quick Start

### Adding New Markdown Files

1. Create your `.md` file anywhere in the repository (except in hidden directories like `.git`)
2. Run the build script:
   ```bash
   python3 build.py
   ```
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Add new study material"
   git push
   ```

The site will automatically update on GitHub Pages!

### Local Testing

To test the site locally, you need a local web server (browsers block file:// requests for security):

**Option 1: Python**
```bash
python3 -m http.server 8000
```

**Option 2: Node.js**
```bash
npx serve .
```

Then open http://localhost:8000 in your browser.

## File Structure

```
.
├── index.html              # Main HTML file
├── style.css               # Stylesheet
├── build.py                # Build script to scan for markdown files
├── manifest.json           # Auto-generated file list (do not edit manually)
├── README.md               # This file
└── *.md                    # Your markdown files
```

## How It Works

1. **Build Script**: `build.py` scans the repository for `.md` files and generates `manifest.json`
2. **Manifest**: `manifest.json` contains a list of all markdown files with their titles and paths
3. **Client-Side Rendering**: The HTML page loads the manifest, displays the navigation, and renders markdown using marked.js
4. **Syntax Highlighting**: Code blocks are highlighted using highlight.js

## Workflow

1. Add new markdown files to your repository
2. Run `python3 build.py` to update the manifest
3. Test locally (optional)
4. Commit and push to GitHub
5. Your site is automatically updated!

## GitHub Pages Deployment

This repository is configured for GitHub Pages with a custom domain (rednews.me).

The site is automatically deployed when you push to the `dev` branch.

## Customization

### Changing Colors

Edit `style.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #2563eb;      /* Main accent color */
    --bg-color: #f8fafc;           /* Background color */
    --text-primary: #1e293b;       /* Main text color */
    /* ... other variables ... */
}
```

### Changing Site Title

Edit `index.html` and update:

```html
<title>Your Title</title>
<h1>Your Title</h1>
```

## Technologies Used

- **marked.js**: Markdown parser
- **highlight.js**: Syntax highlighting for code blocks
- **Python**: Build script for auto-discovery
- **Vanilla JavaScript**: No frameworks, just clean JS
- **CSS3**: Modern, responsive design

## Tips

- Use descriptive first-level headings (`#`) in your markdown files - they become the navigation titles
- Code blocks are automatically highlighted - just use triple backticks with language
- The first markdown file alphabetically is loaded by default
- README.md is automatically excluded from the navigation

## License

Free to use and modify for your own study materials!

---

Built with Claude Code
