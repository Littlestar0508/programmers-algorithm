function solution(n) {
  let count = 0;
  const queens = [];

  // 퀸을 놓을 수 있는지 확인 하는 함수
  function possible(x, y) {
    for (const [a, b] of queens) {
      // 일직선에 위치시키는지
      if (a === x || b === y) return false;
      // 대각선에 위치시키는지
      if (Math.abs(a - x) === Math.abs(b - y)) return false;
    }

    return true;
  }

  function dfs(row) {
    // 모든 경우를 통과했다면 count 1 증가
    if (row === n) {
      count++;
      return;
    }

    // 가로열 모두 확인
    for (let i = 0; i < n; i++) {
      if (!possible(row, i)) continue;
      queens.push([row, i]);
      dfs(row + 1);
      queens.pop();
    }
  }

  dfs(0);

  return count;
}

console.log(solution(4));
