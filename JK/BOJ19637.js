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

const [N, M] = input[0].split(" ").map(Number);

let title = [];
const scoreChk = new Set();

for (let i = 1; i < N + 1; i++) {
  let [name, score] = input[i].split(" ");
  score = Number(score);

  if (!scoreChk.has(score)) {
    title.push([name, score]);
    scoreChk.add(score);
  }
}

let answer = "";

for (let i = N + 1; i < input.length; i++) {
  let attack = Number(input[i]);
  let cur = "";

  let left = 0;
  let right = title.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (attack <= title[mid][1]) {
      right = mid - 1;
      cur = title[mid][0];
    } else {
      left = mid + 1;
    }
  }

  answer += cur + "\n";
}

console.log(answer);
