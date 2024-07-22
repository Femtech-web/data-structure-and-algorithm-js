function binarySearch(_SORTED_LIST, _ITEM) {
  let low = 0;
  let high = _SORTED_LIST.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let guess = _SORTED_LIST[mid];

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
