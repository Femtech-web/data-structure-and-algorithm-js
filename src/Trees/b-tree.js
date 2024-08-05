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
    this.t = t; // Minimum degree
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
