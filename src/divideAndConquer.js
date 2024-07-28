// A sum function using divide and conquer algorithm
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

// --- A recursive function to count the number of items in a list using divide and conquer
function countItems(arr) {
  if (arr.length === 0) {
    return null;
  }

  if (arr.length === 1) {
    return 1;
  }

  let firstItem = arr[0];
  let reducedArr = arr.filter((_, index) => index !== arr.indexOf(firstItem));

  return 1 + countItems(reducedArr);
}

const totalItems = countItems([2, 4, 6, 7, 5, 5, 5]);
console.log(totalItems); //7

// --- A recursive function to find the max number in a list using divide and conquer
function findMaximum(arr) {
  if (arr.length === 0) {
    return null;
  }

  if (arr.length === 1) {
    return arr[0];
  }

  let firstItem = arr[0];
  let reducedArr = arr.filter((_, index) => index !== arr.indexOf(firstItem));

  let prevMax = findMaximum(reducedArr);

  if (prevMax < firstItem) {
    return firstItem;
  } else {
    return prevMax;
  }
}

const maximumItem = findMaximum([28, 56, 49, 39, 92]);
console.log(maximumItem); //92
