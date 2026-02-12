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

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let answer = 0;

const arr = [];
const combination = [];

for (let i = 0; i < input.length; i++) {
  arr.push(input[i].split(""));
}

const bfs = (selected) => {
  const set = new Set(selected.map(([x, y]) => `${x},${y}`));

  let visited = new Set();
  let queue = [];

  queue.push(selected[0]);
  visited.add(`${selected[0][0]},${selected[0][1]}`);

  let count = 1;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      const key = `${nx},${ny}`;

      if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;

      if (set.has(key) && !visited.has(key)) {
        visited.add(key);
        queue.push([nx, ny]);
        count++;
      }
    }
  }

  return count === 7;
};

const dfs = (cur, countY) => {
  if (countY >= 4) return;
  if (combination.length === 7) {
    if (bfs(combination)) answer++;
    return;
  }

  for (let i = cur; i < 25; i++) {
    let x = Math.floor(i / 5);
    let y = i % 5;

    combination.push([x, y]);
    dfs(i + 1, countY + (arr[x][y] === "Y" ? 1 : 0));
    combination.pop();
  }
};

dfs(0, 0);
console.log(answer);
