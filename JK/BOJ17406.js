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

const [N, M, K] = input[0].split(" ").map(Number);

const arr = [];
const order = [];
let answer = Infinity;
let visited = Array(K).fill(false);
let selected = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

for (let i = 1; i < 1 + N; i++) {
  arr.push(input[i].split(" ").map(Number));
}

for (let i = 1 + N; i < input.length; i++) {
  order.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < order.length; i++) {
  const [x, y, size] = order[i];

  rotate(x - 1, y - 1, size);
}

function getValue(map) {
  let min = Infinity;

  map.forEach((e) => {
    min = Math.min(
      min,
      e.reduce((acc, cur) => (acc += cur), 0),
    );
  });

  return min;
}

function rotate(map, x, y, size) {
  for (let i = 1; i <= size; i++) {
    let sx = x - i;
    let sy = y - i;

    let last = map[sx][sy];

    for (let dir = 0; dir < 4; dir++) {
      for (let j = 0; j < i * 2; j++) {
        const nx = sx + dx[dir];
        const ny = sy + dy[dir];

        const tmp = last;
        last = map[nx][ny];
        map[nx][ny] = tmp;

        sx = nx;
        sy = ny;
      }
    }
  }
}

function dfs(depth) {
  if (depth === K) {
    const copy = arr.map((e) => [...e]);

    for (let i = 0; i < selected.length; i++) {
      const [x, y, size] = selected[i];
      rotate(copy, x - 1, y - 1, size);
    }

    answer = Math.min(getValue(copy), answer);
    return;
  }

  for (let i = 0; i < K; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    selected.push(order[i]);
    dfs(depth + 1);
    selected.pop();
    visited[i] = false;
  }
}

dfs(0);

console.log(answer);
