export const GROUPS = {
  linear:     { name: 'Linear',        color: '#3B6FE0' },
  hashing:    { name: 'Hashing',       color: '#E0703B' },
  trees:      { name: 'Trees & heaps', color: '#2E9E6A' },
  graphs:     { name: 'Graphs',        color: '#8A4FD8' },
  range:      { name: 'Range queries', color: '#D9447A' },
  algorithms: { name: 'Algorithms',    color: '#D97706' },
};

export const BRANCHES = [
  { key: 'ops',      name: 'Operations',        color: '#5B8DEF', leaf: '#BCD0F8' },
  { key: 'use',      name: 'Use it when',       color: '#34A77A', leaf: '#B7E2CD' },
  { key: 'patterns', name: 'Patterns',          color: '#9A6BE0', leaf: '#D8C8F4' },
  { key: 'problems', name: 'Practice problems', color: '#EE8A3C', leaf: '#F9D4B2' },
  { key: 'pitfalls', name: 'Pitfalls',          color: '#E05561', leaf: '#F5C3C8' },
];

export const LEVELS = { core: 'Must know', good: 'Good to know', adv: 'Advanced' };

export const ORDER = ['array','string','hash-map','hash-set','linked-list','stack','queue','deque',
  'binary-tree','bst','heap','grid','graph','trie','union-find','lru-cache','balanced-bst','segment-tree','fenwick-tree',
  'binary-search','divide-and-conquer','greedy','backtracking','dynamic-programming'];

export const DS = [
{
  id: 'array', name: 'Array', group: 'linear', level: 'core',
  one: 'A row of numbered boxes in one continuous block of memory. You can jump to any box by its index instantly.',
  ops: [['Access by index','O(1)'],['Search (unsorted)','O(n)'],['Search (sorted, binary search)','O(log n)'],['Append at end','O(1) amortized'],['Insert / delete in middle','O(n)'],['Remove last','O(1)']],
  use: ['You need fast access by position','Data is mostly appended, rarely inserted mid-way','You iterate a lot (cache-friendly)'],
  patterns: ['Two pointers','Sliding window','Prefix sums','Binary search','Sort first, then scan'],
  problems: ['Best Time to Buy and Sell Stock','Maximum Subarray','Product of Array Except Self','Merge Intervals','Container With Most Water','3Sum'],
  pitfalls: ['Off-by-one errors at the boundaries','Inserting at the front inside a loop is O(n²)','Changing a list while looping over it'],
  py: `nums = [3, 1, 4]
nums.append(1)       # O(1) amortized
nums[0]              # O(1)
nums.insert(0, 9)    # O(n): shifts everything right
nums.pop()           # O(1)`,
  related: ['string','hash-map','grid','stack','heap','fenwick-tree'],
},
{
  id: 'string', name: 'String', group: 'linear', level: 'core',
  one: 'An array of characters. In Python it is immutable, so every "change" actually builds a new string.',
  ops: [['Access a character','O(1)'],['Slice / substring','O(k)'],['Concatenate two strings','O(n + m)'],['Compare','O(n)'],['Build with "".join(parts)','O(total length)']],
  use: ['Processing text','Palindrome and anagram checks','Matching patterns in text'],
  patterns: ['Two pointers from both ends','Sliding window over characters','Character frequency counts','Collect pieces in a list, then join'],
  problems: ['Valid Anagram','Valid Palindrome','Longest Substring Without Repeating Characters','Group Anagrams','Longest Palindromic Substring','Minimum Window Substring'],
  pitfalls: ['s += c in a loop can become O(n²)','Forgetting upper/lower case and non-letters','Assuming ASCII when input may be Unicode'],
  py: `s = "racecar"
s[::-1] == s           # palindrome check
parts = []
for ch in s:
    parts.append(ch.upper())
"".join(parts)         # O(n), better than += in a loop`,
  related: ['array','hash-map','trie'],
},
{
  id: 'hash-map', name: 'Hash Map', group: 'hashing', level: 'core',
  one: 'Stores key → value pairs. A hash function turns each key into a slot number, so a lookup takes about the same time however big the map gets.',
  ops: [['Get / put / delete (average)','O(1)'],['Same, worst case (many collisions)','O(n)'],['Iterate everything','O(n)'],['Find smallest key','O(n): not ordered']],
  use: ['Counting things','Remembering what you have already seen','Looking up records by ID','Turning an O(n²) search into O(n)'],
  patterns: ['Frequency count','Complement lookup (Two Sum)','Group by a computed key','Prefix sum + map','Index of last occurrence'],
  problems: ['Two Sum','Group Anagrams','Top K Frequent Elements','Subarray Sum Equals K','Longest Consecutive Sequence','Contains Duplicate'],
  pitfalls: ['Keys must be hashable: use tuples, not lists','Changing an object after using it as a key','Relying on key order in languages that do not keep it'],
  py: `from collections import Counter
counts = Counter("banana")    # {'a': 3, 'n': 2, 'b': 1}

seen = {}                      # Two Sum
for i, x in enumerate(nums):
    if target - x in seen:
        return [seen[target - x], i]
    seen[x] = i`,
  related: ['hash-set','array','lru-cache','string','graph'],
},
{
  id: 'hash-set', name: 'Hash Set', group: 'hashing', level: 'core',
  one: 'A hash map with only keys. It answers one question very fast: "have I seen this before?"',
  ops: [['Add / remove / contains (average)','O(1)'],['Union / intersection','O(n + m)'],['Iterate','O(n)']],
  use: ['Removing duplicates','Tracking visited nodes in a search','Fast membership checks'],
  patterns: ['Deduplicate','Visited set','Set intersection','Only start counting at the start of a run'],
  problems: ['Contains Duplicate','Longest Consecutive Sequence','Happy Number','Intersection of Two Arrays','Valid Sudoku'],
  pitfalls: ['Sets have no order','Writing x in some_list (O(n)) when you meant a set (O(1))'],
  py: `seen = set()
for x in nums:
    if x in seen:
        return True      # duplicate found
    seen.add(x)
return False`,
  related: ['hash-map','graph'],
},
{
  id: 'linked-list', name: 'Linked List', group: 'linear', level: 'core',
  one: 'A chain of nodes. Each holds a value and a pointer to the next node. Easy to splice, slow to index.',
  ops: [['Access the k-th item','O(n)'],['Insert / delete at head','O(1)'],['Insert / delete after a known node','O(1)'],['Search','O(n)'],['Append (with a tail pointer)','O(1)']],
  use: ['Many insertions and removals in the middle','Building other structures (LRU cache, queues)','Pointer-manipulation problems'],
  patterns: ['Dummy head node','Fast and slow pointers','Reverse in place','Merge two sorted lists'],
  problems: ['Reverse Linked List','Linked List Cycle','Merge Two Sorted Lists','Remove Nth Node From End of List','Reorder List','Merge k Sorted Lists'],
  pitfalls: ['Losing the rest of the list when you re-point next','Not checking for None before node.next.next','Forgetting to return the new head'],
  py: `class Node:
    def __init__(self, val, next=None):
        self.val, self.next = val, next

def reverse(head):
    prev = None
    while head:
        head.next, prev, head = prev, head, head.next
    return prev`,
  related: ['stack','queue','deque','lru-cache'],
},
{
  id: 'stack', name: 'Stack', group: 'linear', level: 'core',
  one: 'Last in, first out, like a pile of plates. You only ever touch the top.',
  ops: [['Push','O(1)'],['Pop','O(1)'],['Peek at top','O(1)'],['Search','O(n)']],
  use: ['Undo / back button','Matching brackets','Evaluating expressions','Replacing recursion with a loop (DFS)'],
  patterns: ['Bracket matching','Monotonic stack (next greater element)','Iterative DFS','Min stack (track the min alongside)'],
  problems: ['Valid Parentheses','Min Stack','Daily Temperatures','Evaluate Reverse Polish Notation','Decode String','Largest Rectangle in Histogram'],
  pitfalls: ['Popping from an empty stack','Forgetting leftovers at the end (unmatched items)'],
  py: `pairs = {')': '(', ']': '[', '}': '{'}
stack = []
for ch in s:
    if ch in "([{":
        stack.append(ch)
    elif not stack or stack.pop() != pairs[ch]:
        return False
return not stack`,
  related: ['array','linked-list','queue','graph','binary-tree'],
},
{
  id: 'queue', name: 'Queue', group: 'linear', level: 'core',
  one: 'First in, first out, like a checkout line. Add at the back, serve from the front.',
  ops: [['Enqueue (append)','O(1)'],['Dequeue (popleft on deque)','O(1)'],['Peek at front','O(1)'],['list.pop(0): avoid','O(n)']],
  use: ['Breadth-first search','Processing tasks in arrival order','Visiting a tree level by level'],
  patterns: ['BFS','Level-order traversal','Multi-source BFS','Shortest path in an unweighted graph'],
  problems: ['Binary Tree Level Order Traversal','Rotting Oranges','Number of Islands','Implement Queue using Stacks','Open the Lock'],
  pitfalls: ['Using list.pop(0), which is O(n) each time','Marking visited when popping instead of when pushing (duplicates)'],
  py: `from collections import deque
q, seen = deque([start]), {start}
while q:
    node = q.popleft()
    for nb in graph[node]:
        if nb not in seen:
            seen.add(nb)
            q.append(nb)`,
  related: ['deque','stack','graph','binary-tree','grid'],
},
{
  id: 'deque', name: 'Deque', group: 'linear', level: 'good',
  one: 'A double-ended queue: add or remove at either end in O(1). A queue and a stack in one.',
  ops: [['Append / pop at either end','O(1)'],['Access by index in the middle','O(n)'],['Rotate by k','O(k)']],
  use: ['Sliding window maximum / minimum','You need both stack and queue behaviour','Checking from both ends at once'],
  patterns: ['Monotonic deque','0-1 BFS','Sliding window'],
  problems: ['Sliding Window Maximum','Design Circular Deque','Shortest Subarray with Sum at Least K','Jump Game VI'],
  pitfalls: ['Storing values instead of indices in a monotonic deque','Forgetting to evict items that fell out of the window'],
  py: `from collections import deque
dq, out = deque(), []        # indices, values decreasing
for i, x in enumerate(nums):
    while dq and nums[dq[-1]] <= x:
        dq.pop()
    dq.append(i)
    if dq[0] <= i - k:
        dq.popleft()
    if i >= k - 1:
        out.append(nums[dq[0]])`,
  related: ['queue','stack','linked-list'],
},
{
  id: 'binary-tree', name: 'Binary Tree', group: 'trees', level: 'core',
  one: 'Each node has up to two children. Most tree problems come down to: "what do I need back from my left and right subtrees?"',
  ops: [['Visit every node','O(n)'],['Search (no ordering)','O(n)'],['Height','O(n)'],['Recursion stack space','O(h)']],
  use: ['Hierarchies','Expression trees','As the base for BSTs and heaps'],
  patterns: ['DFS: pre-, in-, post-order','BFS: level order','Return info up from children','Pass state down (e.g. path sums)'],
  problems: ['Maximum Depth of Binary Tree','Invert Binary Tree','Same Tree','Diameter of Binary Tree','Lowest Common Ancestor of a Binary Tree','Binary Tree Maximum Path Sum'],
  pitfalls: ['Missing the base case (node is None)','Mixing up height and depth','Hitting the recursion limit on very skewed trees'],
  py: `def max_depth(node):
    if not node:
        return 0
    return 1 + max(max_depth(node.left),
                   max_depth(node.right))`,
  related: ['bst','heap','trie','queue','stack','graph'],
},
{
  id: 'bst', name: 'Binary Search Tree', group: 'trees', level: 'core',
  one: 'A binary tree where everything left < node < everything right. That ordering lets you throw away half the tree at every step, as long as it stays balanced.',
  ops: [['Search / insert / delete (balanced)','O(log n)'],['Same, worst case (skewed)','O(n)'],['In-order traversal (gives sorted order)','O(n)'],['Min / max','O(h)']],
  use: ['Keeping data sorted while inserting','Range queries','Finding the nearest smaller / larger value'],
  patterns: ['In-order traversal = sorted order','Validate with min/max bounds','Walk left or right by comparing'],
  problems: ['Validate Binary Search Tree','Kth Smallest Element in a BST','Lowest Common Ancestor of a BST','Insert into a Binary Search Tree','Convert Sorted Array to Binary Search Tree'],
  pitfalls: ['Only checking parent vs child, not the whole allowed range','Inserting already-sorted data makes a linked list (O(n))'],
  py: `def valid(node, lo=float('-inf'), hi=float('inf')):
    if not node:
        return True
    if not lo < node.val < hi:
        return False
    return (valid(node.left, lo, node.val) and
            valid(node.right, node.val, hi))`,
  related: ['binary-tree','balanced-bst','heap'],
},
{
  id: 'balanced-bst', name: 'Balanced BST', group: 'trees', level: 'adv',
  one: 'A BST that re-balances itself (AVL, red-black) so its height stays O(log n). You rarely write one; you use one from a library.',
  ops: [['Search / insert / delete (guaranteed)','O(log n)'],['Ordered iteration','O(n)'],['Floor / ceiling lookup','O(log n)']],
  use: ['You need a sorted map or set (Java TreeMap, C++ std::map)','Sliding window that needs order (median, k-th)','Checking for overlapping bookings'],
  patterns: ['Python: sortedcontainers.SortedList','Rotations keep the height small (know the idea)'],
  problems: ['My Calendar I','Contains Duplicate III','Sliding Window Median','Count of Smaller Numbers After Self'],
  pitfalls: ['Python has no built-in one','Rarely needed to code rotations from scratch'],
  py: `from sortedcontainers import SortedList
sl = SortedList([5, 1, 3])
sl.add(2)              # O(log n)
sl.bisect_left(3)      # index of first item >= 3
sl[0], sl[-1]          # min, max`,
  related: ['bst','heap','segment-tree'],
},
{
  id: 'heap', name: 'Heap / Priority Queue', group: 'trees', level: 'core',
  one: 'A tree, stored in an array, where every parent is smaller than its children. The smallest item is always on top.',
  ops: [['Peek at min','O(1)'],['Push','O(log n)'],['Pop min','O(log n)'],['Build from a list (heapify)','O(n)'],['Find an arbitrary item','O(n)']],
  use: ['You keep needing the next smallest / largest','Top K problems','Scheduling','Dijkstra shortest paths'],
  patterns: ['Top K with a heap of size K','Merge K sorted lists','Two heaps for a running median','Max-heap by negating values'],
  problems: ['Kth Largest Element in an Array','Top K Frequent Elements','Merge k Sorted Lists','Find Median from Data Stream','K Closest Points to Origin','Task Scheduler'],
  pitfalls: ['Python heapq is a min-heap only','A heap is not sorted: only the top is guaranteed','Tuples are compared item by item, so ties look at the next field'],
  py: `import heapq
h = []
for x in nums:
    heapq.heappush(h, x)
    if len(h) > k:
        heapq.heappop(h)   # drop the smallest
return h[0]                # k-th largest`,
  related: ['array','binary-tree','graph','balanced-bst'],
},
{
  id: 'grid', name: 'Grid / Matrix', group: 'graphs', level: 'core',
  one: 'A 2D array. Treat each cell as a graph node with up to 4 neighbours and most grid problems turn into BFS or DFS.',
  ops: [['Access a cell','O(1)'],['Visit every cell','O(rows × cols)'],['List a cell\'s neighbours','O(1)']],
  use: ['Maps, boards, images','Dynamic programming tables','Flood fill'],
  patterns: ['Directions array','Flood fill with DFS / BFS','Multi-source BFS','DP across rows and columns'],
  problems: ['Number of Islands','Rotting Oranges','Set Matrix Zeroes','Spiral Matrix','Word Search','Unique Paths'],
  pitfalls: ['Mixing up rows and columns','Indexing before checking bounds','[[0]*n]*m makes every row the same list'],
  py: `grid = [[0] * cols for _ in range(rows)]  # not [[0]*cols]*rows
for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
    r2, c2 = r + dr, c + dc
    if 0 <= r2 < rows and 0 <= c2 < cols:
        ...`,
  related: ['array','graph','queue'],
},
{
  id: 'graph', name: 'Graph', group: 'graphs', level: 'core',
  one: 'Things (nodes) and connections (edges). Maps, networks, dependencies, grids: many problems are graphs in disguise.',
  ops: [['BFS / DFS','O(V + E)'],['Adjacency list space','O(V + E)'],['Adjacency matrix space','O(V²)'],['Is there an edge? (matrix)','O(1)'],['Dijkstra with a heap','O((V + E) log V)']],
  use: ['Networks and routes','Dependencies and ordering','Finding connected regions','Shortest paths'],
  patterns: ['BFS for shortest path (unweighted)','DFS for connectivity','Topological sort','Dijkstra (weighted)','Cycle detection'],
  problems: ['Number of Islands','Clone Graph','Course Schedule','Pacific Atlantic Water Flow','Network Delay Time','Word Ladder'],
  pitfalls: ['No visited set means infinite loops','Treating directed edges as undirected (or the reverse)','Disconnected parts: loop over every node'],
  py: `from collections import defaultdict
g = defaultdict(list)
for a, b in edges:
    g[a].append(b)
    g[b].append(a)

def dfs(u, seen):
    seen.add(u)
    for v in g[u]:
        if v not in seen:
            dfs(v, seen)`,
  related: ['hash-map','queue','stack','heap','union-find','grid','binary-tree'],
},
{
  id: 'trie', name: 'Trie', group: 'trees', level: 'good',
  one: 'A tree of characters. Each path from the root spells a prefix, so words that start the same share nodes.',
  ops: [['Insert a word of length L','O(L)'],['Search a word','O(L)'],['Check a prefix','O(L)'],['Space','O(total characters)']],
  use: ['Autocomplete','Prefix search','Word games on a board','Spell checking'],
  patterns: ['Node = dict of children + end flag','Trie + DFS on a board','Count words through each prefix'],
  problems: ['Implement Trie (Prefix Tree)','Design Add and Search Words Data Structure','Word Search II','Replace Words','Longest Common Prefix'],
  pitfalls: ['Forgetting the end-of-word marker','High memory use with many words'],
  py: `class Trie:
    def __init__(self):
        self.root = {}
    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node['$'] = True     # end of word`,
  related: ['binary-tree','string','hash-map'],
},
{
  id: 'union-find', name: 'Union-Find', group: 'graphs', level: 'good',
  one: 'Tracks which items belong to the same group. Two moves: find (which group is this in?) and union (merge two groups).',
  ops: [['Find (with optimisations)','O(α(n)) ≈ O(1)'],['Union (with optimisations)','O(α(n)) ≈ O(1)'],['Without optimisations','O(n)']],
  use: ['Counting connected components','Detecting a cycle in an undirected graph','Kruskal minimum spanning tree','Merging accounts or equal items'],
  patterns: ['Path compression','Union by rank / size','Count components as unions succeed'],
  problems: ['Number of Connected Components in an Undirected Graph','Redundant Connection','Accounts Merge','Graph Valid Tree','Number of Provinces'],
  pitfalls: ['Skipping path compression','Comparing the items instead of their roots'],
  py: `parent = list(range(n))
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]   # path compression
        x = parent[x]
    return x
def union(a, b):
    ra, rb = find(a), find(b)
    if ra == rb:
        return False                    # already joined
    parent[ra] = rb
    return True`,
  related: ['graph','array'],
},
{
  id: 'lru-cache', name: 'LRU Cache', group: 'hashing', level: 'good',
  one: 'A hash map plus a doubly linked list. The map finds items in O(1); the list remembers which item was used least recently.',
  ops: [['Get','O(1)'],['Put','O(1)'],['Evict least recently used','O(1)']],
  use: ['Caching with limited memory','The classic "design a data structure" system problem'],
  patterns: ['Combine two structures to get O(1) everything','Move to front on every access','OrderedDict shortcut in Python'],
  problems: ['LRU Cache','LFU Cache','Design Browser History'],
  pitfalls: ['Forgetting to update recency on get','Not removing the evicted key from the map'],
  py: `from collections import OrderedDict
class LRUCache:
    def __init__(self, cap):
        self.cap, self.d = cap, OrderedDict()
    def get(self, k):
        if k not in self.d:
            return -1
        self.d.move_to_end(k)
        return self.d[k]
    def put(self, k, v):
        self.d[k] = v
        self.d.move_to_end(k)
        if len(self.d) > self.cap:
            self.d.popitem(last=False)`,
  related: ['hash-map','linked-list'],
},
{
  id: 'segment-tree', name: 'Segment Tree', group: 'range', level: 'adv',
  one: 'A tree over an array where each node stores a summary (sum, min, max) of a range. It answers range questions while values keep changing.',
  ops: [['Build','O(n)'],['Range query','O(log n)'],['Point update','O(log n)'],['Range update (lazy propagation)','O(log n)']],
  use: ['Range sum / min / max with updates','Counting values in a range','Interval problems'],
  patterns: ['Array-backed tree (size 2n or 4n)','Lazy propagation','Coordinate compression'],
  problems: ['Range Sum Query - Mutable','Count of Smaller Numbers After Self','My Calendar III','Falling Squares'],
  pitfalls: ['Off-by-one in range bounds','Overkill when nothing changes: use prefix sums'],
  py: `t = [0] * n + nums           # leaves at t[n:]
for i in range(n - 1, 0, -1):
    t[i] = t[2 * i] + t[2 * i + 1]

def update(i, v):
    i += n
    t[i] = v
    while i > 1:
        i //= 2
        t[i] = t[2 * i] + t[2 * i + 1]`,
  related: ['fenwick-tree','array','balanced-bst'],
},
{
  id: 'fenwick-tree', name: 'Fenwick Tree', group: 'range', level: 'adv',
  one: 'A compact array trick for prefix sums that can change. Less flexible than a segment tree, but far less code.',
  ops: [['Prefix sum','O(log n)'],['Point update','O(log n)'],['Range sum (two prefixes)','O(log n)'],['Space','O(n)']],
  use: ['Running counts with updates','Counting inversions','Rank queries over small value ranges'],
  patterns: ['i & -i gives the lowest set bit','1-indexed array','sum(l..r) = prefix(r) − prefix(l − 1)'],
  problems: ['Range Sum Query - Mutable','Count of Smaller Numbers After Self','Reverse Pairs','Create Sorted Array through Instructions'],
  pitfalls: ['Mixing 0-indexed and 1-indexed','Only works for reversible operations like sum'],
  py: `tree = [0] * (n + 1)
def add(i, delta):          # i is 1-indexed
    while i <= n:
        tree[i] += delta
        i += i & -i
def prefix(i):
    s = 0
    while i > 0:
        s += tree[i]
        i -= i & -i
    return s`,
  related: ['segment-tree','array'],
},
{
  id: 'binary-search', name: 'Binary Search', group: 'algorithms', level: 'core',
  one: 'Repeatedly halving a search space by testing the midpoint against a monotonic condition to find a target or threshold in O(log n) time.',
  ops: [['Find exact match','O(log n)'],['Find lower / upper bound','O(log n)'],['Search answer space','O(log(range) · check)'],['Space complexity','O(1)']],
  use: ['Searching a sorted array or monotonic list','Finding the boundary where a condition flips (first bad version)','Optimization over an answer space (min capacity, max speed)'],
  patterns: ['Classic two pointers: left <= right','Bisect left / right index boundary','Search on monotonic answer space: check(mid)','Rotated sorted array: find the sorted half first'],
  problems: ['Binary Search','Search in Rotated Sorted Array','Find First and Last Position of Element','Koko Eating Bananas','Capacity To Ship Packages Within D Days','Median of Two Sorted Arrays'],
  pitfalls: ['Off-by-one errors with mid vs mid ± 1','Integer overflow in static languages (use left + (right - left) // 2)','Infinite loop when the boundary never shrinks'],
  py: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
  related: ['array','bst','divide-and-conquer'],
},
{
  id: 'divide-and-conquer', name: 'Divide and Conquer', group: 'algorithms', level: 'good',
  one: 'Breaking a problem into independent subproblems of the same type, solving each recursively, and combining their results to solve the original problem.',
  ops: [['Divide step','O(1)'],['Combine step (Merge Sort)','O(n)'],['Total (Merge Sort)','O(n log n)'],['Total (Binary Search)','O(log n)'],['Recursion stack space','O(log n)']],
  use: ['Sorting large collections efficiently (Merge Sort, Quick Sort)','Tree traversals and divide-and-combine tree problems','Fast arithmetic (exponentiation, matrix multiplication, Closest Pair)'],
  patterns: ['Divide into independent subproblems (left and right halves)','Combine / merge step does the heavy lifting','Base cases for trivial inputs (size 0 or 1)','Master Theorem for recurrence analysis'],
  problems: ['Sort an Array','Kth Largest Element in an Array','Merge k Sorted Lists','Maximum Subarray','Pow(x, n)','Construct Binary Tree from Preorder and Inorder'],
  pitfalls: ['Redundant recomputation of overlapping subproblems (use DP instead)','Inefficient combine step negating recursive speedup','Worst-case deep recursion stack overflow (e.g. naive Quick Sort)'],
  py: `def merge_sort(nums):
    if len(nums) <= 1:
        return nums
    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])
    merged, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:] or right[j:])
    return merged`,
  related: ['binary-search','binary-tree','dynamic-programming'],
},
{
  id: 'greedy', name: 'Greedy', group: 'algorithms', level: 'core',
  one: 'Making the locally optimal choice at each step with the expectation of finding a global optimum, without ever rethinking past decisions.',
  ops: [['Single greedy choice','O(1)'],['Sort input (often needed)','O(n log n)'],['Heap-driven greedy choice','O(log n)'],['Overall pass','O(n) or O(n log n)']],
  use: ['Interval scheduling and resource allocation','Shortest path (Dijkstra) and Minimum Spanning Tree (Kruskal, Prim)','Data compression (Huffman coding) and fractional knapsack'],
  patterns: ['Sort by end time or deadline first','Priority queue / min-heap for dynamic minimum choices','Two pointers greedy pairing','Exchange argument to prove greedy choice property'],
  problems: ['Jump Game','Gas Station','Non-overlapping Intervals','Task Scheduler','Assign Cookies','Candy'],
  pitfalls: ['Assuming greedy works when current choices constrain future options (requires DP)','Sorting by start time instead of end time in interval scheduling','Overlooking tie-breaking edge cases'],
  py: `def eraseOverlapIntervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count, last_end = 0, float('-inf')
    for start, end in intervals:
        if start >= last_end:
            last_end = end
        else:
            count += 1
    return count`,
  related: ['dynamic-programming','heap','array'],
},
{
  id: 'backtracking', name: 'Backtracking', group: 'algorithms', level: 'good',
  one: 'Building candidate solutions step-by-step and abandoning ("backtracking") a candidate as soon as it is clear it cannot produce a valid solution.',
  ops: [['Choose candidate','O(1)'],['Validate constraints','O(1)'],['Unchoose / backtrack','O(1)'],['Search space','O(k^n) or O(n!)']],
  use: ['Generating permutations, combinations, and power sets','Constraint satisfaction puzzles (Sudoku, N-Queens, Word Search)','Finding paths in a grid or graph with obstacle constraints'],
  patterns: ['Template: choose -> recurse -> unchoose','Pruning branches early to cut off exponential dead-ends','Handling duplicates with sorting + adjacent element check','State passing via path list or bitmask'],
  problems: ['Subsets','Permutations','Combination Sum','N-Queens','Word Search','Sudoku Solver'],
  pitfalls: ['Forgetting to undo state changes (unchoose) before returning','Passing mutable state without copying when recording solutions','Not pruning early enough, causing time limit exceeded (TLE)'],
  py: `def subsets(nums):
    res, path = [], []
    def dfs(start):
        res.append(list(path))
        for i in range(start, len(nums)):
            path.append(nums[i])
            dfs(i + 1)
            path.pop()  # backtrack
    dfs(0)
    return res`,
  related: ['dynamic-programming','graph','binary-tree'],
},
{
  id: 'dynamic-programming', name: 'Dynamic Programming', group: 'algorithms', level: 'core',
  one: 'Breaking complex optimization problems into overlapping subproblems, solving each once, and storing results in a table to avoid redundant work.',
  ops: [['State lookup / cache hit','O(1)'],['Compute single state','O(transitions)'],['Fill 1D table','O(n)'],['Fill 2D table','O(n · m)'],['State compression space','O(n) or O(1)']],
  use: ['Overlapping subproblems and optimal substructure','Min/max optimization, path counting, and feasibility checks','Greedy fails because earlier decisions affect future choices'],
  patterns: ['Memoization (top-down recursion with cache)','Tabulation (bottom-up iteration)','Space optimization (rolling array, keep only last row)','0/1 Knapsack & Unbounded Knapsack','Longest Common Subsequence & Longest Increasing Subsequence'],
  problems: ['Climbing Stairs','Coin Change','Longest Increasing Subsequence','0/1 Knapsack','Word Break','Edit Distance'],
  pitfalls: ['Missing base cases or array offset errors','Using DP when a simpler greedy or two-pointer approach suffices','Unbounded memory when state space is unnecessarily large'],
  py: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a >= c:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != float('inf') else -1`,
  related: ['greedy','backtracking','array','grid'],
},
];
