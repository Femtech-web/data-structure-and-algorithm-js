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

splayTree.preOrderTraverse(splayTree.root); // Output might vary due to splaying
