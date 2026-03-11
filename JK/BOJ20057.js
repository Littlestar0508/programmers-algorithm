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
const map = [];

for (let i = 1; i < input.length; i++) {
  map.push(input[i].split(" ").map(Number));
}

const START = [Math.floor(N / 2), Math.floor(N / 2)];
let answer = 0;

const leftDir = [
  [-1, 0, 0.07],
  [1, 0, 0.07],
  [-2, 0, 0.02],
  [2, 0, 0.02],
  [-1, 1, 0.01],
  [1, 1, 0.01],
  [-1, -1, 0.1],
  [1, -1, 0.1],
  [0, -2, 0.05],
  [0, -1, 0],
];

const rightDir = leftDir.map((e) => [e[0], -e[1], e[2]]);
const downDir = leftDir.map((e) => [-e[1], e[0], e[2]]);
const upDir = leftDir.map((e) => [e[1], e[0], e[2]]);

let cnt = 1;

while (cnt < N) {
  move(leftDir, 0, -1, cnt);
  move(downDir, 1, 0, cnt);
  cnt++;

  move(rightDir, 0, 1, cnt);
  move(upDir, -1, 0, cnt);
  cnt++;
}

move(leftDir, 0, -1, N - 1);

function move(dir, y, x, count) {
  for (let i = 0; i < count; i++) {
    let spread = 0;

    START[0] = START[0] + y;
    START[1] = START[1] + x;

    for (let i = 0; i < dir.length; i++) {
      let sand = 0;
      const ny = START[0] + dir[i][0];
      const nx = START[1] + dir[i][1];

      if (dir[i][2] === 0) {
        sand = map[START[0]][START[1]] - spread;
      } else {
        sand = Math.floor(map[START[0]][START[1]] * dir[i][2]);
      }

      if (nx >= 0 && nx < N && ny >= 0 && ny < N) map[ny][nx] += sand;
      else answer += sand;
      spread += sand;
    }

    map[START[0]][START[1]] = 0;
  }
}

console.log(answer);
