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

const graph = Array.from(Array(N + 1), () => []);

for (let i = 1; i < input.length; i++) {
  const [u, v] = input[i].split(" ").map(Number);

  graph[u].push(v);
  graph[v].push(u);
}

const visited = Array(N + 1).fill(false);

function DFS(node) {
  visited[node] = true;

  for (let i = 0; i < graph[node].length; i++) {
    if (!visited[graph[node][i]]) {
      DFS(graph[node][i]);
    }
  }
}

let cnt = 0;

for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    DFS(i);
    cnt++;
  }
}

console.log(cnt);
