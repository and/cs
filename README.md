# DS/Map: data structures, mapped

A 3D map of 19 data structures for coding-interview prep. Each structure is a cluster that branches into:

- **Operations & cost**: time complexity of each operation
- **Use it when**: situations where it's the right choice
- **Patterns**: the techniques interviewers test
- **Practice problems**: linked to a LeetCode search
- **Pitfalls**: common mistakes

Every structure also has a short Python snippet and links to related structures.

## Features

- Drag to rotate, scroll to fly, click a cluster (or any dot) to open its details
- Search with autocomplete across every node (press `/`); nicknames like "dict" or "priority queue" work too
- A learning path in a suggested order, with Prev/Next or the ← → keys
- "Mark as understood" progress, saved in your browser
- Each structure has its own link, for example `index.html#heap`
- List view for reading rather than exploring in 3D
- **Play tour**: a slow, film-like walk through all 19 structures with captions and section highlights. Use pause, prev/next, speed (0.5×–2×), and toggles to hide the side panel (`P`) or captions (`C`)
- **Dark mode** (`D`) with glowing nodes and a starfield, plus fullscreen (`F`). During the tour, controls and the cursor fade out after 3 seconds, so it works well on a TV

Keyboard: `/` search · `Space` play/pause · `← →` previous/next · `Esc` stop or close · `D` dark mode · `F` fullscreen

## Run it

`index.html` is self-contained (three.js is bundled in), so open it in a browser or serve it with GitHub Pages.

## Edit it

- Content lives in `src/data.js`
- Scene and UI logic is in `src/app.js`
- Page markup and styles are in `src/shell.html`

Rebuild `index.html` after changes:

```sh
npm install
npm run build
```

## How it's built

Plain three.js with no framework: one `InstancedMesh` for every node, one `LineSegments` for every edge, fog for depth, and HTML labels positioned each frame with overlap culling. Clicking uses screen-space distance instead of raycasting, and the camera picks the clearest viewing angle when it flies to a structure.

## Credit

The visual idea and interaction model are inspired by [gtmbrain.si](https://gtmbrain.si/) by Pancake.
