function findSmallest(arr) {
  let smallest = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return smallest;
}

const smallest = findSmallest([8, 7, 4, 2, 9, 1]);
console.log(smallest); // 2

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
