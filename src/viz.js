// Visual diagrams for each major Computer Science field rendered in the sidebar.
// Fully responsive, theme-adaptive pure SVG with clean sans-serif typography.

const defs = `
<defs>
  <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
    <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill="currentColor" opacity="0.75" />
  </marker>
  <marker id="arr-c" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
    <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill="var(--c, #3B6FE0)" />
  </marker>
  <marker id="arr-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
    <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill="var(--mute, #8d8fa6)" />
  </marker>
</defs>`;

export function renderViz(id) {
  switch (id) {
    case 'dsa':
      return `<svg viewBox="0 0 340 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <text x="170" y="14" text-anchor="middle" font-size="9" fill="var(--mute)" font-weight="600" letter-spacing="0.08em">EFFICIENCY · STRUCTURES · ALGORITHMS</text>
        <g transform="translate(18, 26)">
          <!-- Array box -->
          <rect x="0" y="6" width="68" height="24" rx="4" stroke="var(--c, #3B6FE0)" stroke-width="1.5" fill="var(--c, #3B6FE0)" fill-opacity="0.12" />
          <text x="34" y="21" text-anchor="middle" font-size="10" font-weight="600" fill="var(--c, #3B6FE0)">Array [0..n]</text>

          <!-- Tree mini -->
          <g transform="translate(90, 4)">
            <circle cx="28" cy="6" r="6" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <line x1="24" y1="10" x2="14" y2="20" stroke="var(--line)" stroke-width="1" />
            <line x1="32" y1="10" x2="42" y2="20" stroke="var(--line)" stroke-width="1" />
            <circle cx="12" cy="22" r="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <circle cx="44" cy="22" r="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <text x="28" y="38" text-anchor="middle" font-size="8.5" fill="var(--mute)">Trees</text>
          </g>

          <!-- Graph mini -->
          <g transform="translate(160, 4)">
            <circle cx="10" cy="14" r="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <circle cx="36" cy="6" r="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <circle cx="42" cy="26" r="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <line x1="15" y1="12" x2="31" y2="8" stroke="var(--line)" stroke-width="1" />
            <line x1="36" y1="11" x2="40" y2="21" stroke="var(--line)" stroke-width="1" />
            <line x1="14" y1="17" x2="37" y2="24" stroke="var(--line)" stroke-width="1" />
            <text x="26" y="38" text-anchor="middle" font-size="8.5" fill="var(--mute)">Graphs</text>
          </g>

          <!-- Big-O Curves -->
          <g transform="translate(230, 2)">
            <line x1="6" y1="36" x2="70" y2="36" stroke="var(--line)" stroke-width="1" />
            <line x1="6" y1="4" x2="6" y2="36" stroke="var(--line)" stroke-width="1" />
            <!-- O(1) -->
            <line x1="6" y1="30" x2="68" y2="30" stroke="#10b981" stroke-width="1.4" />
            <!-- O(log n) -->
            <path d="M6,30 Q30,22 68,16" stroke="#06b6d4" stroke-width="1.4" fill="none" />
            <!-- O(n) -->
            <line x1="6" y1="30" x2="68" y2="6" stroke="#f59e0b" stroke-width="1.4" />
            <!-- O(n^2) -->
            <path d="M6,30 Q30,28 42,4" stroke="#ef4444" stroke-width="1.4" fill="none" />
            <text x="38" y="46" text-anchor="middle" font-size="8" fill="var(--mute)">Big-O Growth</text>
          </g>
        </g>
        <text x="170" y="98" text-anchor="middle" font-size="9" fill="var(--mute)">O(1) Hash Maps · O(log n) Binary Search · O(n log n) Sorts</text>
      </svg>`;

    case 'architecture':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- CPU chip -->
        <rect x="20" y="16" width="130" height="78" rx="8" stroke="var(--c, #0D9488)" stroke-width="1.8" fill="var(--c, #0D9488)" fill-opacity="0.08" />
        <text x="85" y="32" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--c, #0D9488)">CPU CORE</text>

        <!-- Sub components inside CPU -->
        <rect x="30" y="40" width="50" height="22" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="55" y="54" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">ALU</text>

        <rect x="88" y="40" width="52" height="22" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="114" y="54" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Registers</text>

        <rect x="30" y="66" width="110" height="18" rx="3" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="85" y="79" text-anchor="middle" font-size="8" fill="var(--mute)">L1 / L2 Cache (0.5 - 4ns)</text>

        <!-- Bus arrow -->
        <path d="M150,55 L180,55 M172,50 L182,55 L172,60" stroke="currentColor" stroke-width="1.5" />
        <path d="M180,63 L150,63 M158,58 L148,63 L158,68" stroke="currentColor" stroke-width="1.5" />
        <text x="165" y="44" text-anchor="middle" font-size="8" fill="var(--mute)">Memory Bus</text>

        <!-- RAM & Storage -->
        <rect x="185" y="24" width="62" height="64" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="216" y="44" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">RAM</text>
        <text x="216" y="58" text-anchor="middle" font-size="8" fill="var(--mute)">~80ns</text>
        <text x="216" y="72" text-anchor="middle" font-size="7.5" fill="var(--mute)">DDR5</text>

        <rect x="255" y="24" width="65" height="64" rx="6" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="287" y="44" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">SSD</text>
        <text x="287" y="58" text-anchor="middle" font-size="8" fill="var(--mute)">~50,000ns</text>
        <text x="287" y="72" text-anchor="middle" font-size="7.5" fill="var(--mute)">NVMe</text>

        <text x="170" y="106" text-anchor="middle" font-size="8.5" fill="var(--mute)">L1 Cache (fastest) ⇄ RAM ⇄ SSD Storage (persistent)</text>
      </svg>`;

    case 'os':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- User Space -->
        <rect x="20" y="14" width="300" height="34" rx="6" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="32" y="26" font-size="8.5" font-weight="700" fill="var(--mute)">USER SPACE</text>
        <rect x="110" y="20" width="56" height="20" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.05" />
        <text x="138" y="33" text-anchor="middle" font-size="8.5" fill="currentColor">Process A</text>
        <rect x="175" y="20" width="56" height="20" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.05" />
        <text x="203" y="33" text-anchor="middle" font-size="8.5" fill="currentColor">Process B</text>
        <rect x="240" y="20" width="56" height="20" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.05" />
        <text x="268" y="33" text-anchor="middle" font-size="8.5" fill="currentColor">Process C</text>

        <!-- System Call Boundary -->
        <line x1="20" y1="56" x2="320" y2="56" stroke="var(--c, #0D9488)" stroke-width="1.6" stroke-dasharray="4 3" />
        <text x="170" y="54" text-anchor="middle" font-size="8" font-weight="700" fill="var(--c, #0D9488)">SYSTEM CALLS (syscall)</text>

        <!-- Kernel Space -->
        <rect x="20" y="62" width="300" height="42" rx="6" stroke="var(--c, #0D9488)" stroke-width="1.6" fill="var(--c, #0D9488)" fill-opacity="0.08" />
        <text x="32" y="76" font-size="8.5" font-weight="700" fill="var(--c, #0D9488)">KERNEL</text>

        <rect x="90" y="68" width="65" height="26" rx="4" stroke="var(--c, #0D9488)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
        <text x="122" y="84" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Scheduler</text>

        <rect x="162" y="68" width="75" height="26" rx="4" stroke="var(--c, #0D9488)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
        <text x="199" y="84" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Virtual Mem</text>

        <rect x="244" y="68" width="66" height="26" rx="4" stroke="var(--c, #0D9488)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
        <text x="277" y="84" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">File System</text>
      </svg>`;

    case 'networking':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Client -->
        <rect x="18" y="32" width="60" height="42" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="48" y="52" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">Client</text>
        <text x="48" y="64" text-anchor="middle" font-size="8" fill="var(--mute)">Browser</text>

        <!-- Packet line -->
        <line x1="78" y1="46" x2="128" y2="46" stroke="var(--c, #0D9488)" stroke-width="1.6" marker-end="url(#arr-c)" />
        <rect x="88" y="34" width="30" height="15" rx="3" fill="var(--c, #0D9488)" fill-opacity="0.15" />
        <text x="103" y="45" text-anchor="middle" font-size="7.5" font-weight="700" fill="var(--c, #0D9488)">TCP</text>

        <!-- Cloud / Routers -->
        <circle cx="150" cy="53" r="16" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="150" y="56" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Router</text>
        <circle cx="190" cy="53" r="16" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="190" y="56" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">DNS</text>
        <line x1="166" y1="53" x2="174" y2="53" stroke="var(--line)" stroke-width="1.2" />

        <!-- Response packet line -->
        <line x1="206" y1="53" x2="252" y2="53" stroke="var(--c, #0D9488)" stroke-width="1.6" marker-end="url(#arr-c)" />

        <!-- Server -->
        <rect x="254" y="32" width="68" height="42" rx="6" stroke="var(--c, #0D9488)" stroke-width="1.8" fill="var(--c, #0D9488)" fill-opacity="0.1" />
        <text x="288" y="52" text-anchor="middle" font-size="10" font-weight="700" fill="var(--c, #0D9488)">Server</text>
        <text x="288" y="64" text-anchor="middle" font-size="8" fill="var(--c, #0D9488)">HTTPS :443</text>

        <text x="170" y="94" text-anchor="middle" font-size="8.5" fill="var(--mute)">TCP 3-Way Handshake · IP Packets · TLS Encrypted Stream</text>
      </svg>`;

    case 'databases':
      return `<svg viewBox="0 0 340 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Relational Table on Left -->
        <g transform="translate(18, 16)">
          <rect x="0" y="0" width="130" height="74" rx="6" stroke="var(--line)" stroke-width="1.4" fill="currentColor" fill-opacity="0.03" />
          <rect x="0" y="0" width="130" height="20" rx="6" fill="var(--c, #8A4FD8)" fill-opacity="0.15" />
          <text x="65" y="14" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #8A4FD8)">SQL Table (Users)</text>
          <line x1="0" y1="20" x2="130" y2="20" stroke="var(--line)" stroke-width="1" />
          <line x1="0" y1="38" x2="130" y2="38" stroke="var(--line)" stroke-width="0.8" />
          <line x1="0" y1="56" x2="130" y2="56" stroke="var(--line)" stroke-width="0.8" />
          <line x1="34" y1="20" x2="34" y2="74" stroke="var(--line)" stroke-width="0.8" />

          <text x="17" y="32" text-anchor="middle" font-size="8.5" fill="var(--mute)">id</text>
          <text x="68" y="32" font-size="8.5" fill="var(--mute)">email</text>
          <text x="17" y="50" text-anchor="middle" font-size="8.5" fill="currentColor">1</text>
          <text x="42" y="50" font-size="8.5" fill="currentColor">ada@cs.org</text>
          <text x="17" y="68" text-anchor="middle" font-size="8.5" fill="currentColor">2</text>
          <text x="42" y="68" font-size="8.5" fill="currentColor">alan@cs.org</text>
        </g>

        <!-- Arrow to Index -->
        <path d="M152,48 L178,48" stroke="var(--c, #8A4FD8)" stroke-width="1.6" marker-end="url(#arr-c)" />

        <!-- B-Tree Index on Right -->
        <g transform="translate(186, 16)">
          <rect x="34" y="0" width="60" height="22" rx="4" stroke="var(--c, #8A4FD8)" stroke-width="1.5" fill="var(--c, #8A4FD8)" fill-opacity="0.12" />
          <text x="64" y="14" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--c, #8A4FD8)">B-Tree Index</text>

          <line x1="50" y1="22" x2="25" y2="38" stroke="var(--line)" stroke-width="1.2" />
          <line x1="78" y1="22" x2="100" y2="38" stroke="var(--line)" stroke-width="1.2" />

          <rect x="0" y="38" width="50" height="18" rx="3" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
          <text x="25" y="51" text-anchor="middle" font-size="8" fill="currentColor">Key: &lt; 50</text>

          <rect x="76" y="38" width="52" height="18" rx="3" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
          <text x="102" y="51" text-anchor="middle" font-size="8" fill="currentColor">Key: ≥ 50</text>

          <text x="64" y="74" text-anchor="middle" font-size="8" fill="var(--mute)">O(log n) Disk Seek</text>
        </g>
        <text x="170" y="104" text-anchor="middle" font-size="8.5" fill="var(--mute)">ACID Guarantees · Write-Ahead Log (WAL) · Indexed Scans</text>
      </svg>`;

    case 'distributed-systems':
      return `<svg viewBox="0 0 340 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Users / Clients -->
        <rect x="14" y="38" width="48" height="30" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="38" y="56" text-anchor="middle" font-size="9" font-weight="600" fill="currentColor">Users</text>

        <line x1="62" y1="53" x2="88" y2="53" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr)" />

        <!-- Load Balancer -->
        <rect x="90" y="24" width="54" height="60" rx="6" stroke="var(--c, #8A4FD8)" stroke-width="1.6" fill="var(--c, #8A4FD8)" fill-opacity="0.12" />
        <text x="117" y="52" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--c, #8A4FD8)">Load</text>
        <text x="117" y="64" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--c, #8A4FD8)">Balancer</text>

        <!-- Fan out arrows to microservices -->
        <line x1="144" y1="42" x2="175" y2="28" stroke="var(--line)" stroke-width="1.2" marker-end="url(#arr)" />
        <line x1="144" y1="53" x2="175" y2="53" stroke="var(--line)" stroke-width="1.2" marker-end="url(#arr)" />
        <line x1="144" y1="64" x2="175" y2="78" stroke="var(--line)" stroke-width="1.2" marker-end="url(#arr)" />

        <!-- Service instances -->
        <rect x="176" y="16" width="60" height="22" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
        <text x="206" y="30" text-anchor="middle" font-size="8" fill="currentColor">Service 1</text>

        <rect x="176" y="42" width="60" height="22" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
        <text x="206" y="56" text-anchor="middle" font-size="8" fill="currentColor">Service 2</text>

        <rect x="176" y="68" width="60" height="22" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
        <text x="206" y="82" text-anchor="middle" font-size="8" fill="currentColor">Service 3</text>

        <!-- Cache & DB -->
        <g transform="translate(252, 22)">
          <rect x="0" y="0" width="70" height="28" rx="4" stroke="var(--c, #8A4FD8)" stroke-width="1.2" fill="var(--c, #8A4FD8)" fill-opacity="0.08" />
          <text x="35" y="18" text-anchor="middle" font-size="8.5" font-weight="600" fill="var(--c, #8A4FD8)">Redis Cache</text>

          <rect x="0" y="34" width="70" height="30" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="35" y="52" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">DB Shards</text>
        </g>
        <text x="170" y="104" text-anchor="middle" font-size="8" fill="var(--mute)">CAP Theorem · High Availability · Horizontal Auto-scaling</text>
      </svg>`;

    case 'languages-compilers':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Source Code -->
        <rect x="14" y="30" width="62" height="42" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="45" y="48" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Source</text>
        <text x="45" y="60" text-anchor="middle" font-size="7.5" fill="var(--mute)">code.py / .rs</text>

        <line x1="76" y1="51" x2="98" y2="51" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr)" />

        <!-- Lexer & Parser -->
        <rect x="100" y="30" width="60" height="42" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="130" y="48" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Lexer &amp;</text>
        <text x="130" y="60" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Parser</text>

        <line x1="160" y1="51" x2="182" y2="51" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr)" />

        <!-- AST -->
        <rect x="184" y="24" width="58" height="54" rx="6" stroke="var(--c, #3B6FE0)" stroke-width="1.6" fill="var(--c, #3B6FE0)" fill-opacity="0.12" />
        <text x="213" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #3B6FE0)">AST</text>
        <text x="213" y="56" text-anchor="middle" font-size="7" fill="var(--c, #3B6FE0)">Syntax</text>
        <text x="213" y="68" text-anchor="middle" font-size="7" fill="var(--c, #3B6FE0)">Tree</text>

        <line x1="242" y1="51" x2="264" y2="51" stroke="var(--c, #3B6FE0)" stroke-width="1.4" marker-end="url(#arr-c)" />

        <!-- Machine Code -->
        <rect x="266" y="30" width="60" height="42" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="296" y="48" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Binary</text>
        <text x="296" y="60" text-anchor="middle" font-size="7.5" fill="var(--mute)">x86 / ARM</text>

        <text x="170" y="94" text-anchor="middle" font-size="8.5" fill="var(--mute)">Tokens → Syntax Tree → Type Checking → Machine Assembly</text>
      </svg>`;

    case 'software-engineering':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <g transform="translate(16, 26)">
          <!-- Pipeline steps -->
          <rect x="0" y="10" width="54" height="34" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="27" y="26" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Code</text>
          <text x="27" y="37" text-anchor="middle" font-size="7" fill="var(--mute)">Git PR</text>

          <line x1="54" y1="27" x2="68" y2="27" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)" />

          <rect x="70" y="10" width="54" height="34" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="97" y="26" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Build</text>
          <text x="97" y="37" text-anchor="middle" font-size="7" fill="var(--mute)">Compile</text>

          <line x1="124" y1="27" x2="138" y2="27" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)" />

          <rect x="140" y="10" width="56" height="34" rx="5" stroke="var(--c, #E0703B)" stroke-width="1.6" fill="var(--c, #E0703B)" fill-opacity="0.14" />
          <text x="168" y="26" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--c, #E0703B)">Test</text>
          <text x="168" y="37" text-anchor="middle" font-size="7" fill="var(--c, #E0703B)">Unit/CI</text>

          <line x1="196" y1="27" x2="210" y2="27" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)" />

          <rect x="212" y="10" width="56" height="34" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="240" y="26" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Package</text>
          <text x="240" y="37" text-anchor="middle" font-size="7" fill="var(--mute)">Docker</text>

          <line x1="268" y1="27" x2="282" y2="27" stroke="currentColor" stroke-width="1.2" marker-end="url(#arr)" />

          <rect x="284" y="10" width="52" height="34" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="310" y="26" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Deploy</text>
          <text x="310" y="37" text-anchor="middle" font-size="7" fill="var(--mute)">Prod</text>
        </g>
        <text x="170" y="86" text-anchor="middle" font-size="8.5" fill="var(--mute)">CI/CD Automation · Automated Testing · Zero-Downtime Releases</text>
      </svg>`;

    case 'web-cloud':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Browser -->
        <rect x="20" y="20" width="80" height="52" rx="6" stroke="var(--line)" stroke-width="1.4" fill="currentColor" fill-opacity="0.03" />
        <rect x="20" y="20" width="80" height="14" rx="6" fill="currentColor" fill-opacity="0.06" />
        <circle cx="28" cy="27" r="2" fill="#ef4444" />
        <circle cx="34" cy="27" r="2" fill="#f59e0b" />
        <circle cx="40" cy="27" r="2" fill="#10b981" />
        <text x="60" y="48" text-anchor="middle" font-size="9" font-weight="600" fill="currentColor">Web UI</text>
        <text x="60" y="60" text-anchor="middle" font-size="7.5" fill="var(--mute)">HTML · JS</text>

        <!-- API arrows -->
        <path d="M100,42 L142,42 M134,37 L144,42 L134,47" stroke="var(--c, #E0703B)" stroke-width="1.4" />
        <path d="M144,52 L102,52 M110,47 L100,52 L110,57" stroke="var(--c, #E0703B)" stroke-width="1.4" />
        <text x="122" y="34" text-anchor="middle" font-size="7.5" font-weight="600" fill="var(--c, #E0703B)">REST / JSON</text>

        <!-- Cloud Datacenter -->
        <g transform="translate(150, 16)">
          <rect x="0" y="0" width="168" height="60" rx="8" stroke="var(--c, #E0703B)" stroke-width="1.8" fill="var(--c, #E0703B)" fill-opacity="0.08" />
          <text x="84" y="16" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #E0703B)">CLOUD PLATFORM</text>

          <rect x="10" y="24" width="44" height="26" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
          <text x="32" y="40" text-anchor="middle" font-size="7.5" font-weight="600" fill="currentColor">Lambda</text>

          <rect x="62" y="24" width="44" height="26" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
          <text x="84" y="40" text-anchor="middle" font-size="7.5" font-weight="600" fill="currentColor">K8s Pods</text>

          <rect x="114" y="24" width="44" height="26" rx="4" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.04" />
          <text x="136" y="40" text-anchor="middle" font-size="7.5" font-weight="600" fill="currentColor">S3 Store</text>
        </g>
        <text x="170" y="94" text-anchor="middle" font-size="8.5" fill="var(--mute)">Edge CDN · Serverless Compute · Global Cloud Scale</text>
      </svg>`;

    case 'ai-ml':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Input Layer -->
        <circle cx="45" cy="28" r="8" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />
        <circle cx="45" cy="56" r="8" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />
        <circle cx="45" cy="84" r="8" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />
        <text x="45" y="104" text-anchor="middle" font-size="8" fill="var(--mute)">Inputs</text>

        <!-- Hidden Layer 1 -->
        <circle cx="120" cy="20" r="9" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />
        <circle cx="120" cy="44" r="9" stroke="var(--c, #D9447A)" stroke-width="1.6" fill="var(--c, #D9447A)" fill-opacity="0.15" />
        <circle cx="120" cy="68" r="9" stroke="var(--c, #D9447A)" stroke-width="1.6" fill="var(--c, #D9447A)" fill-opacity="0.15" />
        <circle cx="120" cy="92" r="9" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />

        <!-- Hidden Layer 2 -->
        <circle cx="195" cy="32" r="9" stroke="var(--c, #D9447A)" stroke-width="1.6" fill="var(--c, #D9447A)" fill-opacity="0.15" />
        <circle cx="195" cy="56" r="9" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />
        <circle cx="195" cy="80" r="9" stroke="var(--c, #D9447A)" stroke-width="1.6" fill="var(--c, #D9447A)" fill-opacity="0.15" />
        <text x="157" y="104" text-anchor="middle" font-size="8" fill="var(--mute)">Hidden Layers</text>

        <!-- Output Layer -->
        <circle cx="270" cy="42" r="9" stroke="var(--c, #D9447A)" stroke-width="2" fill="var(--c, #D9447A)" fill-opacity="0.25" />
        <circle cx="270" cy="70" r="9" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />
        <text x="270" y="104" text-anchor="middle" font-size="8" fill="var(--mute)">Outputs</text>

        <!-- Synapse connections -->
        ${[28, 56, 84].flatMap(y1 => [20, 44, 68, 92].map(y2 => `<line x1="53" y1="${y1}" x2="111" y2="${y2}" stroke="var(--line)" stroke-width="0.7" opacity="0.4" />`)).join('')}
        ${[20, 44, 68, 92].flatMap(y1 => [32, 56, 80].map(y2 => `<line x1="129" y1="${y1}" x2="186" y2="${y2}" stroke="var(--line)" stroke-width="0.7" opacity="0.4" />`)).join('')}
        ${[32, 56, 80].flatMap(y1 => [42, 70].map(y2 => `<line x1="204" y1="${y1}" x2="261" y2="${y2}" stroke="var(--c, #D9447A)" stroke-width="1" opacity="0.6" />`)).join('')}
      </svg>`;

    case 'cybersecurity':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Plaintext -->
        <rect x="18" y="32" width="60" height="38" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="48" y="48" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Plaintext</text>
        <text x="48" y="60" text-anchor="middle" font-size="7.5" fill="var(--mute)">"hello"</text>

        <line x1="78" y1="51" x2="112" y2="51" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr)" />

        <!-- Key / Encryption Lock -->
        <g transform="translate(114, 24)">
          <rect x="0" y="0" width="112" height="54" rx="8" stroke="var(--c, #D9447A)" stroke-width="1.8" fill="var(--c, #D9447A)" fill-opacity="0.12" />
          <path d="M46,18 L46,12 A10,10 0 0,1 66,12 L66,18" stroke="var(--c, #D9447A)" stroke-width="2" fill="none" />
          <rect x="42" y="18" width="28" height="22" rx="4" fill="var(--c, #D9447A)" />
          <circle cx="56" cy="27" r="2.5" fill="#fff" />
          <path d="M56,29.5 L56,34" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
          <text x="56" y="48" text-anchor="middle" font-size="7.5" font-weight="700" fill="var(--c, #D9447A)">AES-256 / RSA</text>
        </g>

        <line x1="226" y1="51" x2="260" y2="51" stroke="var(--c, #D9447A)" stroke-width="1.4" marker-end="url(#arr-c)" />

        <!-- Ciphertext -->
        <rect x="262" y="32" width="60" height="38" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="292" y="48" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">Cipher</text>
        <text x="292" y="60" text-anchor="middle" font-size="7.5" fill="var(--mute)">#a9$f7!x</text>

        <text x="170" y="94" text-anchor="middle" font-size="8.5" fill="var(--mute)">Confidentiality · Data Integrity · Public-Key Cryptography</text>
      </svg>`;

    case 'theory-computation':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Finite State Machine -->
        <g transform="translate(30, 20)">
          <!-- State S0 -->
          <circle cx="30" cy="30" r="18" stroke="var(--c, #3B6FE0)" stroke-width="1.8" fill="var(--c, #3B6FE0)" fill-opacity="0.12" />
          <text x="30" y="34" text-anchor="middle" font-size="10" font-weight="700" fill="var(--c, #3B6FE0)">q0</text>

          <!-- Transition arrow to S1 -->
          <path d="M48,24 Q75,10 102,24" stroke="currentColor" stroke-width="1.4" fill="none" marker-end="url(#arr)" />
          <text x="75" y="14" text-anchor="middle" font-size="8.5" font-weight="600" fill="currentColor">input '1'</text>

          <!-- Transition arrow back to S0 -->
          <path d="M102,36 Q75,50 48,36" stroke="var(--mute)" stroke-width="1.2" fill="none" marker-end="url(#arr-m)" />
          <text x="75" y="52" text-anchor="middle" font-size="8" fill="var(--mute)">input '0'</text>

          <!-- State S1 (Accepting) -->
          <circle cx="120" cy="30" r="18" stroke="var(--c, #3B6FE0)" stroke-width="1.8" fill="var(--c, #3B6FE0)" fill-opacity="0.12" />
          <circle cx="120" cy="30" r="14" stroke="var(--c, #3B6FE0)" stroke-width="1.2" fill="none" />
          <text x="120" y="34" text-anchor="middle" font-size="10" font-weight="700" fill="var(--c, #3B6FE0)">q1 (✓)</text>
        </g>

        <!-- Turing Tape on Right -->
        <g transform="translate(195, 24)">
          <rect x="0" y="20" width="120" height="26" stroke="var(--line)" stroke-width="1.4" fill="currentColor" fill-opacity="0.03" />
          <line x1="24" y1="20" x2="24" y2="46" stroke="var(--line)" stroke-width="1" />
          <line x1="48" y1="20" x2="48" y2="46" stroke="var(--line)" stroke-width="1" />
          <line x1="72" y1="20" x2="72" y2="46" stroke="var(--line)" stroke-width="1" />
          <line x1="96" y1="20" x2="96" y2="46" stroke="var(--line)" stroke-width="1" />

          <text x="12" y="37" text-anchor="middle" font-size="10" fill="currentColor">1</text>
          <text x="36" y="37" text-anchor="middle" font-size="10" fill="currentColor">0</text>
          <text x="60" y="37" text-anchor="middle" font-size="10" font-weight="700" fill="var(--c, #3B6FE0)">1</text>
          <text x="84" y="37" text-anchor="middle" font-size="10" fill="currentColor">1</text>
          <text x="108" y="37" text-anchor="middle" font-size="10" fill="var(--mute)">B</text>

          <!-- Tape Head -->
          <path d="M60,16 L54,6 L66,6 Z" fill="var(--c, #3B6FE0)" />
          <text x="60" y="4" text-anchor="middle" font-size="7.5" font-weight="700" fill="var(--c, #3B6FE0)">HEAD</text>
        </g>
        <text x="170" y="94" text-anchor="middle" font-size="8.5" fill="var(--mute)">Automata · Turing Machines · P vs NP · Computability Limits</text>
      </svg>`;

    default:
      return '';
  }
}
