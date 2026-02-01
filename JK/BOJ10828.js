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

const map = new Map();
const answer = [];
let idx = 1;

for (let i = 1; i <= +input[0]; i++) {
  const [order, num] = input[i].split(" ");

  switch (order) {
    case "push":
      map.set(idx, num);
      idx++;
      break;

    case "pop":
      if (map.size === 0) answer.push(-1);
      else {
        answer.push(map.get(idx - 1));
        map.delete(idx - 1);
        idx--;
      }
      break;

    case "size":
      answer.push(map.size);
      break;

    case "empty":
      if (map.size === 0) answer.push(1);
      else answer.push(0);
      break;

    case "top":
      if (map.size === 0) answer.push(-1);
      else answer.push(map.get(idx - 1));
      break;
  }
}

console.log(answer.join("\n"));
