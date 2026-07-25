function solution(N, map) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const cores = [];

  let maxConnected = 0;
  let minWireLength = Infinity;

  for (let x = 1; x < N - 1; x++) {
    for (let y = 1; y < N - 1; y++) {
      if (map[x][y] === 1) {
        cores.push([x, y]);
      }
    }
  }

  function getPath(x, y, dir) {
    const path = [];

    let nx = x + dx[dir];
    let ny = y + dy[dir];

    while (nx >= 0 && nx < N && ny >= 0 && ny < N) {
      if (map[nx][ny] !== 0) return null;

      path.push([nx, ny]);

      nx += dx[dir];
      ny += dy[dir];
    }

    return path;
  }

  function dfs(idx, connectedCount, wireLength) {
    const remaining = cores.length - idx;

    if (connectedCount + remaining < maxConnected) {
      return;
    }

    if (idx === cores.length) {
      if (connectedCount > maxConnected) {
        maxConnected = connectedCount;
        minWireLength = wireLength;
      } else if (
        connectedCount === maxConnected &&
        minWireLength > wireLength
      ) {
        minWireLength = wireLength;
      }

      return;
    }

    const [x, y] = cores[idx];

    for (let dir = 0; dir < 4; dir++) {
      const path = getPath(x, y, dir);

      if (path === null) continue;

      for (const [px, py] of path) {
        map[px][py] = 2;
      }

      dfs(idx + 1, connectedCount + 1, wireLength + path.length);

      for (const [px, py] of path) {
        map[px][py] = 0;
      }
    }

    dfs(idx + 1, connectedCount, minWireLength);
  }

  dfs(0, 0, 0);

  return minWireLength;
}

console.log(
  solution(7, [
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]),
);
