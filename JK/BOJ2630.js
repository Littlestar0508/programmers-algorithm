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

const length = +input[0];

const answer = [0, 0];

const board = [];
for (let i = 1; i < input.length; i++) {
  board[i - 1] = input[i].split(" ").map(Number);
}

const chk = (x, y, z) => {
  for (let i = x; i < x + z; i++) {
    for (let j = y; j < y + z; j++) {
      if (board[i][j] !== board[x][y]) return false;
    }
  }

  return true;
};

const recursion = (x, y, z) => {
  if (chk(x, y, z)) {
    answer[board[x][y]]++;
    return;
  }

  const n = z / 2;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      recursion(x + n * i, y + n * j, n);
    }
  }
};

recursion(0, 0, length);

console.log(answer[0]);
console.log(answer[1]);
