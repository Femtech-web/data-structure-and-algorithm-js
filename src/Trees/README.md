## Trees

A tree data structure is a type of graph.We can say it is a connected acyclic graph. In a tree, we have a root node(this the first parent and it dose'nt have a predecessor), a parent(this is a node that has children), a child(a child can not have more than a parent) and a leaf node(this is a node without a child/children). A file directory is an example of a tree.

\*note: Trees don't have cycles unlike graphs.

## Depth-firs-search(DFS)

This is also an algorithm used on graphs/trees. It also searches a path to meet a specified condition but it is slightly different from BFS. DFS is different from BFS in the sense that, it doesn't find the closest path but rather goes deep into in a particular path. DFS is also good for use cases such as topological sort.

This is an example below

```javascript
const path = require("node:path");
const fs = require("node:fs/promises");

async function deepFirstSearch(dir) {
  const initialpath = path.join(__dirname, dir);
  const contents = await fs.readdir(initialpath);

  for (let name of contents) {
    let fullPath = path.join(initialpath, name);
    const stat = await fs.stat(fullPath);

    if (stat.isFile()) {
      console.log(name);
    } else {
      let nextDir = `${dir}/${name}`;
      deepFirstSearch(nextDir);
    }
  }
}

deepFirstSearch("test");
```

## Binary trees

A Binary tree is a special kind of tree where node can have at most two children. Huffman coding uses binary trees to cleverly compress content/text in files. In huffman coding, instead of the normal convention where a character takes 1 byte of space in memory(8 bits), huffman coding allows characters to have any amount of bit lesser than 8 based on there location on the tree (using the left and right subtree to determine character bit values).

## Binary Search Trees(BSTs)

Binary search trees is a type of binary tree. It inherits it's properties also of that each node can have at most two children. what makes BST special/different is that the value of the left child is smaller or lesser than the node and the value of the right child is bigger or greater than the node. Also all the numbers/values in the left child subtree are smaller than the node.

Binary search trees combine the best performance of the O(1) insertion time of a linked list and the O(log n) search time of a sorted array. so it means we could have a perfect data structure that gives us a balanced performance in insertions and search operation. Although performance can also be different based on the height and structure of the tree. so that means you can have a tree with seven nodes and one based on the structure/height can give a performance of O(n) while the other O(log n). That is why we need a **balanced binary tree**.

```js
class NodeInstance {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new NodeInstance(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(parentNode, newNode) {
    if (newNode.value < parentNode.value) {
      if (parentNode.leftChild === null) {
        parentNode.leftChild = newNode;
      } else {
        this.insertNode(parentNode.leftChild, newNode);
      }
    } else {
      if (parentNode.rightChild === null) {
        parentNode.rightChild = newNode;
      } else {
        this.insertNode(parentNode.rightChild, newNode);
      }
    }
  }

  search(rootNode, value) {
    if (rootNode === null) {
      return null;
    }

    if (value < rootNode.value) {
      return this.search(rootNode.leftChild, value);
    } else if (value > rootNode.value) {
      return this.search(rootNode.rightChild);
    } else {
      return node;
    }
  }

  logInOrder(node, callback) {
    if (node !== null) {
      this.logInOrder(node.leftChild, callback);
      callback(node.value);
      this.logInOrder(node.rightChild, callback);
    }
  }
}

const treeInstance = new BST();

treeInstance.insert(15);
treeInstance.insert(25);
treeInstance.insert(10);
treeInstance.insert(7);
treeInstance.insert(22);
treeInstance.insert(17);
treeInstance.insert(13);

// console.log(treeInstance);

const printValue = (value) => console.log(value);
treeInstance.logInOrder(treeInstance.root, printValue);
```

## AVL Trees

AVL is a type of self balancing binary tree i.e, it will maintain a height of O(log n) when the tree is out of balance by correcting itself through **Rotations**. AVL guarantees that the height of a binary tree would be O(log n).

```js
class AVLNode {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
    this.rotateRightTimes = 0;
    this.rotateLeftTimes = 0;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    return node
      ? this.getHeight(node.leftChild) - this.getHeight(node.rightChild)
      : 0;
  }

  rotateRight(y) {
    const x = y.leftChild;
    const T2 = x.rightChild;

    x.rightChild = y;
    y.leftChild = T2;

    y.height =
      Math.max(this.getHeight(y.leftChild), this.getHeight(y.rightChild)) + 1;
    x.height =
      Math.max(this.getHeight(x.leftChild), this.getHeight(x.rightChild)) + 1;

    this.rotateRightTimes++;
    console.log(`i rotated right ${this.rotateRightTimes} times`);

    return x;
  }

  rotateLeft(x) {
    const y = x.rightChild;
    const T2 = y.leftChild;

    y.leftChild = x;
    x.rightChild = T2;

    x.height =
      Math.max(this.getHeight(x.leftChild), this.getHeight(x.rightChild)) + 1;
    y.height =
      Math.max(this.getHeight(y.leftChild), this.getHeight(y.rightChild)) + 1;

    this.rotateLeftTimes++;
    console.log(`i rotated left ${this.rotateLeftTimes} times`);

    return y;
  }

  insert(node, value) {
    if (node === null) {
      return new AVLNode(value);
    }

    if (value < node.value) {
      node.leftChild = this.insert(node.leftChild, value);
    } else if (value > node.value) {
      node.rightChild = this.insert(node.rightChild, value);
    } else {
      return node;
    }

    node.height =
      1 +
      Math.max(this.getHeight(node.leftChild), this.getHeight(node.rightChild));

    const balance = this.getBalanceFactor(node);

    if (balance > 1 && value < node.leftChild.value) {
      return this.rotateRight(node);
    }
    if (balance < -1 && value > node.rightChild.value) {
      return this.rotateLeft(node);
    }
    if (balance > 1 && value > node.leftChild.value) {
      node.leftChild = this.rotateLeft(node.leftChild);
      return this.rotateRight(node);
    }
    if (balance < -1 && value < node.rightChild.value) {
      node.rightChild = this.rotateRight(node.rightChild);
      return this.rotateLeft(node);
    }

    return node;
  }

  preOrderTraverse(node) {
    if (node !== null) {
      console.log(node.value);
      this.preOrderTraverse(node.leftChild);
      this.preOrderTraverse(node.rightChild);
    }
  }
}

const avl = new AVLTree();
avl.root = avl.insert(avl.root, 15);
avl.root = avl.insert(avl.root, 10);
avl.root = avl.insert(avl.root, 25);
avl.root = avl.insert(avl.root, 7);
avl.root = avl.insert(avl.root, 13);
avl.root = avl.insert(avl.root, 5);
avl.root = avl.insert(avl.root, 8);

avl.preOrderTraverse(avl.root);
```

### Rotation

Rotation simply means when you move a set of nodes to end up with a new arrangement. The way AVL uses rotations to re-balance itself or tree is that: It stores the height or balance factor(it could be -1, 1, 0 etc based on the subtree height difference) to re-balance.

## Splay Trees

Splay trees are also a type of Balanced BSTs. One cool thing about them is that, if you have recently looked up an item, the next time you look it up, the look will be faster. How splay trees make this happen is that, when you look up a node for instance, it makes that node the new root so when you look it up the next time, the **seek time** would be faster. The trade off here is that the tree is not guaranteed to be balance as some searches may take longer than O(log n) time and while performing some searches, you will have to move up the node to root if it is not the root which would take slightly some additional time. The trade off not matter much as the overall search time would still average to O(log n) time and that fast search time is the goal.

```js
class SplayNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class SplayTree {
  constructor() {
    this.root = null;
  }

  rightRotate(x) {
    const y = x.left;
    x.left = y.right;
    y.right = x;
    return y;
  }

  leftRotate(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
  }

  splay(node, value) {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      if (node.left === null) return node;

      if (value < node.left.value) {
        node.left.left = this.splay(node.left.left, value);
        node = this.rightRotate(node);
      } else if (value > node.left.value) {
        node.left.right = this.splay(node.left.right, value);
        if (node.left.right !== null) {
          node.left = this.leftRotate(node.left);
        }
      }

      return node.left === null ? node : this.rightRotate(node);
    } else {
      if (node.right === null) return node;

      if (value < node.right.value) {
        node.right.left = this.splay(node.right.left, value);
        if (node.right.left !== null) {
          node.right = this.rightRotate(node.right);
        }
      } else if (value > node.right.value) {
        node.right.right = this.splay(node.right.right, value);
        node = this.leftRotate(node);
      }

      return node.right === null ? node : this.leftRotate(node);
    }
  }

  insert(value) {
    if (this.root === null) {
      this.root = new SplayNode(value);
      return;
    }

    this.root = this.splay(this.root, value);

    if (this.root.value === value) return;

    const newNode = new SplayNode(value);
    if (value < this.root.value) {
      newNode.right = this.root;
      newNode.left = this.root.left;
      this.root.left = null;
    } else {
      newNode.left = this.root;
      newNode.right = this.root.right;
      this.root.right = null;
    }
    this.root = newNode;
  }

  preOrderTraverse(node) {
    if (node !== null) {
      console.log(node.value);
      this.preOrderTraverse(node.left);
      this.preOrderTraverse(node.right);
    }
  }
}

// Example usage
const splayTree = new SplayTree();
splayTree.insert(10);
splayTree.insert(20);
splayTree.insert(30);
splayTree.insert(40);
splayTree.insert(50);
splayTree.insert(25);

splayTree.preOrderTraverse(splayTree.root);
```

## B-Trees

B-trees are a more generalized form of binary tree. unlike Binary trees, A B-Tree node can have more than two children. Also unlike other Binary trees, A B-Tree node can have more than one key too. Something to note in B-trees is that, they still follow the property of binary search tree (the children of the left node are always smaller than the node and those on the right are greater than the node), and the number of children is one greater than the number of nodes(so let's say we have a node of one key, then then children will be two and if a node of two keys, then the children will be three).

The advantage of B-Trees is that: They have physical optimizations i.e while fetching for a node, they fetch additional nodes one time at a go into memory, which makes them faster.

```js
class BTreeNode {
  constructor(isLeaf = false) {
    this.isLeaf = isLeaf;
    this.keys = [];
    this.children = [];
  }
}

class BTree {
  constructor(t) {
    this.root = new BTreeNode(true);
    this.t = t;
  }

  search(node, key) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    if (i < node.keys.length && key === node.keys[i]) {
      return node;
    }

    if (node.isLeaf) {
      return null;
    }

    return this.search(node.children[i], key);
  }

  splitChild(parent, i, child) {
    const t = this.t;
    const newNode = new BTreeNode(child.isLeaf);
    parent.children.splice(i + 1, 0, newNode);
    parent.keys.splice(i, 0, child.keys[t - 1]);

    newNode.keys = child.keys.splice(t, t - 1);
    if (!child.isLeaf) {
      newNode.children = child.children.splice(t, t);
    }
  }

  insertNonFull(node, key) {
    let i = node.keys.length - 1;

    if (node.isLeaf) {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      node.keys.splice(i + 1, 0, key);
    } else {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;
      if (node.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(node, i, node.children[i]);
        if (key > node.keys[i]) {
          i++;
        }
      }
      this.insertNonFull(node.children[i], key);
    }
  }

  insert(key) {
    const root = this.root;
    if (root.keys.length === 2 * this.t - 1) {
      const newNode = new BTreeNode(false);
      newNode.children.push(this.root);
      this.splitChild(newNode, 0, this.root);
      this.insertNonFull(newNode, key);
      this.root = newNode;
    } else {
      this.insertNonFull(this.root, key);
    }
  }

  traverse(node) {
    if (node === null) return;

    for (let i = 0; i < node.keys.length; i++) {
      if (!node.isLeaf) {
        this.traverse(node.children[i]);
      }
      console.log(node.keys[i]);
    }

    if (!node.isLeaf) {
      this.traverse(node.children[node.keys.length]);
    }
  }
}

// Example usage
const btree = new BTree(3);
btree.insert(10);
btree.insert(20);
btree.insert(5);
btree.insert(6);
btree.insert(12);
btree.insert(30);
btree.insert(7);
btree.insert(17);

btree.traverse(btree.root); // Output: 5 6 7 10 12 17 20 30
```

## Traversal

In tree data structures, traversal refers to the process of visiting each node in the tree exactly once in a specific order. Traversal is fundamental for tasks such as searching, printing, or modifying the data in the nodes.

### Types of Tree Traversal

Tree traversals are broadly classified into two categories:

1. **Depth-First Traversal (DFT)**
2. **Breadth-First Traversal (BFT)**

#### 1. **Depth-First Traversal (DFT)**

In Depth-First Traversal, you explore as far as possible along each branch before backtracking. DFT can be further classified into:

- **In-Order Traversal**
- **Pre-Order Traversal**
- **Post-Order Traversal**

Let's take a binary tree as an example:

```
       1
      / \
     2   3
    / \ / \
   4  5 6  7
```

##### **a. In-Order Traversal (Left, Root, Right)**

- Visit the left subtree, then the root, and finally the right subtree.
- For the above tree, the traversal order would be: **4, 2, 5, 1, 6, 3, 7**

**Example (In-Order):**

```javascript
function inOrder(node) {
  if (node === null) return;
  inOrder(node.left);
  console.log(node.value);
  inOrder(node.right);
}
```

##### **b. Pre-Order Traversal (Root, Left, Right)**

- Visit the root first, then the left subtree, and finally the right subtree.
- For the above tree, the traversal order would be: **1, 2, 4, 5, 3, 6, 7**

**Example (Pre-Order):**

```javascript
function preOrder(node) {
  if (node === null) return;
  console.log(node.value);
  preOrder(node.left);
  preOrder(node.right);
}
```

##### **c. Post-Order Traversal (Left, Right, Root)**

- Visit the left subtree, then the right subtree, and finally the root.
- For the above tree, the traversal order would be: **4, 5, 2, 6, 7, 3, 1**

**Example (Post-Order):**

```javascript
function postOrder(node) {
  if (node === null) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.value);
}
```

#### 2. **Breadth-First Traversal (BFT)**

In Breadth-First Traversal, also known as **Level-Order Traversal**, you visit nodes level by level starting from the root. All nodes at each level are visited before moving on to the next level.

For the same binary tree:

- The traversal order would be: **1, 2, 3, 4, 5, 6, 7**

**Example (Level-Order):**

```javascript
function levelOrder(root) {
  if (root === null) return;
  let queue = [];
  queue.push(root);

  while (queue.length > 0) {
    let node = queue.shift();
    console.log(node.value);

    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }
}
```

### categorization of Tree Traversal Types

- **In-Order (DFT):** Left -> Root -> Right
- **Pre-Order (DFT):** Root -> Left -> Right
- **Post-Order (DFT):** Left -> Right -> Root
- **Level-Order (BFT):** Visit nodes level by level starting from the root
