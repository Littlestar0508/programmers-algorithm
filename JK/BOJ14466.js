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

const [N, K, R] = input[0].split(" ").map(Number);

const arr = Array.from(Array(N), () => Array(N).fill(0));
const cow = [];
const bridge = new Set();

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let answer = 0;

for (let i = 1; i < 1 + R; i++) {
  const road = input[i].split(" ").map(Number).join(" ");
  bridge.add(road);
}

for (let i = input.length - K; i < input.length; i++) {
  const [x, y] = input[i].split(" ").map(Number);

  cow.push([x, y]);
}

for (let i = 0; i < cow.length; i++) {
  for (let j = i + 1; j < cow.length; j++) {
    const [x1, y1] = cow[i];
    const [x2, y2] = cow[j];

    if (!chkCross([x1 - 1, y1 - 1], [x2 - 1, y2 - 1])) answer++;
  }
}

function chkCross(start, end) {
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  const [ex, ey] = end;
  const queue = [];

  queue.push(start);
  let idx = 0;

  while (idx < queue.length) {
    const [x, y] = queue[idx++];
    visited[x][y] = true;

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (visited[nx][ny]) continue;
      if (
        bridge.has(`${x + 1} ${y + 1} ${nx + 1} ${ny + 1}`) ||
        bridge.has(`${nx + 1} ${ny + 1} ${x + 1} ${y + 1}`)
      )
        continue;

      visited[nx][ny] = true;
      queue.push([nx, ny]);
      if (ex === nx && ey === ny) return true;
    }
  }

  return false;
}

console.log(answer);
