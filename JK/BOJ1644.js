const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim();

const N = Number(input);
let ans = 0;
const chk = Array.from(Array(N + 1)).fill(true);
chk[0] = false;
chk[1] = false;

for (let i = 2; i <= Math.sqrt(N); i++) {
  if (chk[i]) {
    for (let j = i * i; j <= N; j += i) {
      chk[j] = false;
    }
  }
}

const prime = [];
chk.forEach((e, idx) => {
  if (e) prime.push(idx);
});

// 연속된 소수의 합
let sum = 0;
let left = 0;

for (let right = 0; right < prime.length; right++) {
  sum += prime[right];

  while (sum > N) {
    sum -= prime[left];
    left++;
  }

  if (sum === N) {
    ans++;
  }
}

console.log(ans);

// 연속되지 않은 소수의 합
// const visited = Array(prime.length).fill(false);

// const dfs = (sum, idx) => {
//   if (sum === N) {
//     ans++;
//     return;
//   }

//   for (let i = idx; i < prime.length; i++) {
//     if (visited[i]) continue;
//     visited[i] = true;
//     sum += prime[i];
//     dfs(sum, i);
//     sum -= prime[i];
//     visited[i] = false;
//   }
// };

// dfs(0, 0);
