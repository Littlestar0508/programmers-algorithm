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

const N = Number(input[0]);

const arr = [];

for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split("").map(Number));
}

let type = 1;
const visited = Array.from(Array(N), () => Array(N).fill(false));
let answer = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 0) continue;
    if (visited[i][j]) continue;

    answer.push(chkArea(i, j));
  }
}

function chkArea(x, y) {
  visited[x][y] = true;
  const queue = [[x, y]];
  let idx = 0;

  while (idx < queue.length) {
    const [curX, curY] = queue[idx++];

    for (let dir = 0; dir < 4; dir++) {
      const nx = curX + dx[dir];
      const ny = curY + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (visited[nx][ny]) continue;
      if (arr[nx][ny] === 0) {
        visited[nx][ny] = true;
        continue;
      }

      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }

  return queue.length;
}

answer.sort((a, b) => a - b);

console.log(answer.length);
console.log(answer.join("\n"));
