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
let [rx, ry, head] = input[1].split(" ").map(Number);

const arr = [];
for (let i = 2; i < input.length; i++) {
  arr.push(input[i].split(" ").map(Number));
}

let answer = 0;

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const turn = (idx) => {
  idx--;
  if (idx < 0) return 3;
  return idx;
};

const chkEmpty = (pos) => {
  const [x, y] = pos;
  for (let dir = 0; dir < 4; dir++) {
    if (
      x + dx[dir] < 0 ||
      x + dx[dir] >= N ||
      y + dy[dir] < 0 ||
      y + dy[dir] >= M
    )
      continue;
    if (arr[x + dx[dir]][y + dy[dir]] === 0) return true;
  }

  return false;
};

while (true) {
  if (arr[rx][ry] === 0) {
    answer++;
    arr[rx][ry] = 2;
  }

  if (chkEmpty([rx, ry])) {
    head = turn(head);

    while (arr[rx + dx[head]][ry + dy[head]] !== 0) {
      head = turn(head);
    }

    rx = rx + dx[head];
    ry = ry + dy[head];
  } else {
    if (
      arr[rx - dx[head]][ry - dy[head]] === 1 ||
      rx - dx[head] < 0 ||
      rx - dx[head] >= N ||
      ry - dy[head] < 0 ||
      ry - dy[head >= M]
    )
      break;
    else {
      rx = rx - dx[head];
      ry = ry - dy[head];
    }
  }
}

console.log(answer);
