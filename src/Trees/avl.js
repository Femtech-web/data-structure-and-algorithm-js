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
