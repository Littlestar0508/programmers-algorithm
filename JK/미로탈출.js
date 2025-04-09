function solution(maps) {
  const maze = maps.map((item) => item.split(""));

  let s = [];
  let l = [];

  // 시작점 세팅
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[0].length; j++) {
      if (maze[i][j] === "S") s = [i, j];
      else if (maze[i][j] === "L") l = [i, j];
    }
  }

  // 시작점 -> 레버 , 레버 -> 탈출구 거리 구하기
  const dist_a = bfs(maze, s, "L");
  const dist_b = bfs(maze, l, "E");

  // 둘 중 하나라도 도달하지 못했다면 -1 return
  if (dist_a === -1 || dist_b === -1) return -1;

  // 두 거리의 합
  return dist_a + dist_b;
}

const bfs = (arr, start, destination) => {
  let dist = 0;
  // 전달받은 미로의 크기와 같은 크기의 visited 배열 생성
  const visited = Array.from(Array(arr.length), () => new Array(arr[0].length).fill(false));

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const queue = [];
  // 거리를 포함한 위치를 초기 queue에 저장
  queue.push([...start, dist]);
  visited[start[0]][start[1]] = true;

  while (queue.length) {
    const cur = queue.shift();

    // 꺼낸 부분이 목적지와 일치하다면 return
    if (arr[cur[0]][cur[1]] === destination) return cur[2];

    for (let dir = 0; dir < 4; dir++) {
      const nx = cur[0] + dx[dir];
      const ny = cur[1] + dy[dir];

      if (nx < 0 || nx >= arr.length || ny < 0 || ny >= arr[0].length || visited[nx][ny]) continue;

      if (arr[nx][ny] !== "X") {
        visited[nx][ny] = true;
        if (arr[nx][ny] === "E") visited[nx][ny] = false;
        queue.push([nx, ny, cur[2] + 1]);
      }
    }
  }

  // 모든 칸을 순회할때까지 목적지에 도달하지 못했다면 -1 return
  return -1;
};

console.log(solution(["SOOOO", "OOOOO", "OOOOO", "OOOOO", "OOOLE"]));
