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

const [N, L, R] = input[0].split(" ").map(Number);
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const arr = [];

for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split(" ").map(Number));
}

let answer = 0;

const bfs = (queue, visited) => {
  let sum = 0;
  let idx = 0;

  while (idx < queue.length) {
    const cur = queue[idx];
    idx++;
    sum += arr[cur[0]][cur[1]];
    visited[cur[0]][cur[1]] = true;

    for (let dir = 0; dir < 4; dir++) {
      const nx = cur[0] + dx[dir];
      const ny = cur[1] + dy[dir];

      if (nx < 0 || nx >= arr.length || ny < 0 || ny >= arr[0].length) continue;
      if (
        Math.abs(arr[cur[0]][cur[1]] - arr[nx][ny]) > R ||
        Math.abs(arr[cur[0]][cur[1]] - arr[nx][ny]) < L
      )
        continue;
      if (visited[nx][ny]) continue;

      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }

  if (queue.length > 1) {
    for (let i = 0; i < queue.length; i++) {
      arr[queue[i][0]][queue[i][1]] = Math.floor(sum / queue.length);
    }
    return true;
  }

  return false;
};

while (true) {
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  let end = false;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        if (bfs([[i, j]], visited)) {
          end = true;
        }
      }
    }
  }

  if (end) {
    answer++;
  } else {
    break;
  }
}

console.log(answer);
