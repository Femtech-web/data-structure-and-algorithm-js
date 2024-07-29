function quickSort(_arr) {
  if (_arr.length <= 1) return _arr;

  let mid = Math.floor(_arr.length / 2);
  let pivot = _arr[mid];

  const less = _arr.filter((item) => item < pivot);
  const greater = _arr.filter((item) => item > pivot);

  return [...quickSort(less), pivot, ...quickSort(greater)];
}

let arr = [3, 7, 2, 1, 6];
const result = quickSort(arr);

console.log(result);
