import { DSA_TOPICS, DSA_GROUPS, DSA_ORDER, DSA_BRANCHES, DSA_LEVELS } from './dsa_data.js';
export { DSA_TOPICS, DSA_GROUPS, DSA_ORDER, DSA_BRANCHES, DSA_LEVELS };

export const GROUPS = {
  foundations: { name: 'Foundations',        color: '#3B6FE0' },
  systems:     { name: 'Systems & Hardware', color: '#0D9488' },
  data:        { name: 'Data & Scale',       color: '#8A4FD8' },
  software:    { name: 'Software & Web',     color: '#E0703B' },
  ai_sec:      { name: 'AI & Security',      color: '#D9447A' },
};

export const BRANCHES = [
  { key: 'core',     name: 'Core concepts',         color: '#3B6FE0', leaf: '#BCD0F8' },
  { key: 'why',      name: 'Why it matters',         color: '#0D9488', leaf: '#99F6E4' },
  { key: 'patterns', name: 'Techniques & patterns',  color: '#8A4FD8', leaf: '#DDD6FE' },
  { key: 'examples', name: 'Milestone systems',      color: '#E0703B', leaf: '#FED7AA' },
  { key: 'pitfalls', name: 'Beginner pitfalls',      color: '#E05561', leaf: '#F5C3C8' },
];

export const LEVELS = { core: 'Fundamental', good: 'Core Major', adv: 'Advanced Domain' };

export const ORDER = [
  'dsa',
  'architecture',
  'os',
  'networking',
  'databases',
  'distributed-systems',
  'languages-compilers',
  'software-engineering',
  'web-cloud',
  'ai-ml',
  'cybersecurity',
  'theory-computation',
];

export const DS = [
{
  id: 'dsa', name: 'Data Structures & Algorithms', group: 'foundations', level: 'core',
  one: 'The foundational toolbox of computing: organizing data in memory and designing step-by-step procedures to process it with minimum time and memory.',
  core: [
    ['Linear Layouts', 'Arrays, Strings, Linked Lists, Stacks, Queues'],
    ['Hash Tables', 'O(1) key-value lookup and set membership'],
    ['Hierarchical Trees', 'Binary Search Trees, Heaps, Tries, Balanced Trees'],
    ['Graph Networks', 'Vertices and edges modeling real-world connections'],
    ['Big-O Complexity', 'Time and space scaling as inputs grow'],
  ],
  why: [
    'Enables software to scale smoothly from 10 items to 10 billion items',
    'Directly dictates server costs, memory footprint, and mobile battery life',
    'Forms the shared technical vocabulary across all software engineering',
  ],
  patterns: [
    'Two pointers and sliding window on contiguous sequences',
    'Divide and conquer (Binary search, Merge sort, Quick sort)',
    'Dynamic programming and memoization for overlapping subproblems',
    'Breadth-first search (BFS) for shortest path; Depth-first search (DFS) for exploration',
    'Greedy choice property with heap/priority queue tracking',
  ],
  examples: [
    'Git commit trees (Directed Acyclic Graphs)',
    'Database B-Trees for disk indexing',
    'Search engine autocomplete using Prefix Tries',
    'Operating system process schedulers using Priority Heaps',
    'Router packet queues and browser history stacks',
  ],
  pitfalls: [
    'Premature optimization before measuring bottlenecks',
    'Focusing only on time complexity while ignoring high memory overhead',
    'Assuming operations are O(1) without understanding internal costs (e.g. string concatenation)',
  ],
  py: `# DSA in action: fast lookup with a Hash Map & sorting
scores = {'alice': 95, 'bob': 82, 'charlie': 91}
scores['david'] = 88                 # O(1) average insert
ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True) # O(n log n)
top_student, top_score = ranked[0]
print(f"Top student: {top_student} ({top_score})")`,
  related: ['architecture','os','languages-compilers','theory-computation'],
  topics: DSA_TOPICS,
  dsaBranches: [
    { key: 'linear', name: 'Linear Layouts', color: '#3B6FE0', leaf: '#BCD0F8', ids: ['array', 'string', 'linked-list', 'stack', 'queue', 'deque'] },
    { key: 'hashing', name: 'Hashing & Caches', color: '#E0703B', leaf: '#F9D4B2', ids: ['hash-map', 'hash-set', 'lru-cache'] },
    { key: 'trees', name: 'Trees & Heaps', color: '#2E9E6A', leaf: '#B7E2CD', ids: ['binary-tree', 'bst', 'balanced-bst', 'heap', 'trie'] },
    { key: 'graphs', name: 'Graphs & Networks', color: '#8A4FD8', leaf: '#D8C8F4', ids: ['grid', 'graph', 'union-find'] },
    { key: 'algorithms', name: 'Range & Algorithms', color: '#D97706', leaf: '#FDE68A', ids: ['segment-tree', 'fenwick-tree', 'binary-search', 'divide-and-conquer', 'greedy', 'backtracking', 'dynamic-programming'] }
  ],
},

{
  id: 'architecture', name: 'Computer Architecture & Hardware', group: 'systems', level: 'core',
  one: 'How physical silicon translates electricity into logic: understanding CPUs, registers, memory hierarchies, arithmetic logic units, and machine instructions.',
  core: [
    ['CPU & ALU', 'Arithmetic logic unit executing billions of cycles per second'],
    ['Registers & Clock', 'Fastest on-chip storage running at gigahertz speeds'],
    ['Memory Hierarchy', 'L1/L2/L3 on-die caches → RAM → SSD NVMe storage'],
    ['Instruction Set (ISA)', 'x86-64, ARM64, and RISC-V machine instruction standards'],
    ['Pipelining & Branching', 'Predictive speculative execution and instruction pipelines'],
  ],
  why: [
    'Hardware limits define what software can physically accomplish',
    'Cache-aware code (spatial and temporal locality) runs up to 100x faster than cache-thrashing code',
    'Drives the revolution in modern computing from mobile chips to GPUs and TPUs',
  ],
  patterns: [
    'Spatial locality: access sequential memory blocks together',
    'Temporal locality: reuse recently accessed data while still in cache',
    'Branch prediction friendliness: avoid unpredictable nested conditionals',
    'SIMD parallelism: single instruction manipulating multiple data vectors',
  ],
  examples: [
    'Apple Silicon (M-series) unified memory architecture',
    'NVIDIA GPU tensor cores for massive parallel matrix math',
    'Modern multi-core processors with hyper-threading',
    'Row-major vs column-major matrix traversal performance difference',
  ],
  pitfalls: [
    'Treating memory access as uniform cost (RAM access is ~200x slower than L1 cache)',
    'Ignoring false sharing in multi-threaded programs on the same cache line',
    'Believing high-level code translates 1-to-1 into machine instructions without compiler optimization',
  ],
  py: `# Cache locality demonstration: row traversal is fast
import time
matrix = [[1] * 1000 for _ in range(1000)]
# Row-major traversal (sequential memory, cache-friendly):
start = time.perf_counter()
total = sum(matrix[r][c] for r in range(1000) for c in range(1000))
print(f"Row-major sum: {total} in {(time.perf_counter()-start)*1000:.2f}ms")`,
  related: ['dsa','os','languages-compilers'],
},

{
  id: 'os', name: 'Operating Systems', group: 'systems', level: 'core',
  one: 'The master software that manages computer hardware and coordinates running programs: processes, threads, virtual memory, file systems, and device drivers.',
  core: [
    ['Kernel vs User Mode', 'Privileged hardware access protected by system calls (syscalls)'],
    ['Processes & Threads', 'Isolated address spaces vs shared-memory lightweight execution units'],
    ['CPU Scheduling', 'Preemptive multitasking, round-robin, and CFS priority queues'],
    ['Virtual Memory', 'Page tables mapping virtual memory pages to physical RAM frames'],
    ['Concurrency Primitives', 'Mutexes, semaphores, atomic operations, and lock-free structures'],
  ],
  why: [
    'Prevents programs from crashing each other or stealing private data',
    'Allows hundreds of apps to share limited CPU cores and physical memory concurrently',
    'Provides the standard POSIX and OS APIs every runtime, database, and backend relies on',
  ],
  patterns: [
    'Avoid deadlocks: acquire locks in a globally consistent order',
    'Asynchronous I/O and event loops (epoll/kqueue) over spawning thread-per-connection',
    'Memory-mapped files (mmap) for zero-copy file processing',
    'Copy-on-Write (COW) for lightweight process forking',
  ],
  examples: [
    'Linux kernel powering servers, Android phones, and supercomputers',
    'macOS Darwin kernel based on XNU and BSD',
    'Systemd and Docker container cgroups / namespaces',
    'Git using mmap for fast object database indexing',
  ],
  pitfalls: [
    'Race conditions: modifying shared variables across threads without synchronization',
    'Thread overhead: spawning 10,000 OS threads exhausts system memory and scheduler capacity',
    'Confusing concurrency (dealing with lots of things) with parallelism (doing lots of things at once)',
  ],
  py: `# Concurrency with threads and mutual exclusion locks
import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100_000):
        with lock:          # Mutual exclusion prevents race conditions
            counter += 1

t1 = threading.Thread(target=increment)
t2 = threading.Thread(target=increment)
t1.start(); t2.start(); t1.join(); t2.join()
print("Safe counter:", counter)`,
  related: ['architecture','networking','databases','distributed-systems'],
},

{
  id: 'networking', name: 'Computer Networks', group: 'systems', level: 'core',
  one: 'How independent computers communicate across the globe: the Internet architecture, protocols, packets, routing, addressing, and reliable data transmission.',
  core: [
    ['OSI & TCP/IP Model', 'Layers: Physical → Data Link → Network → Transport → Application'],
    ['IP Addressing & DNS', 'IPv4/IPv6 packet routing and human-readable domain resolution'],
    ['TCP vs UDP', 'Guaranteed ordered byte streams (TCP) vs lightweight datagrams (UDP)'],
    ['HTTP/HTTPS & TLS', 'Stateless web request/response encrypted via asymmetric/symmetric crypto'],
    ['Routing & Sockets', 'BGP inter-network routing and OS network socket file descriptors'],
  ],
  why: [
    'Virtually all modern software is networked: cloud services, APIs, databases, streaming',
    'Network latency and bandwidth are the primary performance bottlenecks for web applications',
    'Understanding packet loss, timeouts, and retries is essential for resilient system design',
  ],
  patterns: [
    'Keep-alive and connection pooling to avoid repeating 3-way handshakes',
    'Idempotent retries with exponential backoff and jitter',
    'Content Delivery Networks (CDNs) caching static assets near users',
    'WebSockets and gRPC (HTTP/2 multiplexing) for real-time bidirectional streams',
  ],
  examples: [
    'The global Internet and Border Gateway Protocol (BGP)',
    'Cloudflare and AWS CloudFront global edge networks',
    'HTTPS TLS 1.3 handshakes securing online banking and commerce',
    'Video conferencing and gaming protocols using UDP',
  ],
  pitfalls: [
    'Assuming the network is reliable, zero-latency, and infinite bandwidth (Fallacies of Distributed Computing)',
    'Retry storms: uncoordinated retries crashing an already struggling backend',
    'Neglecting timeout configurations on HTTP and database socket clients',
  ],
  py: `# Simple TCP Client using Python sockets
import socket

# Connect to HTTP service over standard TCP port 80
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(('example.com', 80))
    s.sendall(b"GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n")
    response = s.recv(1024)
    print("Received first 100 bytes:", response[:100])`,
  related: ['os','databases','distributed-systems','web-cloud','cybersecurity'],
},

{
  id: 'databases', name: 'Databases & Storage Systems', group: 'data', level: 'core',
  one: 'Organizing, persisting, and querying data reliably: relational SQL databases, NoSQL document stores, indexing, transactions, and storage engines.',
  core: [
    ['ACID Transactions', 'Atomicity, Consistency, Isolation, and Durability guarantees'],
    ['Relational (SQL)', 'Tables, foreign key constraints, schemas, joins, and normalization'],
    ['NoSQL Models', 'Key-Value (Redis), Document (MongoDB), Columnar (Cassandra), Graph (Neo4j)'],
    ['B-Tree & LSM-Tree Indexes', 'Logarithmic lookups on disk vs write-optimized append logs'],
    ['Query Planners', 'Cost-based optimization, sequential scans vs index lookups'],
  ],
  why: [
    'Data is the lifeblood of organizations; losing or corrupting data is catastrophic',
    'Choosing the wrong database or indexing strategy brings entire companies to a standstill',
    'Enables complex analytical queries across billions of records in milliseconds',
  ],
  patterns: [
    'Index columns used in WHERE, JOIN, and ORDER BY clauses',
    'Write-Ahead Logging (WAL) to survive unexpected power loss',
    'Read replicas to offload read-heavy traffic from primary database',
    'Connection pooling and prepared statements to minimize parsing overhead',
  ],
  examples: [
    'PostgreSQL & MySQL: the industry standards for relational workloads',
    'SQLite: the most widely deployed database engine in history (in every phone and browser)',
    'Redis: in-memory key-value data structure store used for caching and leaderboards',
    'Apache Kafka & ClickHouse for high-throughput append-only event streaming and analytics',
  ],
  pitfalls: [
    'N+1 Query Problem: issuing a query inside a loop instead of a single batch join',
    'Over-indexing: every index speeds up reads but slows down inserts and updates',
    'Not setting transaction isolation levels appropriately, leading to phantom reads or deadlocks',
  ],
  py: `# Using SQLite in Python with ACID transactions
import sqlite3

conn = sqlite3.connect(':memory:')
cursor = conn.cursor()
cursor.execute('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, balance INT)')
cursor.execute('INSERT INTO users VALUES (1, "Alice", 500), (2, "Bob", 300)')
conn.commit()

# Atomic transfer within a transaction
with conn:
    cursor.execute('UPDATE users SET balance = balance - 100 WHERE id = 1')
    cursor.execute('UPDATE users SET balance = balance + 100 WHERE id = 2')

for row in cursor.execute('SELECT name, balance FROM users'):
    print(row)`,
  related: ['dsa','os','distributed-systems','web-cloud'],
},

{
  id: 'distributed-systems', name: 'System Design & Distributed Systems', group: 'data', level: 'good',
  one: 'Coordinating multiple computers connected by a network to act as a single coherent system: scalability, fault tolerance, replication, and consensus.',
  core: [
    ['CAP Theorem', 'Consistency vs Availability vs Partition tolerance tradeoffs'],
    ['Load Balancing', 'Distributing incoming traffic evenly across pools of application servers'],
    ['Caching Strategies', 'Cache-aside, write-through, and cache eviction policies (LRU/LFU)'],
    ['Message Queues', 'Decoupling producers and consumers with pub/sub event brokers'],
    ['Consensus Algorithms', 'Raft and Paxos for reaching agreement across unreliable nodes'],
  ],
  why: [
    'No single machine can handle the traffic of global modern applications (Google, Netflix, Amazon)',
    'Hardware fails constantly at scale; distributed architectures ensure continuous uptime',
    'Required knowledge for senior software engineering and system architecture roles',
  ],
  patterns: [
    'Horizontal scaling (adding more nodes) over vertical scaling (buying a bigger box)',
    'Database sharding and consistent hashing for even partition distribution',
    'Circuit breakers to stop cascading failures when downstream services fail',
    'Eventual consistency and idempotent message handling',
  ],
  examples: [
    'Amazon DynamoDB and Google Spanner distributed databases',
    'Kubernetes orchestrating microservices across server clusters',
    'Netflix microservices architecture surviving AWS availability zone outages',
    'CDN edge caches serving 95%+ of global web video and images',
  ],
  pitfalls: [
    'Introducing microservices before needing them, multiplying operational complexity',
    'Neglecting distributed tracing and centralized logging, making bugs impossible to debug',
    'Assuming synchronous RPC calls will never hang or fail',
  ],
  py: `# Consistent Hashing concept in Python
import hashlib

nodes = ['server-alpha', 'server-beta', 'server-gamma']

def pick_node(key):
    # Hash the key to pick a deterministic node
    digest = hashlib.md5(key.encode()).hexdigest()
    idx = int(digest, 16) % len(nodes)
    return nodes[idx]

print("user:101 stored on:", pick_node("user:101"))
print("user:102 stored on:", pick_node("user:102"))`,
  related: ['networking','databases','os','web-cloud','software-engineering'],
},

{
  id: 'languages-compilers', name: 'Programming Languages & Compilers', group: 'foundations', level: 'good',
  one: 'How human-readable text is translated into executable machine code: lexical analysis, abstract syntax trees, type systems, interpreters, and runtime virtual machines.',
  core: [
    ['Lexing & Parsing', 'Tokens → Context-Free Grammars → Abstract Syntax Trees (ASTs)'],
    ['Compilation vs Interpretation', 'Ahead-of-Time (AOT) machine code vs Just-In-Time (JIT) vs bytecode VMs'],
    ['Type Systems', 'Static vs dynamic typing; strong vs weak; type inference and safety'],
    ['Memory Management', 'Manual allocation (malloc/free) vs Garbage Collection (mark-and-sweep, ref counting)'],
    ['Paradigms', 'Imperative, Object-Oriented, Functional, and Declarative models'],
  ],
  why: [
    'Demystifies programming: understanding what actually happens when you run code',
    'Allows you to pick the right tool for the job (Rust for safety/speed, Python for speed of development)',
    'Enables building domain-specific languages, linters, code formatters, and query parsers',
  ],
  patterns: [
    'Visitor pattern for traversing Abstract Syntax Trees',
    'Immutable state in functional programming to prevent side-effects',
    'RAII (Resource Acquisition Is Initialization) for deterministic cleanup in Rust/C++',
    'JIT optimization: profile hot code paths and compile to native assembly at runtime',
  ],
  examples: [
    'LLVM compiler infrastructure powering Clang, Rust, Swift, and Julia',
    'V8 JavaScript Engine JIT-compiling JS to native x86/ARM inside Chrome and Node.js',
    'CPython bytecode virtual machine interpreting Python .pyc instructions',
    'Rust borrow checker enforcing memory safety without a garbage collector',
  ],
  pitfalls: [
    'Language zealotry: treating one programming paradigm as universally superior',
    'Ignoring garbage collection pauses in latency-critical real-time applications',
    'Confusing syntax differences with fundamental semantic capability',
  ],
  py: `# Inspecting Python bytecode generated by the compiler
import dis

def add_bonus(score):
    return score + 10

# View the raw virtual machine instructions:
print("Bytecode instructions for add_bonus:")
dis.dis(add_bonus)`,
  related: ['architecture','dsa','os','theory-computation'],
},

{
  id: 'software-engineering', name: 'Software Engineering & DevOps', group: 'software', level: 'core',
  one: 'The disciplines and methodologies for designing, testing, building, deploying, and maintaining high-quality software systems in teams over long lifespans.',
  core: [
    ['Version Control (Git)', 'Snapshots, branches, merges, rebases, and pull requests'],
    ['Testing Pyramid', 'Unit tests → Integration tests → End-to-End (E2E) automated verification'],
    ['CI/CD Pipelines', 'Automated building, linting, testing, and progressive deployment'],
    ['Design Patterns', 'Factory, Singleton, Observer, Strategy, Adapter, Dependency Injection'],
    ['Containerization & Infra', 'Docker containers, declarative Infrastructure as Code (Terraform)'],
  ],
  why: [
    'Code is written once but read, modified, and maintained for decades',
    'Enables teams of hundreds of developers to ship changes simultaneously without breaking production',
    'Differentiates hobbyist scripting from dependable enterprise-grade engineering',
  ],
  patterns: [
    'Separation of Concerns and SOLID design principles',
    'Test-Driven Development (TDD) and high test coverage on core business logic',
    'Canary releases and feature flags to safely roll out updates to a small fraction of users',
    'Immutable infrastructure: replace servers/containers rather than patching in-place',
  ],
  examples: [
    'GitHub and GitLab modern collaboration workflows',
    'Docker containerizing applications with all OS dependencies',
    'GitHub Actions and Jenkins automating test and deploy pipelines',
    'Terraform declaring cloud infrastructure as reviewable code',
  ],
  pitfalls: [
    'Over-engineering with unnecessary abstraction layers for simple problems (YAGNI violation)',
    'Deploying without automated tests or automated rollback mechanisms',
    'Ignoring technical debt until it halts feature development velocity',
  ],
  py: `# Unit testing clean code in Python
import unittest

def calculate_discount(price, is_member):
    if price < 0:
        raise ValueError("Price cannot be negative")
    return price * 0.9 if is_member else price

class TestDiscount(unittest.TestCase):
    def test_member_discount(self):
        self.assertEqual(calculate_discount(100, True), 90.0)
    def test_non_member(self):
        self.assertEqual(calculate_discount(100, False), 100.0)

unittest.main(argv=[''], exit=False)`,
  related: ['distributed-systems','web-cloud','languages-compilers'],
},

{
  id: 'web-cloud', name: 'Web Technologies & Cloud Computing', group: 'software', level: 'good',
  one: 'How modern user-facing applications are delivered: browser DOM, HTML/CSS/JS, REST/GraphQL APIs, cloud infrastructure, and serverless architectures.',
  core: [
    ['Browser Engine & DOM', 'HTML parsing, CSS cascade layout engine, and JavaScript V8 execution'],
    ['Client-Server APIs', 'REST endpoints, GraphQL query schemas, and gRPC remote procedure calls'],
    ['Cloud Computing (IaaS/PaaS)', 'Compute instances (EC2), managed databases, object storage (S3)'],
    ['Serverless & Edge', 'Event-driven functions (AWS Lambda) running at the network edge'],
    ['Web Security', 'Cross-Origin Resource Sharing (CORS), CSP, Cookies, and HTTPS'],
  ],
  why: [
    'The web is the universal application deployment platform accessible to any device with a browser',
    'Cloud computing eliminated the need for companies to buy and manage physical server rooms',
    'Enables instant global distribution of software updates with zero client-side installation',
  ],
  patterns: [
    'Single Page Application (SPA) vs Server-Side Rendering (SSR) for SEO and initial load speed',
    'Stateless authentication using JWTs or secure HttpOnly session cookies',
    'Edge caching of static assets and API responses',
    'Micro-frontends and component-driven UI architecture',
  ],
  examples: [
    'Modern web browsers (Chromium, WebKit, Gecko)',
    'Cloud providers: Amazon Web Services (AWS), Google Cloud (GCP), Microsoft Azure',
    'Vercel and Cloudflare Pages edge hosting platforms',
    'React, Vue, and Svelte frontend UI component frameworks',
  ],
  pitfalls: [
    'Bloating client-side bundle size with massive JavaScript libraries, degrading mobile experience',
    'Improper CORS configuration exposing internal APIs to malicious websites',
    'Cloud bill shock from misconfigured autoscaling or unmonitored serverless triggers',
  ],
  py: `# Modern lightweight Web API using Python (FastAPI/Flask style)
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class SimpleAPI(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        data = {"message": "Hello from Cloud API!", "status": "online"}
        self.wfile.write(json.dumps(data).encode())

print("API ready to serve on port 8000")`,
  related: ['networking','software-engineering','databases','distributed-systems'],
},

{
  id: 'ai-ml', name: 'Artificial Intelligence & Machine Learning', group: 'ai_sec', level: 'good',
  one: 'Designing systems that learn from data rather than following explicit rules: neural networks, deep learning, NLP, computer vision, and foundation models.',
  core: [
    ['Learning Paradigms', 'Supervised (labels) vs Unsupervised (patterns) vs Reinforcement (rewards)'],
    ['Neural Networks', 'Layers of artificial neurons computing weighted sums and activation functions'],
    ['Gradient Descent & Backprop', 'Optimizing millions/billions of weights by calculating error loss gradients'],
    ['Transformers & Attention', 'Self-attention mechanism processing sequences in parallel (foundation of LLMs)'],
    ['Training vs Inference', 'Heavy GPU cluster model training vs lightweight deployed predictions'],
  ],
  why: [
    'Solves problems that are impossible to write explicit rule-based code for (vision, speech, natural language)',
    'Powering the modern revolution in generative AI, autonomous robotics, and automated discovery',
    'Transforms raw messy data into high-value intelligence, predictions, and recommendations',
  ],
  patterns: [
    'Embeddings: representing words, images, and concepts as vectors in high-dimensional space',
    'Transfer learning: fine-tuning massive pretrained foundation models on domain-specific data',
    'Vector search: finding nearest neighbors with cosine similarity for RAG systems',
    'Evaluation metrics: Precision, Recall, F1-Score, and Loss curves',
  ],
  examples: [
    'Large Language Models (GPT-4, Gemini, Claude, LLaMA)',
    'AlphaFold predicting 3D structures of hundreds of millions of proteins',
    'Autonomous driving perception and navigation stacks (Tesla FSD, Waymo)',
    'Recommendation engines powering YouTube, Spotify, and TikTok',
  ],
  pitfalls: [
    'Data leakage and overfitting: model memorizes training data but fails completely on new real-world data',
    'Treating AI as a magic black box without understanding data bias and hallucinations',
    'Using deep neural nets when simple linear regression or decision trees are faster and more interpretable',
  ],
  py: `# Simplest Neural Network forward pass in pure Python
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

# Inputs: x1, x2 | Weights: w1, w2 | Bias: b
inputs = [0.5, 0.8]
weights = [1.2, -0.7]
bias = 0.1

# Compute activation:
z = sum(x * w for x, w in zip(inputs, weights)) + bias
output = sigmoid(z)
print(f"Neuron output: {output:.4f}")`,
  related: ['dsa','architecture','databases','cybersecurity'],
},

{
  id: 'cybersecurity', name: 'Cybersecurity & Cryptography', group: 'ai_sec', level: 'good',
  one: 'Protecting systems, networks, and data from adversarial attacks: cryptographic algorithms, authentication, authorization, vulnerability defense, and secure design.',
  core: [
    ['CIA Triad', 'Confidentiality (privacy), Integrity (tamper-proofing), Availability (uptime)'],
    ['Symmetric Encryption', 'Fast single shared-key encryption (AES-256, ChaCha20)'],
    ['Asymmetric Encryption', 'Public/Private key pairs for signatures and key exchange (RSA, ECC, Ed25519)'],
    ['Cryptographic Hashes', 'One-way collision-resistant digests (SHA-256) and salted password hashing (Argon2, bcrypt)'],
    ['Threat Vectors', 'SQL Injection, XSS, CSRF, Buffer Overflows, DDoS, and Social Engineering'],
  ],
  why: [
    'A single security breach can destroy user trust, cost millions, and ruin businesses',
    'Guarantees privacy for billions of people communicating online every day',
    'Every software developer must write security-aware code to avoid catastrophic vulnerabilities',
  ],
  patterns: [
    'Principle of Least Privilege: grant only the minimum permissions needed',
    'Defense in Depth: layered security controls instead of relying on a single perimeter wall',
    'Never roll your own crypto: always use audited, peer-reviewed standard libraries',
    'Input validation and parameterized queries to eliminate injection vulnerabilities',
  ],
  examples: [
    'End-to-End Encryption in Signal and WhatsApp using the Double Ratchet Algorithm',
    'TLS certificates securing the padlock in web browser address bars',
    'Hardware Security Keys (YubiKey / FIDO2 Passkeys) replacing passwords',
    'Tor onion routing network providing anonymous communication',
  ],
  pitfalls: [
    'Storing passwords in plaintext or with fast cryptographic hashes like MD5/SHA256 (use bcrypt/Argon2)',
    'Hardcoding API secrets, private keys, or credentials inside Git repositories',
    'Assuming security through obscurity (relying on hidden URLs or undocumented algorithms)',
  ],
  py: `# Secure password hashing and verification in Python
import hashlib
import secrets

def hash_password(password, salt=None):
    if salt is None:
        salt = secrets.token_hex(16)
    # Salted SHA-256 demonstration (in production use Argon2/bcrypt)
    digest = hashlib.sha256((salt + password).encode()).hexdigest()
    return f"{salt}:{digest}"

stored_hash = hash_password("secret_pass123")
salt, hashed = stored_hash.split(':')
# Verify password:
check_hash = hash_password("secret_pass123", salt=salt).split(':')[1]
print("Password verified:", check_hash == hashed)`,
  related: ['networking','os','web-cloud','theory-computation'],
},

{
  id: 'theory-computation', name: 'Theory of Computation & Math', group: 'foundations', level: 'adv',
  one: 'The mathematical foundations exploring the fundamental capabilities and boundaries of computers: automata, formal grammars, computability, and complexity theory.',
  core: [
    ['Finite Automata', 'State machines recognizing regular languages (regex engine foundations)'],
    ['Turing Machines', 'Abstract mathematical models of computation defining what is computable'],
    ['Halting Problem', 'Alan Turing proof that no general algorithm can predict if all programs will halt'],
    ['Complexity Classes', 'P (polynomial time), NP (verifiable in polynomial time), and NP-Complete'],
    ['P vs NP Problem', 'The million-dollar open question: is verifying a solution as fast as finding one?'],
  ],
  why: [
    'Defines the absolute boundaries of what is mathematically possible with computers',
    'Prevents engineers from wasting years trying to solve provably unsolvable or intractable problems',
    'Directly inspires regular expressions, compiler lexers, and modern cryptographic security proofs',
  ],
  patterns: [
    'Reduction: proving a problem is hard by converting a known NP-hard problem into it',
    'State machine transitions: input events driving deterministic state transitions',
    'Recognizing intractable combinatorial explosion before writing code',
    'Approximation algorithms and heuristics for NP-hard real-world problems (TSP, Bin Packing)',
  ],
  examples: [
    'Regular expression matching engines using Non-deterministic Finite Automata (NFAs)',
    'RSA and Elliptic Curve cryptography depending on the hardness of integer factorization',
    'Traveling Salesperson Problem (TSP) heuristic solvers in logistics delivery routes',
    'Compiler syntax analyzers using Context-Free Grammars (Pushdown Automata)',
  ],
  pitfalls: [
    'Trying to write an algorithm that is guaranteed to find optimal solutions to NP-Complete problems in polynomial time',
    'Believing faster hardware will make exponential time O(2^n) algorithms feasible for large inputs',
    'Confusing regular expressions with full Turing-complete programming languages',
  ],
  py: `# Simple Deterministic Finite Automaton (DFA) recognizing binary numbers ending in '01'
def dfa_ends_with_01(binary_string):
    state = 'S0' # S0: start/other, S1: saw '0', S2: saw '01' (accepting)
    for bit in binary_string:
        if state == 'S0':
            state = 'S1' if bit == '0' else 'S0'
        elif state == 'S1':
            state = 'S2' if bit == '1' else 'S1'
        elif state == 'S2':
            state = 'S1' if bit == '0' else 'S0'
    return state == 'S2'

print("'101' ends with 01?", dfa_ends_with_01("101")) # True
print("'100' ends with 01?", dfa_ends_with_01("100")) # False`,
  related: ['dsa','languages-compilers','cybersecurity'],
},
];
