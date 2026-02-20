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
const map = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const camList = [];
let ans = Infinity;

for (let i = 1; i < input.length; i++) {
  map.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j] !== 6 && map[i][j] !== 0) camList.push([i, j, map[i][j]]);
  }
}

const camera = (pos, dir) => {
  for (const d of dir) {
    let nx = dx[d] + pos[0];
    let ny = dy[d] + pos[1];

    while (nx >= 0 && nx < N && ny >= 0 && ny < M && map[nx][ny] !== 6) {
      if (map[nx][ny] === 100) map[nx][ny] -= 100;
      else map[nx][ny] += 100;
      nx = nx + dx[d];
      ny = ny + dy[d];
    }
  }
};

const countArea = () => {
  let cnt = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 0) cnt++;
    }
  }
  return cnt;
};

const dfs = (depth) => {
  if (depth === camList.length) {
    ans = Math.min(ans, countArea());
    return;
  }

  const curCamera = camList[depth];

  if (curCamera[2] === 1) {
    camera(camList[depth], [0]);
    dfs(depth + 1);
    camera(camList[depth], [0]);

    camera(camList[depth], [1]);
    dfs(depth + 1);
    camera(camList[depth], [1]);

    camera(camList[depth], [2]);
    dfs(depth + 1);
    camera(camList[depth], [2]);

    camera(camList[depth], [3]);
    dfs(depth + 1);
    camera(camList[depth], [3]);
  } else if (curCamera[2] === 2) {
    camera(camList[depth], [0, 1]);
    dfs(depth + 1);
    camera(camList[depth], [0, 1]);

    camera(camList[depth], [2, 3]);
    dfs(depth + 1);
    camera(camList[depth], [2, 3]);
  } else if (curCamera[2] === 3) {
    camera(camList[depth], [1, 2]);
    dfs(depth + 1);
    camera(camList[depth], [1, 2]);

    camera(camList[depth], [1, 3]);
    dfs(depth + 1);
    camera(camList[depth], [1, 3]);

    camera(camList[depth], [0, 3]);
    dfs(depth + 1);
    camera(camList[depth], [0, 3]);

    camera(camList[depth], [0, 2]);
    dfs(depth + 1);
    camera(camList[depth], [0, 2]);
  } else if (curCamera[2] === 4) {
    camera(camList[depth], [0, 1, 2]);
    dfs(depth + 1);
    camera(camList[depth], [0, 1, 2]);

    camera(camList[depth], [0, 1, 3]);
    dfs(depth + 1);
    camera(camList[depth], [0, 1, 3]);

    camera(camList[depth], [0, 2, 3]);
    dfs(depth + 1);
    camera(camList[depth], [0, 2, 3]);

    camera(camList[depth], [1, 2, 3]);
    dfs(depth + 1);
    camera(camList[depth], [1, 2, 3]);
  } else {
    camera(camList[depth], [0, 1, 2, 3]);
    dfs(depth + 1);
    camera(camList[depth], [0, 1, 2, 3]);
  }
};

dfs(0);

console.log(ans);
