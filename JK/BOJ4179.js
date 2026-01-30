const fs = require("fs");
const path = require("path");

const input = fs
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

const [n, m] = input[0].split(" ");

const board = [];

const queF = [];
const queJ = [];
let idxF = 0;
let idxJ = 0;

for (let i = 1; i < input.length; i++) {
  board[i - 1] = input[i].split("");
}

const timeF = Array.from({ length: board.length }, () =>
  Array(board[0].length).fill(-1),
);

const timeJ = Array.from({ length: board.length }, () =>
  Array(board[0].length).fill(-1),
);

for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[0].length; j++) {
    if (board[i][j] === "J") {
      queJ.push([i, j]);
      timeJ[i][j] = 0;
    }
    if (board[i][j] === "F") {
      queF.push([i, j]);
      timeF[i][j] = 0;
    }
  }
}

while (idxF < queF.length) {
  const cur = queF[idxF];

  for (let dir = 0; dir < 4; dir++) {
    const nx = cur[0] + dx[dir];
    const ny = cur[1] + dy[dir];

    if (nx < 0 || nx >= board.length || ny < 0 || ny >= board[0].length)
      continue;
    if (timeF[nx][ny] !== -1) continue;
    if (board[nx][ny] === "#") continue;

    queF.push([nx, ny]);
    timeF[nx][ny] = timeF[cur[0]][cur[1]] + 1;
  }

  idxF++;
}

while (idxJ < queJ.length) {
  const cur = queJ[idxJ];

  for (let dir = 0; dir < 4; dir++) {
    const nx = cur[0] + dx[dir];
    const ny = cur[1] + dy[dir];

    if (nx < 0 || nx >= board.length || ny < 0 || ny >= board[0].length) {
      console.log(timeJ[cur[0]][cur[1]] + 1);
      return;
    }

    if (timeF[nx][ny] <= timeJ[cur[0]][cur[1]] + 1 && timeF[nx][ny] !== -1)
      continue;
    if (timeJ[nx][ny] !== -1) continue;
    if (board[nx][ny] === "#") continue;

    queJ.push([nx, ny]);
    timeJ[nx][ny] = timeJ[cur[0]][cur[1]] + 1;
  }

  idxJ++;
}

console.log("IMPOSSIBLE");
