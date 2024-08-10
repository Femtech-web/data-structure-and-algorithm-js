class BinaryNode {
  constructor(value) {
    this.value = value;
    this.rightChild = null;
    this.leftChild = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new BinaryNode(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (currentNode.leftChild === null) {
        currentNode.leftChild = newNode;
        break;
      } else {
        queue.push(currentNode.leftChild);
      }

      if (currentNode.rightChild === null) {
        currentNode.rightChild = newNode;
        break;
      } else {
        queue.push(currentNode.rightChild);
      }
    }
  }

  logInLevelOrder() {
    if (this.root === null) {
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      console.log(currentNode.value);

      if (currentNode.leftChild !== null) {
        queue.push(currentNode.leftChild);
      }

      if (currentNode.rightChild !== null) {
        queue.push(currentNode.rightChild);
      }
    }
  }
}

const binaryTree = new BinaryTree();

binaryTree.insert(15);
binaryTree.insert(25);
binaryTree.insert(10);
binaryTree.insert(7);
binaryTree.insert(22);
binaryTree.insert(17);
binaryTree.insert(13);

binaryTree.logInLevelOrder();

// console.log(binaryTree);
