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

const idxG = [0, 0, 0, 0];

function top(idx, dir) {
  idx = idx + dir;
  if (idx < 0) return 7;
  if (idx > 7) return 0;
  return idx;
}

function right(idx) {
  if (idx + 2 > 7) return idx - 6;
  return idx + 2;
}

function left(idx) {
  if (idx - 2 < 0) return idx + 6;
  return idx - 2;
}

for (let i = 5; i < input.length; i++) {
  const [pos, direction] = input[i].split(" ").map(Number);

  const dirG = [];

  if (direction < 0) {
    dirG.push(1);
    dirG.push(-1);
  }
  if (direction > 0) {
    dirG.push(-1);
    dirG.push(1);
  }

  if (pos === 1) {
    const turn = Array(4).fill(false);
    turn[0] = true;

    for (let i = 1; i < 4; i++) {
      if (
        input[i - 1].charAt(right(idxG[i - 1])) !==
        input[i].charAt(left(idxG[i]))
      )
        turn[i] = true;
      else break;
    }

    for (let i = 0; i < 4; i++) {
      const k = Math.abs(pos - i + 1) % 2;
      if (turn[i]) {
        idxG[i] = top(idxG[i], dirG[k]);
      }
    }
  }

  if (pos === 2) {
    const turn = [false, true, false, false];

    if (
      input[pos - 2].charAt(right(idxG[pos - 2])) !==
      input[pos - 1].charAt(left(idxG[pos - 1]))
    )
      turn[0] = true;

    if (
      input[pos - 1].charAt(right(idxG[pos - 1])) !==
      input[pos].charAt(left(idxG[pos]))
    )
      turn[2] = true;

    if (
      turn[2] &&
      input[pos].charAt(right(idxG[pos])) !==
        input[pos + 1].charAt(left(idxG[pos + 1]))
    )
      turn[3] = true;

    for (let i = 0; i < 4; i++) {
      const k = Math.abs(pos - i + 1) % 2;
      if (turn[i]) {
        idxG[i] = top(idxG[i], dirG[k]);
      }
    }
  }

  if (pos === 3) {
    const turn = [false, false, true, false];

    if (
      input[pos - 2].charAt(right(idxG[pos - 2])) !==
      input[pos - 1].charAt(left(idxG[pos - 1]))
    )
      turn[1] = true;
    if (
      input[pos - 1].charAt(right(idxG[pos - 1])) !==
      input[pos].charAt(left(idxG[pos]))
    )
      turn[3] = true;
    if (
      turn[1] &&
      input[pos - 2].charAt(left(idxG[pos - 2])) !==
        input[pos - 3].charAt(right(idxG[pos - 3]))
    )
      turn[0] = true;

    for (let i = 0; i < 4; i++) {
      const k = Math.abs(pos - i + 1) % 2;
      if (turn[i]) {
        idxG[i] = top(idxG[i], dirG[k]);
      }
    }
  }

  if (pos === 4) {
    const turn = [false, false, false, true];
    for (let i = 3; i > 0; i--) {
      if (
        input[i].charAt(left(idxG[i])) !==
        input[i - 1].charAt(right(idxG[i - 1]))
      )
        turn[i - 1] = true;
      else break;
    }

    for (let i = 0; i < 4; i++) {
      const k = Math.abs(pos - i + 1) % 2;
      if (turn[i]) {
        idxG[i] = top(idxG[i], dirG[k]);
      }
    }
  }
}

let answer = 0;

for (let i = 0; i < 4; i++) {
  if (input[i].charAt(idxG[i]) === "1") answer += 2 ** i;
}

console.log(answer);
