// Visual diagrams for each data structure rendered in the sidebar.
// Fully responsive, theme-adaptive pure SVG.

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
    case 'array':
      return `<svg viewBox="0 0 340 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <text x="170" y="16" text-anchor="middle" font-size="10" fill="var(--mute)" letter-spacing="0.08em">CONTIGUOUS MEMORY · O(1) INDEX ACCESS</text>
        <!-- cells -->
        <g transform="translate(20, 26)">
          <!-- cell 0 -->
          <rect x="0" y="0" width="56" height="38" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <text x="28" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">10</text>
          <text x="28" y="52" text-anchor="middle" font-size="10.5" fill="var(--mute)">[0]</text>
          <!-- cell 1 -->
          <rect x="60" y="0" width="56" height="38" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <text x="88" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">25</text>
          <text x="88" y="52" text-anchor="middle" font-size="10.5" fill="var(--mute)">[1]</text>
          <!-- cell 2 (highlighted) -->
          <rect x="120" y="0" width="56" height="38" rx="6" stroke="var(--c, #3B6FE0)" stroke-width="2" fill="var(--c, #3B6FE0)" fill-opacity="0.12" />
          <text x="148" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="var(--c, #3B6FE0)">42</text>
          <text x="148" y="52" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--c, #3B6FE0)">[2]</text>
          <!-- cell 3 -->
          <rect x="180" y="0" width="56" height="38" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <text x="208" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">8</text>
          <text x="208" y="52" text-anchor="middle" font-size="10.5" fill="var(--mute)">[3]</text>
          <!-- cell 4 -->
          <rect x="240" y="0" width="56" height="38" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <text x="268" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">99</text>
          <text x="268" y="52" text-anchor="middle" font-size="10.5" fill="var(--mute)">[4]</text>
        </g>
      </svg>`;

    case 'string':
      return `<svg viewBox="0 0 340 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <text x="170" y="16" text-anchor="middle" font-size="10" fill="var(--mute)" letter-spacing="0.08em">IMMUTABLE CHAR SEQUENCE</text>
        <g transform="translate(30, 26)">
          <rect x="0" y="0" width="52" height="38" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <text x="26" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">'H'</text>
          <text x="26" y="52" text-anchor="middle" font-size="10.5" fill="var(--mute)">[0]</text>

          <rect x="56" y="0" width="52" height="38" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <text x="82" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">'E'</text>
          <text x="82" y="52" text-anchor="middle" font-size="10.5" fill="var(--mute)">[1]</text>

          <rect x="112" y="0" width="52" height="38" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <text x="138" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">'L'</text>
          <text x="138" y="52" text-anchor="middle" font-size="10.5" fill="var(--mute)">[2]</text>

          <rect x="168" y="0" width="52" height="38" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <text x="194" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">'L'</text>
          <text x="194" y="52" text-anchor="middle" font-size="10.5" fill="var(--mute)">[3]</text>

          <rect x="224" y="0" width="52" height="38" rx="6" stroke="var(--c, #3B6FE0)" stroke-width="1.8" fill="var(--c, #3B6FE0)" fill-opacity="0.1" />
          <text x="250" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="var(--c, #3B6FE0)">'O'</text>
          <text x="250" y="52" text-anchor="middle" font-size="10.5" fill="var(--c, #3B6FE0)">[4]</text>
        </g>
      </svg>`;

    case 'hash-map':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Key -->
        <rect x="14" y="36" width="62" height="32" rx="6" stroke="var(--c, #E0703B)" stroke-width="1.5" fill="var(--c, #E0703B)" fill-opacity="0.1" />
        <text x="45" y="56" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--c, #E0703B)">"cat"</text>
        <!-- Arrow into hash -->
        <line x1="77" y1="52" x2="105" y2="52" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)" />
        <!-- Hash function -->
        <rect x="108" y="32" width="60" height="40" rx="8" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="138" y="50" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">hash()</text>
        <text x="138" y="63" text-anchor="middle" font-size="8.5" fill="var(--mute)">% size</text>
        <!-- Arrow into bucket -->
        <line x1="169" y1="52" x2="202" y2="52" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)" />
        <!-- Bucket array -->
        <g transform="translate(205, 12)">
          <rect x="0" y="0" width="28" height="20" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
          <text x="14" y="14" text-anchor="middle" font-size="9" fill="var(--mute)">0</text>
          <rect x="0" y="20" width="28" height="20" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
          <text x="14" y="34" text-anchor="middle" font-size="9" fill="var(--mute)">1</text>
          <rect x="0" y="40" width="28" height="20" stroke="var(--c, #E0703B)" stroke-width="1.8" fill="var(--c, #E0703B)" fill-opacity="0.15" />
          <text x="14" y="54" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #E0703B)">2</text>
          <rect x="0" y="60" width="28" height="20" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
          <text x="14" y="74" text-anchor="middle" font-size="9" fill="var(--mute)">3</text>
        </g>
        <!-- Linked entry -->
        <line x1="234" y1="62" x2="252" y2="62" stroke="var(--c, #E0703B)" stroke-width="1.5" marker-end="url(#arr-c)" />
        <rect x="254" y="46" width="76" height="32" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="292" y="66" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">"cat" : 4</text>
      </svg>`;

    case 'hash-set':
      return `<svg viewBox="0 0 340 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <text x="170" y="16" text-anchor="middle" font-size="10" fill="var(--mute)" letter-spacing="0.08em">DISTINCT KEYS · O(1) LOOKUP & INSERT</text>
        <!-- Set container -->
        <rect x="40" y="26" width="260" height="58" rx="29" stroke="var(--c, #E0703B)" stroke-width="1.8" fill="var(--c, #E0703B)" fill-opacity="0.06" stroke-dasharray="4 3" />
        <g transform="translate(62, 38)">
          <rect x="0" y="0" width="56" height="32" rx="16" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />
          <text x="28" y="20" text-anchor="middle" font-size="11.5" font-weight="600" fill="currentColor">"apple"</text>
        </g>
        <g transform="translate(130, 38)">
          <rect x="0" y="0" width="60" height="32" rx="16" stroke="var(--c, #E0703B)" stroke-width="1.5" fill="var(--c, #E0703B)" fill-opacity="0.15" />
          <text x="30" y="20" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--c, #E0703B)">"banana"</text>
        </g>
        <g transform="translate(202, 38)">
          <rect x="0" y="0" width="54" height="32" rx="16" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.05" />
          <text x="27" y="20" text-anchor="middle" font-size="11.5" font-weight="600" fill="currentColor">"pear"</text>
        </g>
      </svg>`;

    case 'linked-list':
      return `<svg viewBox="0 0 340 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Head tag -->
        <text x="26" y="22" font-size="10" font-weight="700" fill="var(--c, #3B6FE0)">head</text>
        <line x1="38" y1="26" x2="38" y2="44" stroke="var(--c, #3B6FE0)" stroke-width="1.5" marker-end="url(#arr-c)" />
        <g transform="translate(18, 46)">
          <!-- Node 1 -->
          <rect x="0" y="0" width="70" height="36" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <line x1="44" y1="0" x2="44" y2="36" stroke="var(--line)" stroke-width="1.2" />
          <text x="22" y="23" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">12</text>
          <circle cx="57" cy="18" r="3.5" fill="var(--c, #3B6FE0)" />
          <line x1="57" y1="18" x2="98" y2="18" stroke="var(--c, #3B6FE0)" stroke-width="1.6" marker-end="url(#arr-c)" />

          <!-- Node 2 -->
          <rect x="100" y="0" width="70" height="36" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <line x1="144" y1="0" x2="144" y2="36" stroke="var(--line)" stroke-width="1.2" />
          <text x="122" y="23" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">99</text>
          <circle cx="157" cy="18" r="3.5" fill="var(--c, #3B6FE0)" />
          <line x1="157" y1="18" x2="198" y2="18" stroke="var(--c, #3B6FE0)" stroke-width="1.6" marker-end="url(#arr-c)" />

          <!-- Node 3 -->
          <rect x="200" y="0" width="70" height="36" rx="6" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
          <line x1="244" y1="0" x2="244" y2="36" stroke="var(--line)" stroke-width="1.2" />
          <text x="222" y="23" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">37</text>
          <text x="257" y="23" text-anchor="middle" font-size="11" fill="var(--mute)">∅</text>
        </g>
      </svg>`;

    case 'stack':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Bucket container open at top -->
        <path d="M110,20 L110,102 L230,102 L230,20" stroke="var(--line)" stroke-width="2" stroke-linecap="round" />
        <!-- Stack items -->
        <rect x="116" y="74" width="108" height="24" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="170" y="90" text-anchor="middle" font-size="11.5" fill="var(--mute)">10</text>

        <rect x="116" y="46" width="108" height="24" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="170" y="62" text-anchor="middle" font-size="11.5" fill="var(--mute)">20</text>

        <rect x="116" y="18" width="108" height="24" rx="4" stroke="var(--c, #3B6FE0)" stroke-width="1.8" fill="var(--c, #3B6FE0)" fill-opacity="0.14" />
        <text x="170" y="34" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--c, #3B6FE0)">30 (top)</text>

        <!-- Push / Pop arrows on left and right -->
        <path d="M60,18 Q90,14 104,26" stroke="var(--c, #3B6FE0)" stroke-width="1.6" fill="none" marker-end="url(#arr-c)" />
        <text x="44" y="24" font-size="10" font-weight="600" fill="var(--c, #3B6FE0)">push()</text>

        <path d="M236,26 Q250,14 278,18" stroke="var(--mute)" stroke-width="1.6" fill="none" marker-end="url(#arr-m)" />
        <text x="284" y="24" font-size="10" font-weight="600" fill="var(--mute)">pop()</text>
        <text x="170" y="112" text-anchor="middle" font-size="9.5" fill="var(--mute)" letter-spacing="0.06em">LIFO · LAST IN, FIRST OUT</text>
      </svg>`;

    case 'queue':
      return `<svg viewBox="0 0 340 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Pipe lines top and bottom -->
        <line x1="75" y1="30" x2="265" y2="30" stroke="var(--line)" stroke-width="2" />
        <line x1="75" y1="72" x2="265" y2="72" stroke="var(--line)" stroke-width="2" />
        <!-- Enqueue arrow -->
        <line x1="16" y1="51" x2="68" y2="51" stroke="var(--c, #3B6FE0)" stroke-width="1.8" marker-end="url(#arr-c)" />
        <text x="42" y="42" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--c, #3B6FE0)">enqueue</text>
        <!-- Items in queue -->
        <g transform="translate(85, 36)">
          <rect x="0" y="0" width="48" height="30" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="24" y="19" text-anchor="middle" font-size="12" fill="currentColor">3</text>

          <rect x="56" y="0" width="48" height="30" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="80" y="19" text-anchor="middle" font-size="12" fill="currentColor">2</text>

          <rect x="112" y="0" width="48" height="30" rx="4" stroke="var(--c, #3B6FE0)" stroke-width="1.8" fill="var(--c, #3B6FE0)" fill-opacity="0.14" />
          <text x="136" y="19" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c, #3B6FE0)">1</text>
        </g>
        <!-- Dequeue arrow -->
        <line x1="255" y1="51" x2="315" y2="51" stroke="var(--mute)" stroke-width="1.8" marker-end="url(#arr-m)" />
        <text x="285" y="42" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--mute)">dequeue</text>
        <text x="170" y="88" text-anchor="middle" font-size="9" fill="var(--mute)" letter-spacing="0.06em">FIFO · FIRST IN, FIRST OUT</text>
      </svg>`;

    case 'deque':
      return `<svg viewBox="0 0 340 95" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <line x1="65" y1="28" x2="275" y2="28" stroke="var(--line)" stroke-width="2" />
        <line x1="65" y1="72" x2="275" y2="72" stroke="var(--line)" stroke-width="2" />
        <!-- Front controls -->
        <path d="M54,42 L16,42 M24,36 L14,42 L24,48" stroke="var(--c, #3B6FE0)" stroke-width="1.5" />
        <path d="M16,58 L54,58 M46,52 L56,58 L46,64" stroke="var(--c, #3B6FE0)" stroke-width="1.5" />
        <text x="35" y="24" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #3B6FE0)">FRONT</text>
        <!-- Items -->
        <g transform="translate(75, 34)">
          <rect x="0" y="0" width="42" height="32" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="21" y="20" text-anchor="middle" font-size="12" fill="currentColor">A</text>
          <rect x="48" y="0" width="42" height="32" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="69" y="20" text-anchor="middle" font-size="12" fill="currentColor">B</text>
          <rect x="96" y="0" width="42" height="32" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="117" y="20" text-anchor="middle" font-size="12" fill="currentColor">C</text>
          <rect x="144" y="0" width="42" height="32" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="165" y="20" text-anchor="middle" font-size="12" fill="currentColor">D</text>
        </g>
        <!-- Back controls -->
        <path d="M284,42 L322,42 M314,36 L324,42 L314,48" stroke="var(--c, #3B6FE0)" stroke-width="1.5" />
        <path d="M322,58 L284,58 M292,52 L282,58 L292,64" stroke="var(--c, #3B6FE0)" stroke-width="1.5" />
        <text x="303" y="24" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #3B6FE0)">BACK</text>
        <text x="170" y="88" text-anchor="middle" font-size="9" fill="var(--mute)" letter-spacing="0.06em">DOUBLE-ENDED QUEUE · O(1) AT BOTH ENDS</text>
      </svg>`;

    case 'binary-tree':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- branches -->
        <line x1="170" y1="26" x2="105" y2="58" stroke="var(--line)" stroke-width="1.8" />
        <line x1="170" y1="26" x2="235" y2="58" stroke="var(--line)" stroke-width="1.8" />
        <line x1="105" y1="58" x2="70" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <line x1="105" y1="58" x2="140" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <line x1="235" y1="58" x2="270" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <!-- root -->
        <circle cx="170" cy="26" r="16" stroke="var(--c, #2E9E6A)" stroke-width="2" fill="var(--c, #2E9E6A)" fill-opacity="0.12" />
        <text x="170" y="31" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c, #2E9E6A)">A</text>
        <!-- level 1 -->
        <circle cx="105" cy="58" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="105" y="62" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">B</text>
        <circle cx="235" cy="58" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="235" y="62" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">C</text>
        <!-- level 2 -->
        <circle cx="70" cy="92" r="12" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="70" y="96" text-anchor="middle" font-size="10" fill="currentColor">D</text>
        <circle cx="140" cy="92" r="12" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="140" y="96" text-anchor="middle" font-size="10" fill="currentColor">E</text>
        <circle cx="270" cy="92" r="12" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="270" y="96" text-anchor="middle" font-size="10" fill="currentColor">F</text>
      </svg>`;

    case 'bst':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- branches -->
        <line x1="170" y1="24" x2="100" y2="58" stroke="var(--line)" stroke-width="1.8" />
        <line x1="170" y1="24" x2="240" y2="58" stroke="var(--line)" stroke-width="1.8" />
        <line x1="100" y1="58" x2="65" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <line x1="100" y1="58" x2="135" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <line x1="240" y1="58" x2="275" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <!-- relation tags -->
        <text x="122" y="36" font-size="9" font-weight="600" fill="var(--c, #2E9E6A)">&lt; 8</text>
        <text x="208" y="36" font-size="9" font-weight="600" fill="var(--c, #2E9E6A)">&gt; 8</text>
        <!-- root -->
        <circle cx="170" cy="24" r="16" stroke="var(--c, #2E9E6A)" stroke-width="2" fill="var(--c, #2E9E6A)" fill-opacity="0.14" />
        <text x="170" y="29" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c, #2E9E6A)">8</text>
        <!-- level 1 -->
        <circle cx="100" cy="58" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="100" y="62" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">3</text>
        <circle cx="240" cy="58" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="240" y="62" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">10</text>
        <!-- level 2 -->
        <circle cx="65" cy="92" r="12" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="65" y="96" text-anchor="middle" font-size="10" fill="currentColor">1</text>
        <circle cx="135" cy="92" r="12" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="135" y="96" text-anchor="middle" font-size="10" fill="currentColor">6</text>
        <circle cx="275" cy="92" r="12" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="275" y="96" text-anchor="middle" font-size="10" fill="currentColor">14</text>
      </svg>`;

    case 'heap':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- tree top -->
        <line x1="85" y1="20" x2="48" y2="48" stroke="var(--line)" stroke-width="1.5" />
        <line x1="85" y1="20" x2="122" y2="48" stroke="var(--line)" stroke-width="1.5" />
        <line x1="48" y1="48" x2="30" y2="74" stroke="var(--line)" stroke-width="1.2" />
        <line x1="48" y1="48" x2="66" y2="74" stroke="var(--line)" stroke-width="1.2" />

        <circle cx="85" cy="20" r="12" stroke="var(--c, #2E9E6A)" stroke-width="1.8" fill="var(--c, #2E9E6A)" fill-opacity="0.14" />
        <text x="85" y="24" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--c, #2E9E6A)">2</text>
        <circle cx="48" cy="48" r="10" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="48" y="52" text-anchor="middle" font-size="9.5" fill="currentColor">4</text>
        <circle cx="122" cy="48" r="10" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="122" y="52" text-anchor="middle" font-size="9.5" fill="currentColor">7</text>
        <circle cx="30" cy="74" r="8" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="30" y="77" text-anchor="middle" font-size="8.5" fill="currentColor">8</text>
        <circle cx="66" cy="74" r="8" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="66" y="77" text-anchor="middle" font-size="8.5" fill="currentColor">5</text>

        <!-- divider -->
        <line x1="155" y1="12" x2="155" y2="92" stroke="var(--line)" stroke-dasharray="3 3" />
        <!-- array representation right -->
        <g transform="translate(170, 26)">
          <text x="75" y="0" text-anchor="middle" font-size="9" fill="var(--mute)">ARRAY REPRESENTATION</text>
          <g transform="translate(0, 10)">
            <rect x="0" y="0" width="28" height="26" stroke="var(--c, #2E9E6A)" stroke-width="1.5" fill="var(--c, #2E9E6A)" fill-opacity="0.12" />
            <text x="14" y="17" text-anchor="middle" font-size="11" font-weight="700" fill="var(--c, #2E9E6A)">2</text>
            <rect x="28" y="0" width="28" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
            <text x="42" y="17" text-anchor="middle" font-size="11" fill="currentColor">4</text>
            <rect x="56" y="0" width="28" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
            <text x="70" y="17" text-anchor="middle" font-size="11" fill="currentColor">7</text>
            <rect x="84" y="0" width="28" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
            <text x="98" y="17" text-anchor="middle" font-size="11" fill="currentColor">8</text>
            <rect x="112" y="0" width="28" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
            <text x="126" y="17" text-anchor="middle" font-size="11" fill="currentColor">5</text>
          </g>
          <text x="70" y="54" text-anchor="middle" font-size="8.5" fill="var(--mute)">left = 2i+1 · right = 2i+2</text>
        </g>
      </svg>`;

    case 'grid':
      return `<svg viewBox="0 0 340 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Grid cells 3x4 -->
        <g transform="translate(70, 10)">
          <!-- cols -->
          <text x="16" y="0" text-anchor="middle" font-size="8.5" fill="var(--mute)">0</text>
          <text x="48" y="0" text-anchor="middle" font-size="8.5" fill="var(--mute)">1</text>
          <text x="80" y="0" text-anchor="middle" font-size="8.5" fill="var(--mute)">2</text>
          <text x="112" y="0" text-anchor="middle" font-size="8.5" fill="var(--mute)">3</text>
          <!-- rows -->
          <text x="-8" y="20" font-size="8.5" fill="var(--mute)">0</text>
          <text x="-8" y="48" font-size="8.5" fill="var(--mute)">1</text>
          <text x="-8" y="76" font-size="8.5" fill="var(--mute)">2</text>

          <g transform="translate(0, 6)">
            <!-- row 0 -->
            <rect x="0" y="0" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <rect x="32" y="0" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <rect x="64" y="0" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <rect x="96" y="0" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <!-- row 1 -->
            <rect x="0" y="26" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <rect x="32" y="26" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <!-- selected cell (1, 2) -->
            <rect x="64" y="26" width="32" height="26" stroke="var(--c, #3B6FE0)" stroke-width="2" fill="var(--c, #3B6FE0)" fill-opacity="0.18" />
            <text x="80" y="43" text-anchor="middle" font-size="10" font-weight="700" fill="var(--c, #3B6FE0)">(r,c)</text>
            <rect x="96" y="26" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <!-- row 2 -->
            <rect x="0" y="52" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <rect x="32" y="52" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <rect x="64" y="52" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
            <rect x="96" y="52" width="32" height="26" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.02" />
          </g>
        </g>
        <g transform="translate(230, 24)">
          <text x="0" y="16" font-size="9.5" font-weight="600" fill="currentColor">Directions:</text>
          <text x="0" y="32" font-size="8.5" fill="var(--mute)">(r-1, c) ↑</text>
          <text x="0" y="46" font-size="8.5" fill="var(--mute)">(r+1, c) ↓</text>
          <text x="0" y="60" font-size="8.5" fill="var(--mute)">(r, c±1) ⇄</text>
        </g>
      </svg>`;

    case 'graph':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- edges -->
        <line x1="60" y1="52" x2="130" y2="24" stroke="var(--line)" stroke-width="1.6" />
        <line x1="60" y1="52" x2="130" y2="80" stroke="var(--line)" stroke-width="1.6" />
        <line x1="130" y1="24" x2="210" y2="24" stroke="var(--c, #8A4FD8)" stroke-width="1.8" marker-end="url(#arr-c)" />
        <line x1="210" y1="24" x2="270" y2="52" stroke="var(--c, #8A4FD8)" stroke-width="1.8" marker-end="url(#arr-c)" />
        <line x1="270" y1="52" x2="210" y2="80" stroke="var(--c, #8A4FD8)" stroke-width="1.8" marker-end="url(#arr-c)" />
        <line x1="210" y1="80" x2="130" y2="80" stroke="var(--line)" stroke-width="1.6" />
        <line x1="130" y1="24" x2="210" y2="80" stroke="var(--line)" stroke-width="1.4" stroke-dasharray="3 3" />
        <!-- nodes -->
        <circle cx="60" cy="52" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="60" y="56" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">A</text>
        <circle cx="130" cy="24" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="130" y="28" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">B</text>
        <circle cx="210" cy="24" r="14" stroke="var(--c, #8A4FD8)" stroke-width="1.8" fill="var(--c, #8A4FD8)" fill-opacity="0.14" />
        <text x="210" y="28" text-anchor="middle" font-size="11" font-weight="700" fill="var(--c, #8A4FD8)">C</text>
        <circle cx="270" cy="52" r="14" stroke="var(--c, #8A4FD8)" stroke-width="1.8" fill="var(--c, #8A4FD8)" fill-opacity="0.14" />
        <text x="270" y="56" text-anchor="middle" font-size="11" font-weight="700" fill="var(--c, #8A4FD8)">D</text>
        <circle cx="130" cy="80" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="130" y="84" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">E</text>
        <circle cx="210" cy="80" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="210" y="84" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">F</text>
      </svg>`;

    case 'trie':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- root -->
        <circle cx="170" cy="18" r="10" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.05" />
        <text x="170" y="21" text-anchor="middle" font-size="9" fill="var(--mute)">root</text>

        <line x1="170" y1="28" x2="105" y2="52" stroke="var(--line)" stroke-width="1.5" />
        <line x1="170" y1="28" x2="235" y2="52" stroke="var(--line)" stroke-width="1.5" />

        <!-- 'c' branch -->
        <circle cx="105" cy="52" r="12" stroke="var(--c, #8A4FD8)" stroke-width="1.5" fill="var(--c, #8A4FD8)" fill-opacity="0.1" />
        <text x="105" y="56" text-anchor="middle" font-size="11" font-weight="600" fill="var(--c, #8A4FD8)">c</text>

        <line x1="105" y1="64" x2="105" y2="82" stroke="var(--line)" stroke-width="1.5" />
        <circle cx="105" cy="88" r="12" stroke="var(--c, #8A4FD8)" stroke-width="1.5" fill="var(--c, #8A4FD8)" fill-opacity="0.1" />
        <text x="105" y="92" text-anchor="middle" font-size="11" font-weight="600" fill="var(--c, #8A4FD8)">a</text>

        <line x1="97" y1="96" x2="65" y2="104" stroke="var(--line)" stroke-width="1.2" />
        <line x1="113" y1="96" x2="145" y2="104" stroke="var(--line)" stroke-width="1.2" />

        <text x="55" y="110" font-size="10" font-weight="700" fill="currentColor">t* ("cat")</text>
        <text x="145" y="110" font-size="10" font-weight="700" fill="currentColor">r* ("car")</text>

        <!-- 'd' branch -->
        <circle cx="235" cy="52" r="12" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="235" y="56" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">d</text>

        <line x1="235" y1="64" x2="235" y2="82" stroke="var(--line)" stroke-width="1.5" />
        <circle cx="235" cy="88" r="12" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="235" y="92" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">o</text>

        <text x="235" y="110" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">g* ("dog")</text>
      </svg>`;

    case 'union-find':
      return `<svg viewBox="0 0 340 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Set 1 -->
        <g transform="translate(60, 20)">
          <circle cx="35" cy="16" r="14" stroke="var(--c, #8A4FD8)" stroke-width="2" fill="var(--c, #8A4FD8)" fill-opacity="0.14" />
          <text x="35" y="20" text-anchor="middle" font-size="11" font-weight="700" fill="var(--c, #8A4FD8)">1 (root)</text>
          <line x1="16" y1="52" x2="28" y2="28" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr)" />
          <line x1="54" y1="52" x2="42" y2="28" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr)" />
          <circle cx="12" cy="58" r="11" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="12" y="62" text-anchor="middle" font-size="10" fill="currentColor">2</text>
          <circle cx="58" cy="58" r="11" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="58" y="62" text-anchor="middle" font-size="10" fill="currentColor">3</text>
        </g>
        <!-- Union dashed arrow -->
        <path d="M140,36 Q170,18 200,36" stroke="var(--c, #8A4FD8)" stroke-width="1.6" stroke-dasharray="3 3" fill="none" marker-end="url(#arr-c)" />
        <text x="170" y="24" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #8A4FD8)">union(1, 4)</text>
        <!-- Set 2 -->
        <g transform="translate(205, 20)">
          <circle cx="35" cy="16" r="14" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
          <text x="35" y="20" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">4 (root)</text>
          <line x1="35" y1="50" x2="35" y2="30" stroke="currentColor" stroke-width="1.4" marker-end="url(#arr)" />
          <circle cx="35" cy="58" r="11" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="35" y="62" text-anchor="middle" font-size="10" fill="currentColor">5</text>
        </g>
        <text x="170" y="92" text-anchor="middle" font-size="9" fill="var(--mute)">NEAR-O(1) DISJOINT SET MERGE &amp; FIND</text>
      </svg>`;

    case 'lru-cache':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Hash map part top -->
        <rect x="25" y="12" width="70" height="24" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="60" y="27" text-anchor="middle" font-size="9.5" font-weight="600" fill="currentColor">Map: key→node</text>
        <!-- Arrow pointing from map down into list node -->
        <path d="M95,24 Q185,24 185,46" stroke="var(--c, #3B6FE0)" stroke-width="1.5" stroke-dasharray="2 2" fill="none" marker-end="url(#arr-c)" />
        <!-- Doubly linked list -->
        <text x="24" y="64" font-size="9.5" font-weight="700" fill="var(--c, #3B6FE0)">HEAD</text>
        <g transform="translate(56, 48)">
          <!-- Node 1 (MRU) -->
          <rect x="0" y="0" width="60" height="30" rx="5" stroke="var(--c, #3B6FE0)" stroke-width="1.6" fill="var(--c, #3B6FE0)" fill-opacity="0.12" />
          <text x="30" y="19" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--c, #3B6FE0)">k1: v1</text>
          <!-- bi-directional arrows -->
          <path d="M60,11 L86,11 M80,7 L88,11 L80,15" stroke="currentColor" stroke-width="1.2" />
          <path d="M88,20 L62,20 M68,16 L60,20 L68,24" stroke="currentColor" stroke-width="1.2" />
          <!-- Node 2 -->
          <rect x="90" y="0" width="60" height="30" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="120" y="19" text-anchor="middle" font-size="10.5" fill="currentColor">k2: v2</text>
          <!-- bi-directional arrows -->
          <path d="M150,11 L176,11 M170,7 L178,11 L170,15" stroke="currentColor" stroke-width="1.2" />
          <path d="M178,20 L152,20 M158,16 L150,20 L158,24" stroke="currentColor" stroke-width="1.2" />
          <!-- Node 3 (LRU) -->
          <rect x="180" y="0" width="60" height="30" rx="5" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
          <text x="210" y="19" text-anchor="middle" font-size="10.5" fill="currentColor">k3: v3</text>
        </g>
        <text x="305" y="64" font-size="9.5" font-weight="700" fill="var(--mute)">TAIL</text>
        <text x="170" y="96" text-anchor="middle" font-size="8.5" fill="var(--mute)">HASH MAP + DOUBLY LINKED LIST (O(1) GET &amp; PUT)</text>
      </svg>`;

    case 'balanced-bst':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Rotation badge -->
        <text x="170" y="14" text-anchor="middle" font-size="9" fill="var(--c, #2E9E6A)" letter-spacing="0.06em">SELF-BALANCING · HEIGHT GUARANTEED O(log n)</text>
        <!-- tree nodes -->
        <line x1="170" y1="32" x2="105" y2="60" stroke="var(--line)" stroke-width="1.8" />
        <line x1="170" y1="32" x2="235" y2="60" stroke="var(--line)" stroke-width="1.8" />
        <line x1="105" y1="60" x2="70" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <line x1="105" y1="60" x2="140" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <line x1="235" y1="60" x2="200" y2="92" stroke="var(--line)" stroke-width="1.5" />
        <line x1="235" y1="60" x2="270" y2="92" stroke="var(--line)" stroke-width="1.5" />

        <circle cx="170" cy="32" r="14" stroke="var(--c, #2E9E6A)" stroke-width="2" fill="var(--c, #2E9E6A)" fill-opacity="0.14" />
        <text x="170" y="36" text-anchor="middle" font-size="11" font-weight="700" fill="var(--c, #2E9E6A)">B (0)</text>

        <circle cx="105" cy="60" r="13" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="105" y="64" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">A (0)</text>

        <circle cx="235" cy="60" r="13" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="235" y="64" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">C (0)</text>

        <circle cx="70" cy="92" r="10" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <circle cx="140" cy="92" r="10" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <circle cx="200" cy="92" r="10" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <circle cx="270" cy="92" r="10" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
      </svg>`;

    case 'segment-tree':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <!-- Root node -->
        <line x1="170" y1="26" x2="95" y2="56" stroke="var(--line)" stroke-width="1.6" />
        <line x1="170" y1="26" x2="245" y2="56" stroke="var(--line)" stroke-width="1.6" />
        <rect x="135" y="12" width="70" height="26" rx="5" stroke="var(--c, #D9447A)" stroke-width="1.8" fill="var(--c, #D9447A)" fill-opacity="0.14" />
        <text x="170" y="28" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--c, #D9447A)">[0..3] : 12</text>

        <!-- Mid nodes -->
        <line x1="95" y1="56" x2="60" y2="86" stroke="var(--line)" stroke-width="1.3" />
        <line x1="95" y1="56" x2="130" y2="86" stroke="var(--line)" stroke-width="1.3" />
        <line x1="245" y1="56" x2="210" y2="86" stroke="var(--line)" stroke-width="1.3" />
        <line x1="245" y1="56" x2="280" y2="86" stroke="var(--line)" stroke-width="1.3" />

        <rect x="65" y="44" width="60" height="22" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="95" y="58" text-anchor="middle" font-size="9.5" fill="currentColor">[0..1] : 7</text>

        <rect x="215" y="44" width="60" height="22" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="245" y="58" text-anchor="middle" font-size="9.5" fill="currentColor">[2..3] : 5</text>

        <!-- Leaves -->
        <rect x="42" y="86" width="36" height="20" rx="3" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.03" />
        <text x="60" y="99" text-anchor="middle" font-size="9.5" font-weight="600" fill="currentColor">2</text>
        <rect x="112" y="86" width="36" height="20" rx="3" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.03" />
        <text x="130" y="99" text-anchor="middle" font-size="9.5" font-weight="600" fill="currentColor">5</text>
        <rect x="192" y="86" width="36" height="20" rx="3" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.03" />
        <text x="210" y="99" text-anchor="middle" font-size="9.5" font-weight="600" fill="currentColor">1</text>
        <rect x="262" y="86" width="36" height="20" rx="3" stroke="var(--line)" stroke-width="1" fill="currentColor" fill-opacity="0.03" />
        <text x="280" y="99" text-anchor="middle" font-size="9.5" font-weight="600" fill="currentColor">4</text>
      </svg>`;

    case 'fenwick-tree':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <text x="170" y="14" text-anchor="middle" font-size="9" fill="var(--c, #D9447A)" letter-spacing="0.06em">BINARY INDEXED TREE · lowbit(i) = i &amp; (-i)</text>
        <g transform="translate(18, 24)">
          <!-- Coverage intervals -->
          <!-- bar 1 (len 1) -->
          <rect x="0" y="0" width="32" height="10" rx="2" fill="var(--c, #D9447A)" fill-opacity="0.2" />
          <!-- bar 2 (len 2) -->
          <rect x="0" y="14" width="70" height="10" rx="2" fill="var(--c, #D9447A)" fill-opacity="0.25" />
          <!-- bar 3 (len 1) -->
          <rect x="76" y="0" width="32" height="10" rx="2" fill="var(--c, #D9447A)" fill-opacity="0.2" />
          <!-- bar 4 (len 4) -->
          <rect x="0" y="28" width="146" height="10" rx="2" fill="var(--c, #D9447A)" fill-opacity="0.35" />
          <!-- bar 5 (len 1) -->
          <rect x="152" y="0" width="32" height="10" rx="2" fill="var(--c, #D9447A)" fill-opacity="0.2" />
          <!-- bar 6 (len 2) -->
          <rect x="152" y="14" width="70" height="10" rx="2" fill="var(--c, #D9447A)" fill-opacity="0.25" />
          <!-- bar 7 (len 1) -->
          <rect x="228" y="0" width="32" height="10" rx="2" fill="var(--c, #D9447A)" fill-opacity="0.2" />
          <!-- bar 8 (len 8) -->
          <rect x="0" y="42" width="304" height="10" rx="2" fill="var(--c, #D9447A)" fill-opacity="0.5" />

          <!-- Index boxes at bottom -->
          <g transform="translate(0, 58)">
            ${[1, 2, 3, 4, 5, 6, 7, 8].map((k, j) => `
              <rect x="${j * 38}" y="0" width="34" height="20" rx="3" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
              <text x="${j * 38 + 17}" y="14" text-anchor="middle" font-size="9.5" font-weight="600" fill="currentColor">${k}</text>
            `).join('')}
          </g>
        </g>
      </svg>`;

    case 'binary-search':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <text x="170" y="14" text-anchor="middle" font-size="9" fill="var(--c, #D97706)" letter-spacing="0.06em">DIVIDE SEARCH SPACE IN HALF · O(log n)</text>
        <g transform="translate(18, 28)">
          ${[2, 7, 11, 15, 23, 31, 45, 56].map((val, idx) => {
            const isLeft = idx < 3;
            const isMid = idx === 3;
            const fill = isMid ? 'var(--c, #D97706)' : isLeft ? 'var(--mute)' : 'currentColor';
            const fillOp = isMid ? '0.2' : isLeft ? '0.02' : '0.04';
            const stroke = isMid ? 'var(--c, #D97706)' : 'var(--line)';
            const textFill = isMid ? 'var(--c, #D97706)' : isLeft ? 'var(--mute)' : 'currentColor';
            return `
              <rect x="${idx * 38}" y="8" width="34" height="28" rx="4" stroke="${stroke}" stroke-width="${isMid ? '1.8' : '1.2'}" fill="${fill}" fill-opacity="${fillOp}" />
              <text x="${idx * 38 + 17}" y="26" text-anchor="middle" font-size="11" font-weight="${isMid ? '700' : '500'}" fill="${textFill}">${val}</text>
            `;
          }).join('')}
          <text x="17" y="52" text-anchor="middle" font-size="10" font-weight="700" fill="var(--mute)">L</text>
          <line x1="131" y1="48" x2="131" y2="38" stroke="var(--c, #D97706)" stroke-width="1.6" marker-end="url(#arr-c)" />
          <text x="131" y="60" text-anchor="middle" font-size="10" font-weight="700" fill="var(--c, #D97706)">MID (15)</text>
          <text x="283" y="52" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">R</text>
        </g>
      </svg>`;

    case 'divide-and-conquer':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <rect x="110" y="8" width="120" height="24" rx="4" stroke="var(--c, #D97706)" stroke-width="1.6" fill="var(--c, #D97706)" fill-opacity="0.12" />
        <text x="170" y="24" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--c, #D97706)">Problem (size n)</text>

        <line x1="145" y1="34" x2="85" y2="48" stroke="var(--line)" stroke-width="1.4" marker-end="url(#arr)" />
        <line x1="195" y1="34" x2="255" y2="48" stroke="var(--line)" stroke-width="1.4" marker-end="url(#arr)" />
        <text x="170" y="44" text-anchor="middle" font-size="8.5" fill="var(--mute)">DIVIDE</text>

        <rect x="35" y="50" width="100" height="22" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="85" y="65" text-anchor="middle" font-size="9.5" fill="currentColor">Subproblem (n/2)</text>

        <rect x="205" y="50" width="100" height="22" rx="4" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.03" />
        <text x="255" y="65" text-anchor="middle" font-size="9.5" fill="currentColor">Subproblem (n/2)</text>

        <line x1="85" y1="74" x2="145" y2="88" stroke="var(--c, #D97706)" stroke-width="1.4" marker-end="url(#arr-c)" />
        <line x1="255" y1="74" x2="195" y2="88" stroke="var(--c, #D97706)" stroke-width="1.4" marker-end="url(#arr-c)" />
        <text x="170" y="84" text-anchor="middle" font-size="8.5" font-weight="600" fill="var(--c, #D97706)">COMBINE</text>

        <rect x="115" y="90" width="110" height="20" rx="4" stroke="var(--c, #D97706)" stroke-width="1.4" fill="var(--c, #D97706)" fill-opacity="0.1" />
        <text x="170" y="104" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--c, #D97706)">Merged Solution</text>
      </svg>`;

    case 'greedy':
      return `<svg viewBox="0 0 340 105" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <text x="170" y="14" text-anchor="middle" font-size="9" fill="var(--c, #D97706)" letter-spacing="0.06em">LOCALLY OPTIMAL CHOICE AT EACH STEP</text>
        <g transform="translate(25, 26)">
          <line x1="0" y1="56" x2="290" y2="56" stroke="var(--line)" stroke-width="1.2" />

          <rect x="10" y="8" width="60" height="18" rx="3" stroke="var(--c, #D97706)" stroke-width="1.6" fill="var(--c, #D97706)" fill-opacity="0.2" />
          <text x="40" y="21" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #D97706)">Picked ✓</text>

          <rect x="45" y="32" width="75" height="18" rx="3" stroke="var(--line)" stroke-width="1.2" stroke-dasharray="2 2" fill="currentColor" fill-opacity="0.02" />
          <text x="82" y="45" text-anchor="middle" font-size="8.5" fill="var(--mute)">Overlap ✕</text>

          <rect x="130" y="8" width="70" height="18" rx="3" stroke="var(--c, #D97706)" stroke-width="1.6" fill="var(--c, #D97706)" fill-opacity="0.2" />
          <text x="165" y="21" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #D97706)">Picked ✓</text>

          <rect x="215" y="8" width="65" height="18" rx="3" stroke="var(--c, #D97706)" stroke-width="1.6" fill="var(--c, #D97706)" fill-opacity="0.2" />
          <text x="247" y="21" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #D97706)">Picked ✓</text>
        </g>
      </svg>`;

    case 'backtracking':
      return `<svg viewBox="0 0 340 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <circle cx="170" cy="18" r="12" stroke="var(--line)" stroke-width="1.5" fill="currentColor" fill-opacity="0.04" />
        <text x="170" y="22" text-anchor="middle" font-size="9.5" font-weight="600" fill="currentColor">[]</text>

        <line x1="158" y1="28" x2="95" y2="52" stroke="var(--line)" stroke-width="1.4" />
        <line x1="182" y1="28" x2="245" y2="52" stroke="var(--line)" stroke-width="1.4" />

        <circle cx="95" cy="56" r="13" stroke="var(--c, #D97706)" stroke-width="1.6" fill="var(--c, #D97706)" fill-opacity="0.14" />
        <text x="95" y="60" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--c, #D97706)">[1]</text>

        <circle cx="245" cy="56" r="13" stroke="var(--line)" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
        <text x="245" y="60" text-anchor="middle" font-size="9.5" fill="currentColor">[2]</text>

        <line x1="85" y1="68" x2="55" y2="92" stroke="var(--line)" stroke-width="1.2" />
        <line x1="105" y1="68" x2="135" y2="92" stroke="var(--line)" stroke-width="1.2" />

        <rect x="30" y="88" width="50" height="20" rx="4" stroke="var(--c, #D97706)" stroke-width="1.4" fill="var(--c, #D97706)" fill-opacity="0.14" />
        <text x="55" y="102" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #D97706)">[1,2] ✓</text>

        <rect x="110" y="88" width="50" height="20" rx="4" stroke="var(--line)" stroke-width="1.2" stroke-dasharray="2 2" fill="currentColor" fill-opacity="0.02" />
        <text x="135" y="102" text-anchor="middle" font-size="9" fill="var(--mute)">[1,3] ✕</text>

        <path d="M155,92 Q175,70 115,62" stroke="var(--c, #D97706)" stroke-width="1.5" stroke-dasharray="3 2" fill="none" marker-end="url(#arr-c)" />
        <text x="195" y="78" text-anchor="middle" font-size="8.5" font-weight="600" fill="var(--c, #D97706)">undo / backtrack</text>
      </svg>`;

    case 'dynamic-programming':
      return `<svg viewBox="0 0 340 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        <text x="170" y="14" text-anchor="middle" font-size="9" fill="var(--c, #D97706)" letter-spacing="0.06em">OVERLAPPING SUBPROBLEMS CACHED IN TABLE</text>
        <g transform="translate(60, 24)">
          <rect x="0" y="0" width="130" height="66" rx="6" stroke="var(--line)" stroke-width="1.4" fill="currentColor" fill-opacity="0.02" />
          <line x1="0" y1="22" x2="130" y2="22" stroke="var(--line)" stroke-width="1" />
          <line x1="0" y1="44" x2="130" y2="44" stroke="var(--line)" stroke-width="1" />
          <line x1="43" y1="0" x2="43" y2="66" stroke="var(--line)" stroke-width="1" />
          <line x1="86" y1="0" x2="86" y2="66" stroke="var(--line)" stroke-width="1" />

          <rect x="86" y="44" width="44" height="22" rx="3" stroke="var(--c, #D97706)" stroke-width="1.8" fill="var(--c, #D97706)" fill-opacity="0.2" />
          <text x="108" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="var(--c, #D97706)">dp[i][j]</text>

          <rect x="86" y="22" width="44" height="22" rx="2" fill="var(--c, #D97706)" fill-opacity="0.08" />
          <line x1="108" y1="36" x2="108" y2="44" stroke="var(--c, #D97706)" stroke-width="1.4" marker-end="url(#arr-c)" />

          <rect x="43" y="22" width="43" height="22" rx="2" fill="var(--c, #D97706)" fill-opacity="0.08" />
          <line x1="75" y1="38" x2="92" y2="48" stroke="var(--c, #D97706)" stroke-width="1.4" marker-end="url(#arr-c)" />
        </g>
        <g transform="translate(205, 36)">
          <text x="0" y="16" font-size="9.5" font-weight="700" fill="currentColor">Transition:</text>
          <text x="0" y="32" font-size="8.5" fill="var(--mute)">dp[i][w] = max(</text>
          <text x="10" y="46" font-size="8" fill="var(--c, #D97706)">dp[i-1][w],</text>
          <text x="10" y="58" font-size="8" fill="var(--c, #D97706)">val + dp[i-1][w-wt]</text>
          <text x="0" y="70" font-size="8.5" fill="var(--mute)">)</text>
        </g>
      </svg>`;

    default:
      return '';
  }
}
