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

const lab = [];
const selected = [];
const empty = [];
const virus = [];
let answer = 0;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 1; i < input.length; i++) {
  lab.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (lab[i][j] === 0) empty.push([i, j]);
    if (lab[i][j] === 2) virus.push([i, j]);
  }
}

const chk = new Array(empty.length).fill(false);

function combination(depth, idx) {
  if (depth === 3) {
    const deepCopyLab = lab.map((row) => [...row]);
    for (const [x, y] of selected) deepCopyLab[x][y] = 1;
    spreadVirus(deepCopyLab);
    return;
  }

  for (let i = idx; i < empty.length; i++) {
    if (chk[i]) continue;

    selected.push(empty[i]);
    chk[i] = true;
    combination(depth + 1, i + 1);
    chk[i] = false;
    selected.pop();
  }
}

function spreadVirus(map) {
  const queue = [];
  let idx = 0;
  const visited = Array.from(Array(map.length), () =>
    Array(map[0].length).fill(false),
  );

  for (const [x, y] of virus) {
    queue.push([x, y]);
    visited[x][y] = true;
  }

  while (idx < queue.length) {
    const [curX, curY] = queue[idx++];

    for (let dir = 0; dir < 4; dir++) {
      const nx = curX + dx[dir];
      const ny = curY + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (visited[nx][ny]) continue;
      if (map[nx][ny] === 1) continue;

      map[nx][ny] = 2;
      visited[nx][ny] = true;
      queue.push([nx, ny]);
    }
  }

  answer = Math.max(chkSafeArea(map), answer);
}

function chkSafeArea(map) {
  let cnt = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 0) cnt++;
    }
  }

  return cnt;
}

combination(0, 0);
console.log(answer);
