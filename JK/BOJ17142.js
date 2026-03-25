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
for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split(" ").map(Number));
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let min = Infinity;
const selected = [];
const virus = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 2) virus.push([i, j]);
  }
}

const chk = Array(virus.length).fill(false);

function combination(depth, idx) {
  if (depth === M) {
    const time = chkTime(selected);
    if (time !== -1) min = Math.min(min, time);
    return;
  }

  for (let i = idx; i < virus.length; i++) {
    if (chk[i]) continue;
    selected.push(virus[i]);
    chk[i] = true;
    combination(depth + 1, i + 1);
    selected.pop();
    chk[i] = false;
  }
}

function chkTime(comb) {
  const chkMap = Array.from(Array(N), () => Array(N).fill(-1));
  const queue = [];

  for (let i = 0; i < comb.length; i++) {
    const [x, y] = comb[i];
    queue.push([x, y]);
    chkMap[x][y] = 0;
  }

  let idx = 0;
  while (idx < queue.length) {
    const cur = queue[idx];

    for (let dir = 0; dir < 4; dir++) {
      const nx = cur[0] + dx[dir];
      const ny = cur[1] + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (arr[nx][ny] === 1) continue;
      if (chkMap[nx][ny] !== -1) continue;

      queue.push([nx, ny]);
      chkMap[nx][ny] = chkMap[cur[0]][cur[1]] + 1;
    }
    idx++;
  }

  return chkMax(chkMap);
}

function chkMax(array) {
  let max = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] === 0) {
        if (array[i][j] === -1) return -1;
        max = Math.max(array[i][j], max);
      }
    }
  }
  return max;
}

combination(0, 0);

console.log(min === Infinity ? -1 : min);
