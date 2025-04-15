function solution(board) {
  const ricochetMap = board.map((item) => item.split(""));

  let start;

  // 시작지점 저장
  for (let i = 0; i < ricochetMap.length; i++) {
    for (let j = 0; j < ricochetMap[0].length; j++) {
      if (ricochetMap[i][j] === "R") start = [i, j];
    }
  }

  return bfs(ricochetMap, start);
}

function bfs(map, start) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const visited = Array.from(Array(map.length), () => new Array(map[0].length).fill(false));
  // 좌표 + 이동거리를 배열에 저장
  const queue = [[...start, 0]];
  visited[start[0]][start[1]] = true;
  // index를 움직여 queue 구현
  let idx = 0;

  while (queue[idx]) {
    const cur = queue[idx];

    if (map[cur[0]][cur[1]] === "G") {
      return cur[2];
    }

    for (let dir = 0; dir < 4; dir++) {
      let nx = cur[0];
      let ny = cur[1];

      // 지정한 맵의 끝 혹은 방해물(D)에 도달했을 경우에 좌표 저장
      while (
        nx + dx[dir] >= 0 &&
        nx + dx[dir] < map.length &&
        ny + dy[dir] >= 0 &&
        ny + dy[dir] < map[0].length &&
        map[nx + dx[dir]][ny + dy[dir]] !== "D"
      ) {
        nx += dx[dir];
        ny += dy[dir];
      }

      // 방문하지 않은 곳만 탐색
      if (!visited[nx][ny]) {
        visited[nx][ny] = true;
        queue.push([nx, ny, cur[2] + 1]);
      }
    }

    idx++;
  }

  return -1;
}

console.log(solution([".D.R", "....", ".G..", "...D"]));
