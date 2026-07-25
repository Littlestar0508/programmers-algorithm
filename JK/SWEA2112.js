function solution(D, W, K, film) {
  let min = Infinity;
  dfs(0, 0);

  return min;

  function chkFit(film) {
    for (let i = 0; i < film[0].length; i++) {
      let cnt = 0;
      let cont = 1;

      for (let j = 1; j < film.length; j++) {
        if (film[j][i] === film[j - 1][i]) cont++;
        else {
          cnt = Math.max(cnt, cont);
          cont = 1;
        }
      }

      cnt = Math.max(cnt, cont);
      cont = 1;

      if (cnt < K) return false;
    }

    return true;
  }

  function dfs(depth, cnt) {
    if (cnt >= min) return;

    if (chkFit(film)) {
      min = Math.min(min, cnt);
      return;
    }

    if (depth === D) {
      return;
    }

    const origin = Array(W).fill(0);

    for (let i = 0; i < origin.length; i++) {
      origin[i] = film[depth][i];
    }

    dfs(depth + 1, cnt);

    for (let i = 0; i < W; i++) {
      film[depth][i] = 0;
    }

    dfs(depth + 1, cnt + 1);

    for (let i = 0; i < W; i++) {
      film[depth][i] = 1;
    }

    dfs(depth + 1, cnt + 1);

    for (let i = 0; i < W; i++) {
      film[depth][i] = origin[i];
    }
  }
}

console.log(
  solution(6, 8, 3, [
    [0, 0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 1],
    [0, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1],
  ]),
);
