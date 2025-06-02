// visitied는 방문 체크 배열
// length는 culture 섬에 도달할 수 있는 최소한의 거리
// indexArr은 queue
// 형태는 bfs로 풀고 있다

function solution(N, M, S, K, culture, edge) {
  const graph = Array.from(Array(N), () => []);

  for (const [a, b] of edge) {
    graph[a - 1].push(b);
    graph[b - 1].push(a);
  }

  const length = Array(N).fill(-1);
  const visited = Array(N).fill(false);
  // 처음에 queue형태로 하나씩 빼려고 했으나 시간 복잡도 최소한으로 하고자 index를 직접 표기
  let cur = 0;

  const indexArr = [];

  for (let i = 0; i < culture.length; i++) {
    // culture에 속했다면 거리는 0으로 확정 후 방문했다고 표시
    length[culture[i] - 1] = 0;
    visited[culture[i] - 1] = true;
    indexArr.push(culture[i]);
  }

  // indexArr에서 빼는 방식이 아닌 직접 index를 움직이는 방식 채택
  while (cur < indexArr.length) {
    const index = indexArr[cur++];
    visited[index - 1] = true;

    // 현재 index와 접한 점들을 탐색
    // 이것도 좋은 방법이 없을까..
    // const connected = edge.filter((item) => item.includes(index));
    for (let j = 0; j < graph[index - 1].length; j++) {
      const next = graph[index - 1][j];
      if (visited[next - 1]) continue;
      length[next - 1] = length[index - 1] + 1;
      visited[next - 1] = true;
      indexArr.push(next);
    }

    // for (let j = 0; j < connected.length; j++) {
    //   const [x, y] = connected[j];
    //   if (x === index && visited[y - 1] === false) {
    //     length[y - 1] = length[x - 1] + 1;
    //     visited[y - 1] = true;
    //     indexArr.push(y);
    //   }
    //   if (y === index && visited[x - 1] === false) {
    //     length[x - 1] = length[y - 1] + 1;
    //     visited[x - 1] = true;
    //     indexArr.push(x);
    //   }
    // }
  }

  console.log(length);

  const answer = length.filter((item) => item <= S);
  return answer.length;
}

console.log(
  solution(
    6,
    6,
    1,
    2,
    [4, 5],
    [
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 4],
      [2, 5],
      [3, 6],
    ]
  )
);
