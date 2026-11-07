// Bundles src/app.js (with three.js) and inlines it into src/shell.html → index.html.
// The result is one self-contained file with no CDN dependencies.
import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';

const result = await build({
  entryPoints: ['src/app.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2019',
  write: false,
});
const js = result.outputFiles[0].text.replaceAll('</script', '<\\/script');
const shell = await readFile('src/shell.html', 'utf8');
if (!shell.includes('<!--APP-->')) throw new Error('src/shell.html is missing the <!--APP--> marker');
const html = shell.replace('<!--APP-->', () => `<div id="errbar"></div>\n<script>${js}</script>`);
await writeFile('index.html', html);
console.log(`index.html written (${(html.length / 1024).toFixed(0)} KB)`);
