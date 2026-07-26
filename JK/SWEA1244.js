function solution(number, N) {
  let answer = 0;
  const arr = [];

  while (number > 0) {
    arr.push(number % 10);

    number = Math.floor(number / 10);
  }

  const visited = Array.from({ length: N + 1 }, () => new Set());

  function calculateMax() {
    let result = 0;

    for (let i = 0; i < arr.length; i++) {
      result += arr[i] * 10 ** i;
    }

    return result;
  }

  function dfs(depth) {
    const key = arr.join(",");

    if (visited[depth].has(key)) return;

    visited[depth].add(key);

    if (depth === N) {
      answer = Math.max(answer, calculateMax());
      return;
    }

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const tmpA = arr[i];
        arr[i] = arr[j];
        arr[j] = tmpA;

        dfs(depth + 1);

        const tmpB = arr[i];
        arr[i] = arr[j];
        arr[j] = tmpB;
      }
    }
  }

  dfs(0);

  return answer;
}

console.log(solution(2737, 1));
