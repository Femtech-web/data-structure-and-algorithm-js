# Data-structure-and-Algorithm-js

My Notes and implementations on DSA

## Variables

variables are storage locations for holding data or different data types (A data type is a set of data with value having predefined characteristics ).

we have two types of data types

- System defined data types (also known as primitives data types)
- And User defined data types.

The number of bits allocated to each primitive data type depends on the programming language, compiler and operating system.

## Data Structure

Data structure is a way of storing and organizing data in a computer memory so it could be used efficiently.
We have two types of data structure, they are:

1. linear data structure: Data is accessed and arranged in a sequential order but not compulsory to store all elements sequentially (e.g linked list) e.g stack, queue, list etc.
2. non-linear data structure: The elements of this data structure are stored and acessed in a non linear fashion e.g trees, graphs etc

## ADTs (Abstract data types)

Primitives data types come along with system implemented operations such as addition, subtraction etc. ADTs are the way to combine data structures with there operations as user defined data types don't come along with those operations cus they are defined by the user. ADTs have two parts

- Declaration of data
- Declaration of operations

## Algorithm and analysis of Algorithm

Algorithms are simply step by step instructions to solve a given problems (the steps need to be proved). Analysis of Algorithm are important to derive the best and efficient way to solve a problem in terms of time, effort and memory consumption as there are numerous ways to solve a problem but few are efficient.

## Big O notation

Big O notation helps in checking how fast an algorithm is based on the operations of the algorithm. for example, simple search takes n time to operate so the Big O notation is O(n) while for binary search, since it takes (worst case) log n to operate or return a result, the big O notation is O(log n).

## Binary Search

Binary search is a search algorithm that takes in an input of a sorted list and an item to find or return from the sorted list. The reason why the list needs to be sorted is so that comparison may be possible in order to return the item to find. Also note that the Algorithm manipulates the _index_ of the elements in the list to return the requested item.

In simple search, you have to check for _n_ numbers at most but in binary search, you have to search log n times at most. let's say your are looking for an item in a list of 8 numbers, it means in binary search you have to search log 2 raise to power of 8 which is _3_.

### How Binary search works

The Binary search algorithm steps involve

- Setting the variables of the high, low and middle values that keeps track to where to search in the list/array.

* The low starts with the start index of the list and later increases the middle index based on the guess value.
* The high starts with total index length of the list and later decreases the middle index based on the guess value.
* The middle is always (low + high) / 2. This is also set only when the low value is lesser or equal to the high value.

- Deriving the _guess_ value which is the position of the middle index.
- compare if the guess is equal to the item to find then return it as it is the answer
- if not, if the guess is greater than the the item, the it's too high. Reset high to middle - 1 and run the algorithm again
- if not, if the guess is lesser than the item, then it's too low. Reset low to middle + 1 and run the algorithm again
- if not, the return null as the item is not in the sorted list.

example

```javascript
function binarySearch(\_SORTED_LIST, \_ITEM) {
let low = 0;
let high = \_SORTED_LIST.length - 1;

while (low <= high) {
let mid = Math.floor((low + high) / 2);
let guess = \_SORTED_LIST[mid];

    if (guess === _ITEM) {
      return guess;
    } else if (guess > _ITEM) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }

}

return null;
}

const sortedList = [2, 4, 6, 8, 10];
const foundItem = binarySearch(sortedList, 8);
console.log(foundItem); // 8
```

## Arrays and Linked list

The way the computer memory stores data in more like a large set of drawers and each drawer with a storage address number. so when you want to store one item, you ask for a drawer and if two items, two drawers. There would be different scenarios where you would want to store some sets/collection of related information in your computer memory. There are two ways to do that in different scenarios appropiate to each:

### Arrays

Array is a linear data structure that lets you store your data next to each other in computer memory. For Arrays you can only have a predetermined set of computer memory which are next to each other. Arrays are better preferred in terms of reading from computer memory.

some of the characteristics of arrays are

- random access
- faster sequential access
- memory efficient
- operates in linear O(n) time in terms of insertion and deletion
- operates in constant time O(1) in terms of reading.
- supports caching

### Linked list

Another way to store related information in the computer memory is through a linked list. what makes a linked list different from an array is that, you can store your related data scattered across your computer memory yet with each item holding an adress to the next which makes it possible to link and access the related items.

some characteristics of linked list are

- can store related items scattered across computer memory
- operates in linear O(n) time in terms of reading
- operates in constant time O(1) in insertion and deletion.
- needs extra memory/space to store item address(pointers).

## Selection Sort Algorithm

Selection sort is a sorting algorithm used to sort items like from highest to lowest or lowest to highest or based on your condition in an array. you can sort names in a record, messages (from oldest to newest in an inbox) and son on. selection sort is neat but not very fast.

## Example of a selection sort algorithm

```javascript
function findSmallest(arr) {
  let smallest = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return smallest;
}

// const smallest = findSmallest([8, 7, 4, 2, 9, 1]);
// console.log(smallest); -- 1 --

function sortArray(arr) {
  let newArray = [];
  let copiedArray = [...arr];

  for (let i = 0; i < copiedArray.length; ) {
    let smallest = findSmallest(copiedArray);
    newArray.push(smallest);
    copiedArray = copiedArray.filter((item) => item !== smallest);
  }

  return newArray;
}

const sortedArray = sortArray([8, 7, 4, 2, 9, 1]);
console.log(sortedArray);
[1, 2, 4, 7, 8, 9]; //
```

## Recursion

Recursion is a coding technique that is used in many algorithm. it is simply a function calling itself again util a condition is met. Recursion has two parts, the base case and the recursive case. The base case tells the recursion to stop based on a condition and the recursion case tells it to continue else the function may run into an infinite loop and may crash your pc.

Most times,in some situations, using a loop is preferred to recursion as it takes up so much space in the computer memory when it is using the call stack to manage a lot of function calls.

### understanding the call stack

The call stack is a very important concept in the world of programming generally. It is simply a data structure (FIFO) that the computer uses internally to manage allocate memory and execute function calls.

Recursion uses the call stack to manage functions call and successfully complete it's operations.

### Example

```javascript
function factorial(x) {
  if (x === 1) {
    return x;
  } else {
    let nxtValue = x - 1;
    return x * factorial(nxtValue);
  }
}

const answer = factorial(8);
console.log(answer); //40320
```

## Divide and Conquer

Divide and conquer is a problem solving technique to solve certain algorithms problems. is is a way to think about solving a problem.

### How it works

How divide and conquer work is that:

- First figure out a simple case as the base case
- Then figure out how to reduce your problem and get to the base case

heres a simple function that uses divide and conquer to sum all the figures in the list/array.

```javascript
function sum(arr) {
  if (arr.length === 0) {
    return 0;
  }

  let firstItem = arr[0];
  let reducedArr = arr.filter((_, index) => index !== arr.indexOf(firstItem));

  let accumulatedSum = firstItem + sum(reducedArr);
  return accumulatedSum;
}

const result = sum([4, 6, 8, 6, 5, 9, 5]);
console.log(result); //43
```

## Quick sort

Quick sort is a sorting algorithm that uses divide and conquer to solve real life problems. it's much faster than selection sort.
Quick sort is unique because it's speed depends on the pivot you choose. Quick sort is also tricky because normally/averagely it takes O(n log n) but in the worst case O(n2).

### How it works

How quick sort works is that:

- You first pick a random element from the list/array which is known as the **pivot** - - Then you find the elements smaller than the pivot and bigger than the pivot in separate sub arrays (this is also called partitioning). This two sub-arrays are not sorted but just **partitioned**(if they are sorted too, then all good and makes the whole sorting easier).
- if the two sub-arrays are sorted, then you can combine the whole thing like this - left array + pivot + right array and you get a sorted array else you call quicksort on the left and right array recursively to get a sorted array.

## Hash tables

Hash table is a data structure that uses hash functions to intelligently store elements.Hash tables are also known as hash maps, maps, dictionaries and associative arrays. Hash functions map a string to a number. some requirements for a hash function are:

- It needs to be consistent
- It should map different words to different numbers

\*note: Hash tables are very fast compared to arrays when you need to read a data as they run in constant time O(1) at average and linear time O(n) at worst.

### use cases

1. Hashes are used for table lookups. e.g A phone-book functionality that maps a name to a number and also gets the number by the name.
2. Hashes are also used to prevent duplicate entries.
3. They are also used to cache/memoize data instead of making the server do the same work all over again.

### Collisions and Performance

collisions is when your hash functions map two key-value pair to a slot in the array. Hash tables are as fast as arrays in searching (getting a value at an index), and they are as fast as linked list at inserts and deletes. But in the worst case, they are slow in all of those. So it is very crucial to avoid collisions. Avoiding collisions means you need

- A low load factor
- A good hash function

The load factor of hash tables is calculated by: number of items/total number of array slot.
let's say you have 4 items in an array of 8 slot, that would be 4/8 which is 0.5 (this is a good load factor). In the rule of thumb, it is good to make an array which is twice the size of items in it else you need to resize(this is expensive so you need not to do it often). it is also good to resize your hash when the load factor is greater than 0.7.

\*note: The load factor is bad when it is greater than 1.

## Graphs

A graph is a data structure that models a set of connections. it defines the relationship between some sets of elements. There are two types of graph, we have the directed graph and undirected graph. In directed graph, nodes have arrows(edges) pointing to them but no arrows from them to someone else, while undirected graphs doesn't have any arrows.

Graphs are made up of:

- nodes and
- edges

let's take some group of people for example, so nodes are the people(and there attributes) while edges indicate which people know each other.

## Breadth-first-search(BFS)

BFS is a type of algorithm that runs on a graph/trees. BFS is also a traversal algorithm as it visits every node in the graph/tree. it can help answer two types of question:

- Is there a path from node A to node B
- What is the shortest path from node A to node B

There are steps to follow in implementing a BFS.

1. You have to implement the the problem graph in code(you can use like a hash table to map nodes to other nodes)
2. Create a queue to store all the nodes to check or search through.
3. Add the values(properties) of the starting node in the queue for a start.
4. You also initialize a list to keep a record of people you've already checked so not to check twice.
5. Check items in the queue to see if they meet the requirement of what you need then you return the item else you keep checking and adding other items properties to the queue(\*note: queue runs in the order items are added).
6. if no item matches the condition, then nothing is returned and the loop stops.

BFS algorithm takes O(V+E) to run. V is num of vertices while E is num of edges.

Here is an example below

```javascript
const path = require("node:path");
const fs = require("node:fs/promises");

const graph = new Map();

graph.set("femi", ["tunde", "tade", "bolu", "joseph"]);
graph.set("bolu", ["isaac", "mango seller"]);
graph.set("tunde", ["iremide"]);
graph.set("tade", ["kunle"]);
graph.set("joseph", []);
graph.set("isaac", []);
graph.set("mango seller", []);
graph.set("iremide", []);
graph.set("kunle", []);

console.log(graph);

function breadthFirstSearch(name) {
  let queueToSearch = [];
  let searchedName = new Set();

  queueToSearch = [...queueToSearch, ...graph.get(name)];

  while (queueToSearch.length !== 0) {
    let nextPerson = queueToSearch.shift();

    if (!searchedName.has(nextPerson)) {
      if (nextPerson.includes("mango seller")) {
        return nextPerson;
      } else {
        queueToSearch = [...queueToSearch, ...graph.get(nextPerson)];
        searchedName.add(nextPerson);
      }
    }
  }

  return false;
}

const result = breadthFirstSearch("femi");
console.log(result);
```

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

## AVL Trees

AVL is a type of self balancing binary tree i.e, it will maintain a height of O(log n) when the tree is out of balance by correcting itself through **Rotations**. AVL guarantees that the height of a binary tree would be O(log n).

### Rotation

Rotation simply means when you move a set of nodes to end up with a new arrangement. The way AVL uses rotations to re-balance itself or tree is that: It stores the height or balance factor(it could be -1, 1, 0 etc based on the subtree height difference) to re-balance.
