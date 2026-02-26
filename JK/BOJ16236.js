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
const shark = [2, 0];
let pos = [];

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[0].length; j++) {
    if (arr[i][j] === 9) {
      pos.push([i, j]);
      arr[i][j] = 0;
    }
  }
}

let answer = 0;

const eat = (x, y, time) => {
  arr[x][y] = 0;
  shark[1] += 1;

  if (shark[1] === shark[0]) {
    shark[1] = 0;
    shark[0]++;
  }

  pos = [[x, y]];
  answer += time;
};

const bfs = (time) => {
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  const [x, y] = pos[0];
  visited[x][y] = true;
  const queue = [[x, y, time]];
  const fish = [];
  let idx = 0;

  while (idx < queue.length) {
    const cur = queue[idx++];

    for (let dir = 0; dir < 4; dir++) {
      const nx = cur[0] + dx[dir];
      const ny = cur[1] + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (visited[nx][ny]) continue;
      if (arr[nx][ny] > shark[0]) continue;

      visited[nx][ny] = true;
      queue.push([nx, ny, cur[2] + 1]);

      if (arr[nx][ny] < shark[0] && arr[nx][ny] > 0)
        fish.push([nx, ny, cur[2] + 1]);
    }
  }

  if (fish.length === 0) return 0;

  fish.sort((a, b) => {
    if (a[2] !== b[2]) return a[2] - b[2];
    else if (a[0] !== b[0]) return a[0] - b[0];
    else return a[1] - b[1];
  });

  eat(...fish[0]);

  return fish.length;
};

while (true) {
  const count = bfs(0);
  if (count === 0) break;
}

console.log(answer);
