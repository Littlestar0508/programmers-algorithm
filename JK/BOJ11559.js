const fs = require("fs");
const path = require("path");

let arr = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim()
  .split(/\r?\n/);

for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i].split("");
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let remove = [];

let count = 0;
let chk,
  sol = [];

const dfs = (x, y) => {
  chk[x][y] = true;
  sol.push([x, y]);

  for (let dir = 0; dir < 4; dir++) {
    const nx = dx[dir] + x;
    const ny = dy[dir] + y;

    if (nx < 0 || nx > 11 || ny < 0 || ny > 5) continue;
    if (arr[nx][ny] === "." || arr[nx][ny] !== arr[x][y]) continue;
    if (chk[nx][ny]) continue;
    dfs(nx, ny);
  }
};

while (true) {
  sol = [];
  chk = Array.from(Array(12), () => Array(6).fill(false));

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (arr[i][j] !== "." && !chk[i][j]) dfs(i, j);
      if (sol.length > 3) sol.forEach((e) => remove.push(e));
      sol = [];
    }
  }

  if (remove.length === 0) break;

  remove.forEach((v) => (arr[v[0]][v[1]] = "."));
  remove = [];

  for (let j = 0; j < 6; j++) {
    let q = [];
    for (let i = 11; i >= 0; i--) {
      if (arr[i][j] === ".") continue;
      q.push(arr[i][j]);
    }

    for (let i = 0; i < q.length; i++) arr[11 - i][j] = q[i];
    for (let i = q.length; i < 12; i++) arr[11 - i][j] = ".";
  }

  count++;
}

console.log(count);
