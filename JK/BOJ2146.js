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

const arr = [];
let min = Infinity;

const N = Number(input[0]);

for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split(" ").map(Number));
}

let cnt = 1;
const visited = Array.from(Array(N), () => Array(N).fill(false));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 0) continue;
    if (visited[i][j]) continue;
    setField(i, j, cnt);
    cnt++;
  }
}

function setField(x, y, type) {
  visited[x][y] = true;
  const queue = [[x, y]];
  let idx = 0;

  while (idx < queue.length) {
    const [curX, curY] = queue[idx];

    for (let dir = 0; dir < 4; dir++) {
      const nx = curX + dx[dir];
      const ny = curY + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (visited[nx][ny]) continue;
      if (arr[nx][ny] === 0) continue;

      arr[nx][ny] = type;
      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }

    idx++;
  }

  arr[x][y] = type;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 0) continue;
    if (chkSpace(i, j)) {
      const len = bridgeLength(i, j, arr[i][j]);
      min = Math.min(min, len);
    }
  }
}

function chkSpace(x, y) {
  let chk = false;

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
    if (arr[nx][ny] !== arr[x][y]) {
      chk = true;
      break;
    }
  }

  return chk;
}

function bridgeLength(x, y, type) {
  const v = Array.from(Array(N), () => Array(N).fill(false));
  const queue = [[x, y, 0]];
  let idx = 0;
  v[x][y] = true;

  while (idx < queue.length) {
    const [curX, curY, dist] = queue[idx];

    for (let dir = 0; dir < 4; dir++) {
      const nx = curX + dx[dir];
      const ny = curY + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (v[nx][ny]) continue;
      if (arr[nx][ny] === type) {
        v[nx][ny] = true;
        queue.push([nx, ny, dist]);
      } else if (arr[nx][ny] === 0) {
        v[nx][ny] = true;
        queue.push([nx, ny, dist + 1]);
      } else {
        return dist;
      }
    }
    idx++;
  }

  return Infinity;
}

console.log(min);
