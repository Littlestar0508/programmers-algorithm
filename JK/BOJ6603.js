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

for (let i = 0; i < input.length - 1; i++) {
  const dfs = (depth, idx) => {
    if (depth === 6) {
      const line = [];
      arr.forEach((item, idx) => {
        if (visited[idx]) line.push(item);
      });
      str.push(line.join(" "));
      return;
    }

    for (let k = idx; k < arr.length; k++) {
      if (visited[k]) continue;
      visited[k] = true;
      dfs(depth + 1, k + 1);
      visited[k] = false;
    }
  };

  const str = [];
  const [n, ...arr] = input[i].split(" ").map(Number);
  const visited = Array(arr.length).fill(false);

  dfs(0, 0);
  console.log(str.join("\n"));
  console.log();
}
