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
