const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim()
  .split(/\r?\n/);

const [N, ...arr] = input.map(Number);

const answer = [];

arr.sort((a, b) => a - b);

let gcd = arr[1] - arr[0];

const getGcd = (num1, num2) => {
  let gcd;

  if (num1 % num2 === 0) {
    gcd = num2;
    return gcd;
  } else return getGcd(num2, num1 % num2);
};

for (let i = 1; i < N - 1; i++) {
  gcd = getGcd(gcd, arr[i + 1] - arr[i]);
}

for (let i = 2; i <= gcd; i++) {
  if (gcd % i === 0) answer.push(i);
}

answer.sort((a, b) => a - b);

console.log(answer.join(" "));
