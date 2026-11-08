# CS/Map: Computer Science, Mapped

A 3D, explorable universe of the **12 major fields of Computer Science**, built for beginners and engineers alike. Data Structures & Algorithms is presented as one core pillar alongside Hardware Architecture, Operating Systems, Distributed Systems, Machine Learning, and Cybersecurity.

Each domain forms an organic 3D cluster that branches into:

- **Core concepts**: Key models and principles
- **Why it matters**: Real-world engineering impact and why it exists
- **Techniques & patterns**: Fundamental design patterns and paradigms
- **Milestone systems**: Landmark systems that shaped computing (e.g. Linux, Git, Postgres, Raft, LLVM)
- **Beginner pitfalls**: Common misconceptions and traps to avoid

Every topic includes an illustrative SVG diagram, an actionable code example, and links to interconnected domains.

## Features

- **Interactive Category Filtering**: Filter the entire 3D constellation by domain (**Foundations**, **Systems & Hardware**, **Data & Scale**, **Software & Web**, **AI & Security**) or view everything at once.
- **Clean Sans-Serif Typography**: Modern, readable typography designed for clarity.
- **3D Navigation**: Drag to rotate, scroll to fly, click a cluster (or any dot) to open its details.
- **Search with Autocomplete**: Press `/` to search topics, systems, algorithms, and concepts across all nodes.
- **Learning Path & Guided Tour**: Follow the curated learning path in order, play an automated film-like tour, or loop through a single topic continuously (`🔁`).
- **Progress Tracking**: "Mark as understood" progress saved locally in your browser.
- **List View**: A clean grid view for reading through the entire curriculum.
- **Dark Mode (`D`)**: Toggle dark mode with subtle glowing constellations.
- **Keyboard Shortcuts**: `/` search · `Space` play/pause tour · `L` toggle loop mode · `← →` previous/next topic · `Esc` close/stop · `D` dark mode · `F` fullscreen

## Run It

`index.html` is completely self-contained (Three.js and diagrams are bundled in), so you can open it directly in any browser or host it via GitHub Pages.

Live site: [https://and.github.io/cs/](https://and.github.io/cs/)

## Development

```sh
npm install
npm run build
```

## Structure

- `src/data.js`: The 12 CS topics, domains, branches, and code examples
- `src/viz.js`: Custom SVG diagrams for each field of computing
- `src/app.js`: 3D WebGL scene, category filtering, camera choreography, and tour engine
- `src/shell.html`: UI styling, layouts, and controls

## Credit

The visual concept and interaction model are inspired by [gtmbrain.si](https://gtmbrain.si/) by Pancake.
