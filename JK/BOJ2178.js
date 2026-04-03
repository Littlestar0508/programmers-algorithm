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
const arr = [];
const distArr = Array.from(Array(N), () => Array(M).fill(0));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split("").map(Number));
}

function BFS(x, y) {
  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const queue = [];
  visited[x][y] = true;
  queue.push([x, y]);
  let idx = 0;

  while (idx < queue.length) {
    const [curX, curY] = queue[idx++];

    for (let dir = 0; dir < 4; dir++) {
      const nx = curX + dx[dir];
      const ny = curY + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (visited[nx][ny]) continue;
      if (arr[nx][ny] === 0) {
        visited[nx][ny] = true;
        continue;
      }

      visited[nx][ny] = true;
      queue.push([nx, ny]);
      distArr[nx][ny] = distArr[curX][curY] + 1;
    }
  }
}

BFS(0, 0);

if (distArr[N - 1][M - 1] === 0) console.log("error");
else console.log(distArr[N - 1][M - 1] + 1);
