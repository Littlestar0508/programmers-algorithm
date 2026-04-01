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

let [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
let cnt = 0;
let answer = 1;

let belt = [];
belt.push(0);

for (let i = 1; i < 2 * N + 1; i++) {
  belt[i] = [false, arr[i - 1]];
}

while (true) {
  // 1단계
  let tmp;

  for (let i = 2 * N; i >= 1; i--) {
    if (i === 2 * N) {
      tmp = belt[i];
      belt[i] = belt[i - 1];
    } else if (i === 1) belt[i] = tmp;
    else belt[i] = belt[i - 1];
  }

  // 2단계
  if (belt[N][0]) belt[N][0] = false;

  for (let i = N; i >= 1; i--) {
    if (i !== 1 && !belt[i][0] && belt[i][1] > 0 && belt[i - 1][0]) {
      belt[i - 1][0] = false;
      belt[i][0] = true;
      belt[i][1]--;

      if (belt[i][1] === 0) cnt++;
      if (K === cnt) {
        console.log(answer);
        return;
      }
    }
  }

  if (belt[N][0]) belt[N][0] = false;

  // 3단계
  if (belt[1][1] > 0) {
    belt[1][0] = true;
    belt[1][1]--;

    if (belt[1][1] === 0) cnt++;
    if (cnt === K) {
      console.log(answer);
      return;
    }
  }

  answer++;
}
