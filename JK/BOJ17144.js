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

const [N, M, time] = input[0].split(" ").map(Number);

const map = [];
const clean = [];

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 1; i < input.length; i++) {
  map.push(input[i].split(" ").map(Number));
}

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j] === -1) clean.push([i, j]);
  }
}

const turnUp = () => {
  const [x, y] = clean[0];

  for (let i = x - 1; i > 0; i--) {
    map[i][0] = map[i - 1][0];
  }

  for (let i = 0; i < M - 1; i++) {
    map[0][i] = map[0][i + 1];
  }

  for (let i = 0; i < x; i++) {
    map[i][M - 1] = map[i + 1][M - 1];
  }

  for (let i = M - 1; i > 1; i--) {
    map[x][i] = map[x][i - 1];
  }

  map[x][1] = 0;
};

const turnDown = () => {
  const [x, y] = clean[1];

  for (let i = x + 1; i < N - 1; i++) {
    map[i][0] = map[i + 1][0];
  }

  for (let j = 0; j < M - 1; j++) {
    map[N - 1][j] = map[N - 1][j + 1];
  }

  for (let i = N - 1; i > x; i--) {
    map[i][M - 1] = map[i - 1][M - 1];
  }

  for (let j = M - 1; j > 1; j--) {
    map[x][j] = map[x][j - 1];
  }

  map[x][1] = 0;
};

for (let i = 0; i < time; i++) {
  const addMap = Array.from(Array(N), () => Array(M).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0 || map[i][j] === -1) continue;

      const spread = Math.floor(map[i][j] / 5);
      if (spread === 0) continue;

      for (let dir = 0; dir < 4; dir++) {
        const nx = i + dx[dir];
        const ny = j + dy[dir];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        if (map[nx][ny] === -1) continue;

        addMap[nx][ny] += spread;
        map[i][j] -= spread;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] !== -1) map[i][j] += addMap[i][j];
    }
  }

  turnUp();
  turnDown();
}

const count = () => {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      sum += map[i][j];
    }
  }

  return sum;
};

console.log(count() + 2);
