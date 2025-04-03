function chk(storage, x, y) {
  const [x_len, y_len] = [storage.length, storage[0].length];
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const queue = [[x, y]];
  const visited = Array.from({ length: x_len }, () => Array(y_len).fill(0));
  visited[x][y] = 1;

  while (queue.length > 0) {
    const cur = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      const nx = cur[0] + dx[dir];
      const ny = cur[1] + dy[dir];

      if (cur[0] === 0 || cur[0] === x_len - 1 || cur[1] === 0 || cur[1] === y_len - 1) {
        return true;
      }

      if (nx >= 0 && nx < x_len && y >= 0 && y < y_len && !visited[nx][ny] && storage[nx][ny] === "0") {
        queue.push([nx, ny]);
        visited[nx][ny] = 1;
      }
    }
  }
  return false;
}

function solution(storage, requests) {
  let answer = 0;
  storage = storage.map((item) => item.split(""));

  const [x_len, y_len] = [storage.length, storage[0].length];

  for (let req of requests) {
    const remove = [];
    if (req.length === 1) {
      for (let i = 0; i < x_len; i++) {
        for (let j = 0; j < y_len; j++) {
          if (storage[i][j] === req && chk(storage, i, j)) {
            answer++;
            remove.push([i, j]);
          }
        }
      }
    } else {
      for (let i = 0; i < x_len; i++) {
        for (let j = 0; j < y_len; j++) {
          if (storage[i][j] === req.charAt(0)) {
            answer++;
            remove.push([i, j]);
          }
        }
      }
    }

    for (let r of remove) {
      const [x, y] = r;
      storage[x][y] = "0";
    }
  }
  return x_len * y_len - answer;
}
