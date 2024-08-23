function fib(n, memo = {}) {
  if (memo[n]) return memo[n];
  if (n <= 1) return n;

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);

  return memo[n];
}

console.log(fib(8));

function findValue(weights, values, capacity) {
  const n = values.length;

  let table = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        table[i][w] = Math.max(
          table[i - 1][w],
          table[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      } else {
        table[i][w] = table[i - 1][w];
      }
    }
  }

  return table[n][capacity];
}

const values = [10, 3, 9, 5, 6];
const weights = [3, 1, 2, 2, 1];
const capacity = 6;

console.log(findValue(weights, values, capacity));

function longestCommonString(A, B) {
  const m = A.length;
  const n = B.length;

  let maxLength = 0;
  let endIndex = 0;

  const grid = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] === B[j - 1]) {
        grid[i][j] = grid[i - 1][j - 1] + 1;

        if (grid[i][j] > maxLength) {
          maxLength = grid[i][j];
          endIndex = i;
        }
      }
    }
  }

  const longesSubstring = A.slice(endIndex - maxLength, endIndex);

  return { maxLength, longesSubstring, endIndex };
}

// const A = "abcdfg";
// const B = "abdfg";
// const result = longestCommonString(A, B);
// console.log(result);

function longestCommonSubsequence(A, B) {
  const m = A.length;
  const n = B.length;

  const grid = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] === B[j - 1]) {
        grid[i][j] = grid[i - 1][j - 1] + 1;
      } else {
        grid[i][j] = Math.max(grid[i][j - 1], grid[i - 1][j]);
      }
    }
  }

  return grid[m][n];
}

// const A = "fosh";
// const B = "fort";
// const result = longestCommonSubsequence(A, B);
// console.log(result); // 2

const A = "fosh";
const B = "fish";
const result = longestCommonSubsequence(A, B);
console.log(result); // 3
