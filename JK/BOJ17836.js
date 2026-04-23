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

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const queue = [];
const [N, M, T] = input[0].split(" ").map(Number);

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array(2).fill(false)),
);

const map = [];

for (let i = 1; i < input.length; i++) {
  map.push(input[i].split(" ").map(Number));
}

queue.push([0, 0, 0, 0]);
visited[0][0][0] = true;

let idx = 0;
let answer = Infinity;

while (idx < queue.length) {
  const [curX, curY, curTime, hasGram] = queue[idx++];

  if (curTime > T) continue;

  if (curX === N - 1 && curY === M - 1) {
    answer = Math.min(answer, curTime);
    continue;
  }

  for (let dir = 0; dir < 4; dir++) {
    const nx = curX + dx[dir];
    const ny = curY + dy[dir];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

    if (hasGram) {
      if (visited[nx][ny][1]) continue;
      visited[nx][ny][1] = true;
      queue.push([nx, ny, curTime + 1, 1]);
    } else {
      if (map[nx][ny] === 1) continue;

      if (map[nx][ny] === 2) {
        if (visited[nx][ny][1]) continue;
        visited[nx][ny][1] = true;
        queue.push([nx, ny, curTime + 1, 1]);
      } else {
        if (visited[nx][ny][0]) continue;
        visited[nx][ny][0] = true;
        queue.push([nx, ny, curTime + 1, 0]);
      }
    }
  }
}

if (answer <= T) {
  console.log(answer);
} else {
  console.log("Fail");
}
