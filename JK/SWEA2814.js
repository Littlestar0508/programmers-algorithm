function solution(N, M, edges) {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const visited = Array(N + 1).fill(false);

  let answer = 1;

  function dfs(node, length) {
    answer = Math.max(answer, length);

    for (const next of graph[node]) {
      if (visited[next]) continue;

      visited[next] = true;

      dfs(next, length + 1);

      visited[next] = false;
    }
  }

  for (let start = 1; start <= N; start++) {
    visited[start] = true;

    dfs(start, 1);

    visited[start] = false;
  }

  return answer;
}

console.log(
  solution(3, 2, [
    [1, 2],
    [3, 2],
  ]),
);
