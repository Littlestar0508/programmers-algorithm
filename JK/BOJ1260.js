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

const answer = [];
const [N, M, V] = input[0].split(" ").map(Number);

const graph = Array.from(Array(N + 1), () => Array(N + 1).fill(0));

for (let i = 1; i < input.length; i++) {
  let [row, column] = input[i].split(" ").map(Number);

  graph[row][column] = 1;
  graph[column][row] = 1;
}

const dfsV = new Array(N + 1).fill(false);
const dfs = [];
const bfsV = new Array(N + 1).fill(false);
const bfs = [];

function DFS(V) {
  dfsV[V] = true;
  dfs.push(V);

  for (let i = 1; i < graph.length; i++) {
    if (graph[V][i] === 1 && dfsV[i] === false) DFS(i);
  }
}

function BFS(V) {
  const queue = [];
  bfsV[V] = true;
  bfs.push(V);
  queue.push(V);
  let idx = 0;

  while (idx < queue.length) {
    let cur = queue[idx++];

    for (let i = 1; i < graph.length; i++) {
      if (graph[cur][i] === 1 && bfsV[i] === false) {
        bfsV[i] = true;
        queue.push(i);
        bfs.push(i);
      }
    }
  }
}

DFS(V);
BFS(V);

console.log(dfs.join(" "));
console.log(bfs.join(" "));
