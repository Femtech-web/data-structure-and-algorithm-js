// recursive approach
function knapsack(values, weights, W, n) {
  if (n === 0 || W === 0) return 0;

  if (weights[n - 1] > W) {
    return knapsack(values, weights, W, n - 1);
  } else {
    return Math.max(
      values[n - 1] + knapsack(values, weights, W - weights[n - 1], n - 1),
      knapsack(values, weights, W, n - 1)
    );
  }
}

const values = [60, 100, 120];
const weights = [10, 20, 30];
const W = 50;
console.log(knapsack(values, weights, W, values.length)); // Outputs: 220

// memoization approach
function knapsack(values, weights, W, n, memo = {}) {
  if (n === 0 || W === 0) return 0;

  if (`${n}-${W}` in memo) return memo[`${n}-${W}`];

  if (weights[n - 1] > W) {
    memo[`${n}-${W}`] = knapsack(values, weights, W, n - 1, memo);
  } else {
    memo[`${n}-${W}`] = Math.max(
      values[n - 1] +
        knapsack(values, weights, W - weights[n - 1], n - 1, memo),
      knapsack(values, weights, W, n - 1, memo)
    );
  }

  return memo[`${n}-${W}`];
}

console.log(knapsack(values, weights, W, values.length)); // Outputs: 220

// tabulation approach
function knapsack(values, weights, W) {
  const n = values.length;
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][W];
}

console.log(knapsack(values, weights, W)); // Outputs: 220

// ----------------------------------------------------------------------------------------------
