### Understanding Dynamic Programming (DP) with JavaScript

Dynamic Programming (DP) is a powerful technique used to solve optimization problems by breaking them down into simpler subproblems and solving each of those only once, storing their solutions (often in a table) to avoid redundant computations. Here's a step-by-step guide to help you grasp the concept, with examples in JavaScript.

### 1. **Concepts in Dynamic Programming**

Before diving into examples, let’s clarify some key concepts:

- **Overlapping Subproblems**: DP is useful when a problem can be broken down into subproblems that are reused multiple times.
- **Optimal Substructure**: A problem has an optimal substructure if the optimal solution to the problem can be constructed from optimal solutions of its subproblems.
- **Memoization**: This is a top-down approach where you store the results of subproblems in a table (usually an object in JavaScript) to avoid recalculating them.
- **Tabulation**: This is a bottom-up approach where you solve all subproblems starting with the smallest, and use their results to build up solutions to larger subproblems.

### 2. **Steps to Solve a DP Problem**

1. **Identify if the problem can be broken into subproblems**.
2. **Decide the state(s)**, i.e., the parameters that define a subproblem.
3. **Formulate the relation** between the problem and its subproblems (the recurrence relation).
4. **Choose between Memoization or Tabulation**.
5. **Implement the solution** in code.

### 3. **Examples**

#### Example 1: Fibonacci Sequence (Simple Example)

The Fibonacci sequence is a classic DP problem. The nth Fibonacci number is the sum of the (n-1)th and (n-2)th Fibonacci numbers.

**Recursive Solution (Inefficient due to overlapping subproblems)**:

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(10)); // Outputs: 55
```

**Memoization Solution**:

```javascript
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

console.log(fib(10)); // Outputs: 55
```

**Tabulation Solution**:

```javascript
function fib(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(fib(10)); // Outputs: 55
```

#### Example 2: Knapsack Problem (Intermediate Example)

Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

**Recursive Solution**:

```javascript
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
```

**Memoization Solution**:

```javascript
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
```

**Tabulation Solution**:

```javascript
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
```

### 4. **Important DP Algorithms and Concepts**

1. **Longest Common Subsequence (LCS)**:
   - Used in diff tools, spell checking, etc.
2. **Edit Distance (Levenshtein Distance)**:
   - Measures how dissimilar two strings are.
3. **0/1 Knapsack**:
   - The one covered above, useful in many optimization problems.
4. **Coin Change Problem**:
   - Find the minimum number of coins that make a given value.
5. **Longest Increasing Subsequence**:
   - Finds the longest subsequence where the elements are in sorted order, lowest to highest.

### 5. **Key Takeaways**

- **Understand the problem**: Identify if it can be solved by breaking it into smaller overlapping subproblems.
- **Choose the right approach**: Use memoization for top-down approaches and tabulation for bottom-up approaches.
- **Practice**: The best way to master DP is by solving various problems of increasing complexity.

<!-- ----------------------------------------------------------------------------------------- -->

### Longest Common Subsequence (LCS)

#### **What is LCS?**

The Longest Common Subsequence (LCS) problem is a classic example of a dynamic programming problem. Given two sequences, the LCS is the longest sequence that appears in both of them in the same order, but not necessarily consecutively.

For example, given the sequences `"ABCBDAB"` and `"BDCAB"`, the LCS is `"BCAB"`.

#### **Why LCS?**

LCS is useful in various fields, such as:

- **Diff Tools**: Used to find similarities between two files.
- **Bioinformatics**: Helps in DNA sequence alignment.
- **Text Comparison**: Used in spell checkers or text comparison tools.

#### **Steps to Solve LCS Using DP**

1. **Identify the Subproblems**:

   - We can define the LCS problem for two strings `X[0..m-1]` and `Y[0..n-1]`.
   - The subproblem `LCS(i, j)` represents the LCS of the first `i` characters of `X` and the first `j` characters of `Y`.

2. **Recurrence Relation**:

   - If `X[i-1] == Y[j-1]`, then `LCS(i, j) = 1 + LCS(i-1, j-1)`.
   - If `X[i-1] != Y[j-1]`, then `LCS(i, j) = max(LCS(i-1, j), LCS(i, j-1))`.

3. **Base Case**:

   - If either string is empty (`i == 0` or `j == 0`), then `LCS(i, j) = 0`.

4. **Choose Tabulation or Memoization**:
   - Here, we'll use tabulation (bottom-up approach) for a clearer understanding.

#### **Implementation in JavaScript**

**Tabulation Approach**:

```javascript
function lcs(X, Y) {
  const m = X.length;
  const n = Y.length;
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Building the dp array
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (X[i - 1] === Y[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstructing the LCS
  let lcsStr = "";
  let i = m,
    j = n;
  while (i > 0 && j > 0) {
    if (X[i - 1] === Y[j - 1]) {
      lcsStr = X[i - 1] + lcsStr;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcsStr;
}

// Example usage:
const X = "ABCBDAB";
const Y = "BDCAB";
console.log(lcs(X, Y)); // Outputs: "BCAB"
```

#### **Explanation of the Code**:

1. **Initialization**:

   - We initialize a 2D array `dp` where `dp[i][j]` stores the length of the LCS of the first `i` characters of `X` and the first `j` characters of `Y`.

2. **Filling the DP Table**:

   - We loop through each character of `X` and `Y`.
   - If the characters match (`X[i-1] === Y[j-1]`), then `dp[i][j]` is `1 + dp[i-1][j-1]`.
   - If they don’t match, we take the maximum of either ignoring the character in `X` (`dp[i-1][j]`) or in `Y` (`dp[i][j-1]`).

3. **Reconstructing the LCS**:
   - After filling the DP table, we trace back from `dp[m][n]` to build the LCS string.

#### **Time and Space Complexity**:

- **Time Complexity**: `O(m * n)`, where `m` and `n` are the lengths of the input strings.
- **Space Complexity**: `O(m * n)` for storing the DP table.

#### **Optimizing Space Complexity**:

If you only need the length of the LCS, you can optimize the space complexity to `O(min(m, n))` by using two 1D arrays instead of a 2D table.
