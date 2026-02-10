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
const [...arr] = input[1].split(" ");
const answer = [];
const visited = Array(M).fill(false);

arr.sort((a, b) => a.localeCompare(b));

const chkVowel = (ch) => {
  if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u")
    return true;
  else return false;
};

const dfs = (depth, index, vowel, consonant) => {
  if (depth === N) {
    let str = "";
    arr.forEach((e, idx) => {
      if (visited[idx]) str += e;
    });
    if (vowel >= 1 && consonant >= 2) answer.push(str);
    return;
  }

  for (let i = index; i < M; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    if (chkVowel(arr[i])) dfs(depth + 1, i + 1, vowel + 1, consonant);
    else dfs(depth + 1, i + 1, vowel, consonant + 1);
    visited[i] = false;
  }
};

dfs(0, 0, 0, 0);

console.log(answer.join("\n"));
