````markdown
# CV Builder

A frontend-only web app to create, edit and export professional CVs in Markdown. Users can choose from multiple templates (Classic, Minimal, Creative) in English or Spanish, edit the content live in a Markdown editor, preview side-by-side, and download a PDF with configurable margins and custom styling.

## Features

- **Template selection**: Choose between Classic, Minimal and Creative layouts, in English or Spanish.
- **Live Markdown editing**: Edit your CV text directly in a WYSIWYG-style Markdown editor.
- **Side-by-side preview**: See rendered output in real time.
- **Content review**: Highlights generic phrases, missing metrics, and suggests stronger action verbs.
- **Local persistence**: Autosaves your edited Markdown to `localStorage` per template.
- **PDF export**: One-click download with half-inch margins, high-resolution rendering, and custom fonts.

## Demo

[Live Demo on Vercel](https://your-deployment-url.vercel.app)

## Getting Started

### Prerequisites

- Node.js v14+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/cv-builder.git
   cd cv-builder
````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run in development**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized static files will be in the `dist/` folder. You can serve them with any static host.

## Deployment

### Vercel

1. Push your code to GitHub.
2. Import your repo on [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite; click “Deploy”.

### Netlify

1. Connect your GitHub repo on [app.netlify.com](https://app.netlify.com).
2. Set **Build command** to `npm run build` and **Publish directory** to `dist`.
3. Click “Deploy site”.

### GitHub Pages

1. Install `gh-pages`:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:

   ```json
   "scripts": {
     "build": "vite build",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Run:

   ```bash
   npm run deploy
   ```

4. In GitHub Settings → Pages, select the `gh-pages` branch as source.

## Configuration

* **Templates** live under `public/templates/`. Add or edit `.md` files there.
* **CSS** in `src/App.css` — customize fonts, colors or layout.
* **Content review rules** in `src/hooks/useContentReview.js`.

## Contributing

1. Fork the repo.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes and push: `git push origin feature/your-feature`.
4. Open a Pull Request.

## License

MIT © \[Cristian](lhttps://github.com/ctj01)

```
```
