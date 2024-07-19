# Data-structure-and-Algorithm-js

Notes and implementations on DSA

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

`
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
`
