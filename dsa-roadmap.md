# Data Structures & Algorithms Learning Roadmap for Beginners

## Overview
This roadmap is designed for beginners who want to master Data Structures and Algorithms (DSA) from scratch. Whether you're preparing for coding interviews, competitive programming, or want to become a better programmer, this guide will take you from zero to confident in 4-6 months with consistent practice.

## What is DSA and Why Should You Learn It?

### What is DSA?

**Data Structures**: Ways to organize and store data efficiently
- Think of them as containers with different rules
- Examples: Arrays (like a row of boxes), Trees (like a family tree), Graphs (like a map of cities)

**Algorithms**: Step-by-step instructions to solve problems
- Think of them as recipes
- Examples: Sorting (arranging items in order), Searching (finding specific items), Pathfinding (GPS navigation)

### Why Learn DSA?

1. **Job Interviews**: FAANG and most tech companies test DSA heavily
2. **Better Programmer**: Write efficient, optimized code
3. **Problem Solving**: Develop logical thinking skills
4. **Performance**: Make your applications faster and use less memory
5. **Foundation**: Essential for computer science understanding

### The Hard Truth:
DSA is **challenging** but **learnable**. Most people struggle initially - that's normal! With consistent practice, it clicks.

## Prerequisites

### Required:
- **Basic programming** in any language (variables, loops, functions, arrays)
- **Choose ONE language** to practice DSA:
  - **Python**: Easiest syntax, great for interviews
  - **JavaScript**: If you're a web developer
  - **Java/C++**: Traditional interview languages
  - **Go**: Clean and efficient

### Recommended:
Complete at least one of these first:
- Python Backend Roadmap (Phases 1-2)
- Go Backend Roadmap (Phases 1-2)
- Node.js Backend Roadmap (Phases 1-2)

If you're **brand new to programming**, spend 3-4 weeks learning basic programming FIRST, then return to DSA.

## Phase 0: Foundation & Mindset (Week 1)

### Understanding Complexity

#### Time Complexity (How fast?)
Measures how many operations an algorithm performs.

**Common Complexities** (from fastest to slowest):
- **O(1)** - Constant: Same time regardless of input size
  - Example: Accessing array element `arr[5]`
- **O(log n)** - Logarithmic: Divides problem in half each time
  - Example: Binary search
- **O(n)** - Linear: Loops through all elements once
  - Example: Finding max in array
- **O(n log n)** - Efficient sorting
  - Example: Merge sort, Quick sort
- **O(n²)** - Quadratic: Nested loops
  - Example: Bubble sort (slow!)
- **O(2ⁿ)** - Exponential: Very slow, avoid!
  - Example: Recursive Fibonacci (naive version)

**Simple Rule**:
- n = 1,000 elements
- O(n) = 1,000 operations ✅ Fast
- O(n²) = 1,000,000 operations ❌ Slow

#### Space Complexity (How much memory?)
Measures how much extra memory an algorithm uses.

**Example**:
```python
# O(1) space - only uses a few variables
def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val

# O(n) space - creates new array of same size
def double_array(arr):
    result = []
    for num in arr:
        result.append(num * 2)
    return result
```

### Key Resources to Bookmark:
1. **[Big-O Cheat Sheet](https://www.bigocheatsheet.com/)**: Visual complexity reference
2. **[VisuAlgo](https://visualgo.net/)**: Animated algorithm visualizations
3. **[LeetCode](https://leetcode.com/)**: Interview practice platform
4. **[NeetCode](https://neetcode.io/)**: Structured problem lists

### Week 1 Goals:
- ✅ Understand what O(1), O(n), O(n²) mean
- ✅ Analyze simple code for time complexity
- ✅ Set up LeetCode account
- ✅ Solve 2-3 "Easy" array problems

## Phase 1: Basic Data Structures (Weeks 2-5)

### Week 2: Arrays & Strings

#### What Are They?

**Arrays**: Collection of elements stored in contiguous memory
```python
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]
```

**Strings**: Sequence of characters (like an array of letters)
```python
text = "Hello World"
```

#### Core Operations:
- **Access**: `arr[index]` - O(1)
- **Search**: Find element - O(n)
- **Insert**: Add element - O(n) for arrays, O(1) for dynamic arrays at end
- **Delete**: Remove element - O(n)

#### Essential Techniques:

**1. Two Pointers**
Use two indices to traverse array efficiently.
```python
# Reverse array
def reverse(arr):
    left = 0
    right = len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
```

**2. Sliding Window**
Maintain a "window" that slides across array.
```python
# Find max sum of k consecutive elements
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum
```

**3. Prefix Sum**
Pre-compute cumulative sums for fast range queries.

#### Practice Problems (LeetCode):
- **Easy**: Two Sum (1), Best Time to Buy Stock (121), Contains Duplicate (217)
- **Medium**: Product of Array Except Self (238), 3Sum (15)

#### Real-World Uses:
- Image pixels (2D arrays)
- Text processing (strings)
- Database records (array of objects)

### Week 3: Hash Tables (Maps/Dictionaries)

#### What Are They?
Fast lookups using key-value pairs. Think of a dictionary - you look up a word (key) to get its definition (value).

```python
# Python
phonebook = {
    "Alice": "123-456",
    "Bob": "789-012"
}

# JavaScript
const phonebook = new Map();
phonebook.set("Alice", "123-456");
```

#### Core Operations:
- **Insert**: `map[key] = value` - O(1) average
- **Search**: `map[key]` - O(1) average
- **Delete**: `del map[key]` - O(1) average

#### When to Use Hash Tables:
- ✅ Need fast lookups by key
- ✅ Counting frequencies
- ✅ Checking if element exists
- ✅ Grouping data

#### Common Patterns:

**1. Frequency Counter**
```python
def char_frequency(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    return freq
```

**2. Two Sum Pattern**
```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

#### Practice Problems:
- **Easy**: Two Sum (1), Valid Anagram (242), First Unique Character (387)
- **Medium**: Group Anagrams (49), Top K Frequent Elements (347)

#### Real-World Uses:
- Caching (storing computed results)
- Database indexing
- Spell checkers
- DNS lookups

### Week 4: Linked Lists

#### What Are They?
Chain of nodes where each node contains data and a reference to the next node.

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Create linked list: 1 -> 2 -> 3
head = Node(1)
head.next = Node(2)
head.next.next = Node(3)
```

#### Types:
1. **Singly Linked List**: Each node points to next
2. **Doubly Linked List**: Each node points to next AND previous
3. **Circular Linked List**: Last node points back to first

#### Core Operations:
- **Access**: O(n) - must traverse from head
- **Search**: O(n)
- **Insert at beginning**: O(1)
- **Insert at end**: O(n) or O(1) with tail pointer
- **Delete**: O(n)

#### Why Use Linked Lists?
- ✅ Dynamic size (grows/shrinks easily)
- ✅ Efficient insertions/deletions at beginning
- ❌ No random access (must traverse)
- ❌ More memory (stores pointers)

#### Essential Techniques:

**1. Two Pointers (Fast & Slow)**
```python
# Detect cycle in linked list
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

**2. Reverse Linked List**
```python
def reverse(head):
    prev = None
    current = head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    return prev
```

#### Practice Problems:
- **Easy**: Reverse Linked List (206), Merge Two Sorted Lists (21)
- **Medium**: Add Two Numbers (2), Remove Nth Node (19), Linked List Cycle II (142)

#### Real-World Uses:
- Browser history (back/forward buttons)
- Music playlists
- Undo functionality
- Memory management

### Week 5: Stacks & Queues

#### Stack (LIFO - Last In, First Out)
Like a stack of plates - add on top, remove from top.

```python
# Using list as stack
stack = []
stack.append(1)  # Push
stack.append(2)
top = stack.pop()  # Pop - returns 2
```

**Operations**: Push O(1), Pop O(1), Peek O(1)

**When to Use**:
- ✅ Undo/Redo functionality
- ✅ Function call stack
- ✅ Expression evaluation
- ✅ Backtracking problems

#### Queue (FIFO - First In, First Out)
Like a line at a store - first person in line is served first.

```python
from collections import deque

queue = deque()
queue.append(1)      # Enqueue
queue.append(2)
first = queue.popleft()  # Dequeue - returns 1
```

**Operations**: Enqueue O(1), Dequeue O(1)

**When to Use**:
- ✅ Breadth-First Search (BFS)
- ✅ Task scheduling
- ✅ Print queue
- ✅ Request handling

#### Common Patterns:

**1. Valid Parentheses (Stack)**
```python
def valid_parentheses(s):
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:
            stack.append(char)
        elif not stack or pairs[stack.pop()] != char:
            return False

    return len(stack) == 0
```

**2. Monotonic Stack**
Stack that maintains elements in increasing or decreasing order.

#### Practice Problems:
- **Easy**: Valid Parentheses (20), Min Stack (155)
- **Medium**: Daily Temperatures (739), Evaluate Reverse Polish Notation (150)

#### Real-World Uses:
- **Stacks**: Browser history, text editor undo
- **Queues**: Print spooling, CPU scheduling, message queues

## Phase 2: Intermediate Data Structures (Weeks 6-9)

### Week 6-7: Trees

#### What Are Trees?
Hierarchical data structure with a root and branches. Like a family tree or company org chart.

```
        1
       / \
      2   3
     / \
    4   5
```

#### Binary Tree
Each node has at most 2 children (left and right).

```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
```

#### Types of Binary Trees:

1. **Binary Search Tree (BST)**
   - Left child < parent < right child
   - Enables fast search O(log n) average

2. **Balanced Trees** (AVL, Red-Black)
   - Height-balanced for guaranteed O(log n)

3. **Complete Binary Tree**
   - All levels filled except possibly last

#### Tree Traversals:

**1. Depth-First Search (DFS)**

```python
# Inorder (Left -> Root -> Right)
def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val)
    inorder(root.right)

# Preorder (Root -> Left -> Right)
def preorder(root):
    if not root:
        return
    print(root.val)
    preorder(root.left)
    preorder(root.right)

# Postorder (Left -> Right -> Root)
def postorder(root):
    if not root:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.val)
```

**2. Breadth-First Search (BFS) / Level Order**

```python
from collections import deque

def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result
```

#### Practice Problems:
- **Easy**: Max Depth (104), Same Tree (100), Invert Binary Tree (226)
- **Medium**: Validate BST (98), Level Order Traversal (102), Lowest Common Ancestor (236)

### Week 8: Heaps (Priority Queues)

#### What Are Heaps?
Special tree where parent is always greater (max heap) or smaller (min heap) than children.

**Use Case**: Always get the min/max element quickly.

```python
import heapq

# Min heap in Python
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)

min_val = heapq.heappop(heap)  # Returns 1
```

#### Operations:
- **Insert**: O(log n)
- **Get Min/Max**: O(1)
- **Remove Min/Max**: O(log n)

#### When to Use Heaps:
- ✅ Find kth largest/smallest element
- ✅ Merge k sorted lists
- ✅ Task scheduling by priority
- ✅ Dijkstra's algorithm (shortest path)

#### Common Patterns:

**1. Top K Elements**
```python
def top_k_frequent(nums, k):
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1

    # Create heap of (frequency, number) tuples
    return heapq.nlargest(k, freq.keys(), key=freq.get)
```

#### Practice Problems:
- **Easy**: Kth Largest Element in Stream (703)
- **Medium**: Top K Frequent Elements (347), Kth Largest Element (215)
- **Hard**: Merge K Sorted Lists (23)

### Week 9: Graphs

#### What Are Graphs?
Network of nodes (vertices) connected by edges. Like social networks, maps, or web pages.

```
    A --- B
    |     |
    C --- D
```

#### Representations:

**1. Adjacency List** (Most common)
```python
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}
```

**2. Adjacency Matrix**
```python
# graph[i][j] = 1 if edge exists, 0 otherwise
graph = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
]
```

#### Graph Traversals:

**1. Depth-First Search (DFS)**
```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()

    visited.add(start)
    print(start)

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
```

**2. Breadth-First Search (BFS)**
```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])

    while queue:
        node = queue.popleft()
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

#### Practice Problems:
- **Easy**: Find if Path Exists (1971)
- **Medium**: Number of Islands (200), Clone Graph (133), Course Schedule (207)
- **Hard**: Word Ladder (127)

#### Real-World Uses:
- Social networks (friends connections)
- GPS navigation (road networks)
- Web crawlers (webpage links)
- Recommendation systems

## Phase 3: Core Algorithms (Weeks 10-13)

### Week 10: Sorting Algorithms

#### Why Learn Sorting?
Understanding sorting algorithms teaches:
- Algorithm design
- Time/space complexity trade-offs
- Recursion and divide-and-conquer

#### Common Sorting Algorithms:

**1. Bubble Sort** - O(n²)
Simple but slow. Keep swapping adjacent elements.
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

**2. Merge Sort** - O(n log n)
Divide array in half, sort each half, merge them.
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

**3. Quick Sort** - O(n log n) average
Pick pivot, partition around it, recursively sort.

**4. Heap Sort** - O(n log n)
Build heap, repeatedly extract max/min.

#### Which to Use?
- **Practice/Learning**: Merge Sort, Quick Sort
- **Production**: Use built-in sort (`sorted()` in Python)
- **Interviews**: Know how they work, don't implement from scratch

#### Practice Problems:
- **Easy**: Merge Sorted Array (88)
- **Medium**: Sort Colors (75), Sort List (148)

### Week 11: Searching Algorithms

#### Linear Search - O(n)
Check every element one by one.
```python
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1
```

#### Binary Search - O(log n)
**Most important search algorithm!** Only works on sorted arrays.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
```

**Key Insight**: Eliminate half the search space each time!

#### Binary Search Variations:

1. **Find first/last occurrence**
2. **Find insertion position**
3. **Search in rotated array**
4. **Search in 2D matrix**

#### Practice Problems:
- **Easy**: Binary Search (704), First Bad Version (278)
- **Medium**: Search in Rotated Array (33), Find Peak Element (162)
- **Hard**: Median of Two Sorted Arrays (4)

### Week 12-13: Recursion & Backtracking

#### Recursion
Function calling itself. Must have:
1. **Base case**: When to stop
2. **Recursive case**: Problem broken into smaller version

```python
# Factorial
def factorial(n):
    if n <= 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

# Fibonacci
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

#### Backtracking
Try all possibilities, backtrack when path doesn't work.

**Template**:
```python
def backtrack(path, choices):
    if is_goal(path):
        result.append(path.copy())
        return

    for choice in choices:
        # Make choice
        path.append(choice)

        # Explore
        backtrack(path, new_choices)

        # Undo choice (backtrack)
        path.pop()
```

#### Common Patterns:

**1. Generate All Combinations**
```python
def combinations(nums, k):
    result = []

    def backtrack(start, path):
        if len(path) == k:
            result.append(path[:])
            return

        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return result
```

**2. Permutations**
```python
def permute(nums):
    result = []

    def backtrack(path):
        if len(path) == len(nums):
            result.append(path[:])
            return

        for num in nums:
            if num not in path:
                path.append(num)
                backtrack(path)
                path.pop()

    backtrack([])
    return result
```

#### Practice Problems:
- **Easy**: Fibonacci Number (509), Climbing Stairs (70)
- **Medium**: Permutations (46), Combinations (77), Subsets (78)
- **Hard**: N-Queens (51), Word Search II (212)

## Phase 4: Advanced Algorithms (Weeks 14-18)

### Week 14-15: Dynamic Programming (DP)

#### What is DP?
Optimization technique that breaks problems into overlapping subproblems, stores results to avoid recomputation.

**When to Use DP**:
- Problem has optimal substructure
- Overlapping subproblems
- Can be solved recursively with memoization

#### DP Approaches:

**1. Top-Down (Memoization)**
Recursive with caching.
```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]
```

**2. Bottom-Up (Tabulation)**
Build solution iteratively from smallest subproblems.
```python
def fib_dp(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]
```

#### Common DP Patterns:

**1. 1D DP** (Climbing Stairs, House Robber)
```python
# Climbing stairs - ways to reach step n
def climb_stairs(n):
    if n <= 2:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2

    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]
```

**2. 2D DP** (Longest Common Subsequence, Edit Distance)
```python
# Longest common subsequence
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]
```

**3. Knapsack Problems**
```python
# 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                )
            else:
                dp[i][w] = dp[i - 1][w]

    return dp[n][capacity]
```

#### DP Problem-Solving Steps:
1. Identify if DP is applicable (optimal substructure, overlapping subproblems)
2. Define state (what do we need to track?)
3. Write recurrence relation
4. Implement with memoization or tabulation
5. Optimize space if possible

#### Practice Problems:
- **Easy**: Climbing Stairs (70), Min Cost Climbing Stairs (746)
- **Medium**: Coin Change (322), Longest Increasing Subsequence (300), Unique Paths (62)
- **Hard**: Edit Distance (72), Regular Expression Matching (10)

### Week 16: Greedy Algorithms

#### What is Greedy?
Make locally optimal choice at each step, hoping to find global optimum.

**When to Use**:
- Problem exhibits greedy choice property
- Optimal substructure

**Warning**: Greedy doesn't always work! Verify if greedy solution is optimal.

#### Common Patterns:

**1. Interval Problems**
```python
# Meeting rooms - can attend all meetings?
def can_attend_meetings(intervals):
    intervals.sort(key=lambda x: x[0])

    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False

    return True
```

**2. Maximize/Minimize Problems**
```python
# Jump game - can reach end?
def can_jump(nums):
    max_reach = 0

    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])

    return True
```

#### Practice Problems:
- **Easy**: Best Time to Buy Stock (121), Assign Cookies (455)
- **Medium**: Jump Game (55), Gas Station (134), Task Scheduler (621)

### Week 17-18: Graph Algorithms

#### Advanced Graph Concepts:

**1. Shortest Path - Dijkstra's Algorithm**
Find shortest path from source to all nodes (weighted graph, non-negative weights).

```python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        curr_dist, curr_node = heapq.heappop(pq)

        if curr_dist > distances[curr_node]:
            continue

        for neighbor, weight in graph[curr_node]:
            distance = curr_dist + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances
```

**2. Minimum Spanning Tree - Kruskal's/Prim's**

**3. Topological Sort**
Linear ordering of vertices (for DAGs - Directed Acyclic Graphs).
```python
def topological_sort(graph):
    in_degree = {node: 0 for node in graph}

    for node in graph:
        for neighbor in graph[node]:
            in_degree[neighbor] += 1

    queue = deque([node for node in in_degree if in_degree[node] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return result if len(result) == len(graph) else []
```

**4. Union-Find (Disjoint Set)**
Efficiently track connected components.
```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)

        if px == py:
            return False

        # Union by rank
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

        return True
```

#### Practice Problems:
- **Medium**: Network Delay Time (743), Course Schedule (207)
- **Hard**: Cheapest Flights Within K Stops (787)

## Phase 5: Problem-Solving Mastery (Weeks 19-24)

### Week 19-20: Pattern Recognition

#### Learn to Identify Patterns:

**1. Two Pointers** - Arrays, linked lists
- Same direction or opposite direction
- Fast & slow pointers

**2. Sliding Window** - Subarray problems
- Fixed or variable window size

**3. Binary Search** - Sorted arrays, search space
- Classic binary search
- Modified binary search

**4. BFS/DFS** - Trees, graphs
- Level-order traversal (BFS)
- Path finding (DFS)

**5. Dynamic Programming** - Optimization problems
- 1D, 2D, or multi-dimensional DP

**6. Backtracking** - Generate all possibilities
- Combinations, permutations, subsets

**7. Greedy** - Local optimum
- Interval problems, scheduling

**8. Graph Algorithms** - Connected components, paths
- Union-Find, Dijkstra, Topological Sort

### Week 21-22: LeetCode Patterns (NeetCode 150)

Follow the **[NeetCode 150](https://neetcode.io/)** - curated list of essential problems.

#### Study Plan:
- **Week 21**: Arrays, Hashing, Two Pointers, Sliding Window, Stack
- **Week 22**: Binary Search, Linked List, Trees, Heap, Backtracking

**Daily Target**: 2-3 problems

**Approach**:
1. Read problem carefully
2. Think for 15-20 minutes
3. If stuck, look at hints
4. Still stuck? Watch solution video
5. Implement solution
6. Review complexity
7. Solve again next day

### Week 23-24: Mock Interviews & Company-Specific Prep

#### Mock Interview Platforms:
- **[Pramp](https://www.pramp.com/)**: Free peer interviews
- **[interviewing.io](https://interviewing.io/)**: Anonymous practice
- **LeetCode Mock Interviews**: Timed problems

#### Interview Tips:

**1. Communicate Constantly**
- Think out loud
- Explain your approach
- Ask clarifying questions

**2. Structure Your Approach (UMPIRE)**
- **U**nderstand: Clarify requirements
- **M**atch: Identify pattern
- **P**lan: Outline solution
- **I**mplement: Write code
- **R**eview: Test and debug
- **E**valuate: Analyze complexity

**3. Handle Not Knowing**
- Don't panic!
- Talk through brute force
- Ask for hints
- Discuss trade-offs

**4. Time Management (45-60 min interview)**
- 5 min: Understanding problem
- 5-10 min: Planning approach
- 20-25 min: Coding
- 5-10 min: Testing and optimization

## Complete Learning Schedule

### Full-Time (4-5 months)
**4-6 hours daily**

- **Month 1**: Phases 0-1 (Foundation, basic data structures)
- **Month 2**: Phase 2 (Intermediate data structures)
- **Month 3**: Phase 3 (Core algorithms)
- **Month 4**: Phase 4 (Advanced algorithms)
- **Month 5**: Phase 5 (Problem-solving mastery)

### Part-Time (6-8 months)
**2-3 hours daily**

- **Months 1-2**: Phases 0-1
- **Months 3-4**: Phases 2-3
- **Months 5-6**: Phase 4
- **Months 7-8**: Phase 5

### Daily Routine:

**Study Phase** (Months 1-4):
- 1-2 hours: Learn new concept (videos, articles)
- 1-2 hours: Solve 2-3 related problems
- 30 min: Review previous problems

**Practice Phase** (Months 5+):
- Solve 3-4 problems daily
- 1 mock interview per week
- Review common patterns

## Essential Resources

### Learning Platforms:

**Primary**:
1. **[LeetCode](https://leetcode.com/)**: Best for interview prep
2. **[NeetCode](https://neetcode.io/)**: Structured roadmap + video solutions
3. **[VisuAlgo](https://visualgo.net/)**: Algorithm visualizations

**Secondary**:
4. **[HackerRank](https://www.hackerrank.com/)**: Tutorials + practice
5. **[CodeSignal](https://codesignal.com/)**: Company assessments
6. **[AlgoExpert](https://www.algoexpert.io/)**: Paid but comprehensive (100+ problems)

### Video Courses:

**Free**:
1. **Abdul Bari** (YouTube): Best algorithm explanations
2. **NeetCode** (YouTube): Problem walkthroughs
3. **Back To Back SWE** (YouTube): In-depth explanations
4. **Freecodecamp**: "Data Structures Easy to Advanced"

**Paid**:
1. **Grokking the Coding Interview**: Pattern-based approach
2. **AlgoExpert**: Complete course + problems
3. **Educative.io**: Interactive courses

### Books:

**Beginner**:
1. **"Grokking Algorithms"** by Aditya Bhargava: Visual, easy introduction
2. **"Cracking the Coding Interview"** by Gayle McDowell: Interview prep bible

**Advanced**:
3. **"Introduction to Algorithms"** (CLRS): Comprehensive reference
4. **"Algorithm Design Manual"** by Skiena: Practical approach

### Cheat Sheets:

1. **[Big-O Cheat Sheet](https://www.bigocheatsheet.com/)**: Complexity reference
2. **[Interview Cheat Sheet](https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/)**: Quick review
3. **[LeetCode Patterns](https://seanprashad.com/leetcode-patterns/)**: Problem patterns

## Problem-Solving Strategy

### The UMPIRE Method:

**1. Understand**
- Read problem carefully (2-3 times!)
- Identify inputs and outputs
- Ask clarifying questions
- Write down example test cases

**2. Match**
- What pattern does this match?
- Similar problems you've solved?
- What data structures might help?

**3. Plan**
- Explain approach in plain English
- Outline steps
- Consider edge cases
- Discuss complexity

**4. Implement**
- Write clean, readable code
- Use meaningful variable names
- Add comments for complex logic

**5. Review**
- Test with examples
- Check edge cases
- Walk through code line by line

**6. Evaluate**
- Time complexity?
- Space complexity?
- Can we optimize?

### When Stuck:

**15-Minute Rule**:
- Try for 15 minutes
- If no progress, look at hint
- Try another 15 minutes
- Still stuck? Read solution

**Don't Just Read Solutions**:
1. Understand WHY it works
2. Close solution
3. Implement yourself
4. Solve again tomorrow

## Common Mistakes to Avoid

### 1. Tutorial Hell
**Problem**: Watching videos without practicing
**Solution**: Code along, then solve similar problems yourself

### 2. Rushing Through Easy Problems
**Problem**: Skipping basics to do hard problems
**Solution**: Master fundamentals first

### 3. Not Reviewing
**Problem**: Solve once, never revisit
**Solution**: Spaced repetition - review after 1 day, 1 week, 1 month

### 4. Memorizing Solutions
**Problem**: Remember specific code, not pattern
**Solution**: Understand WHY, not just HOW

### 5. Giving Up Too Early
**Problem**: Looking at solution immediately
**Solution**: Struggle for 15-20 minutes first

### 6. Ignoring Time/Space Complexity
**Problem**: Code works but inefficient
**Solution**: Always analyze and optimize

### 7. Not Testing Code
**Problem**: Submit without testing
**Solution**: Test with examples + edge cases

## Interview Preparation Checklist

### 3 Months Before Interview:

- [ ] Complete Phases 1-3 (basic + intermediate structures)
- [ ] Solve 100+ easy/medium problems
- [ ] Understand all major patterns

### 1 Month Before Interview:

- [ ] Solve 50+ medium problems
- [ ] Attempt 10+ hard problems
- [ ] Do weekly mock interviews
- [ ] Review common problems for target company

### 1 Week Before Interview:

- [ ] Review top patterns (two pointers, sliding window, DFS/BFS, DP)
- [ ] Solve 2-3 problems daily (easy + medium)
- [ ] Do final mock interview
- [ ] Review your resume projects

### Day Before Interview:

- [ ] Do 1-2 easy problems (confidence boost!)
- [ ] Review complexity analysis
- [ ] Rest well, stay calm

### During Interview:

- [ ] Ask clarifying questions
- [ ] Think out loud
- [ ] Start with brute force
- [ ] Optimize iteratively
- [ ] Test your code
- [ ] Discuss trade-offs

## Success Metrics & Milestones

### Month 1:
- ✅ Understand O(n), O(log n), O(n²)
- ✅ Comfortable with arrays, strings, hash tables
- ✅ Solved 30+ easy problems

### Month 2:
- ✅ Master linked lists, stacks, queues
- ✅ Understand trees and basic traversals
- ✅ Solved 50+ easy, 20+ medium problems

### Month 3:
- ✅ Comfortable with graphs and heaps
- ✅ Understand sorting and searching algorithms
- ✅ Can identify common patterns
- ✅ Solved 100+ problems total

### Month 4:
- ✅ Understand recursion and backtracking
- ✅ Grasp basic DP concepts
- ✅ Solved 150+ problems
- ✅ Can solve most medium problems independently

### Month 5+:
- ✅ Comfortable with advanced DP
- ✅ Know graph algorithms (Dijkstra, topological sort)
- ✅ Solved 200+ problems
- ✅ Passing mock interviews
- ✅ Ready for FAANG interviews

## Staying Motivated

### Tips for Consistency:

**1. Set Daily Goals**
- 2 problems per day is better than 14 on Sunday
- Small wins compound

**2. Join Communities**
- r/leetcode on Reddit
- LeetCode Discord
- Study groups with friends

**3. Track Progress**
- Keep a spreadsheet
- Watch your solved count grow
- Celebrate milestones

**4. Mix Difficulties**
- Too hard? You'll get frustrated
- Too easy? You won't grow
- Mix of both keeps it interesting

**5. Take Breaks**
- It's okay to struggle
- Sleep on hard problems
- Come back fresh

**6. Remember Your Why**
- Better job? Higher salary?
- Career growth? Problem-solving skills?
- Keep your goal visible

## Conclusion

Data Structures and Algorithms are **challenging but conquerable**. The key is:

1. **Consistency** over intensity
2. **Understanding** over memorization
3. **Practice** over theory
4. **Patterns** over individual problems

**Your Timeline**:
- **Month 1-2**: "What is DSA?"
- **Month 3-4**: "I'm starting to see patterns!"
- **Month 5-6**: "I can solve most problems!"
- **Beyond**: "I'm confident in interviews!"

**Remember**:
- Everyone struggles at first
- LeetCode hard problems are HARD (that's the point!)
- Progress isn't linear - some weeks you'll feel stuck
- The struggle IS the learning
- You WILL get better with practice

**Next Steps**:
1. Choose your primary language
2. Set up LeetCode account
3. Start Phase 1 - Week 2 (Arrays & Strings)
4. Solve 2 problems today
5. Keep going!

**You've got this! Happy problem-solving! 🚀**

---

*Last updated: January 2025*
*Estimated total practice problems: 250-400*
*Timeline: 4-6 months to interview-ready with consistent daily practice*
