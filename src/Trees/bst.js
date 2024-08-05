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
