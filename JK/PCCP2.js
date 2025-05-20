function solution(k, people, edge) {
  let answer = 0;
  const depth = new Array(people.length + 1).fill(0);
  depth[1] = 1;

  const queue = [1];

  // 깊이를 저장하는 반복문
  while (queue.length > 0) {
    const curDep = queue.pop();

    const chk = edge.filter((item) => item.includes(curDep));

    for (let i = 0; i < chk.length; i++) {
      if (chk[i][0] !== curDep && chk[i][0] > curDep) {
        depth[chk[i][0]] = depth[curDep] + 1;
        queue.push(chk[i][0]);
      } else if (chk[i][1] !== curDep && chk[i][1] > curDep) {
        depth[chk[i][1]] = depth[curDep] + 1;
        queue.push(chk[i][1]);
      }
    }
  }

  let maxDep = Math.max(...depth);

  // 배열을 돌아다니며 깊이가 깊은 것부터 낮은 순서대로 더해주기
  // 단순히 깊이만 체크하는 것이 아닌 자신이 속한 노드인지도 파악
  // 자신보다 낮은 것과 연결된 노드는 하나밖에 없음 만약 여러 개 있어도 하나만 파악
  while (maxDep > 0) {
    const idx = depth.indexOf(maxDep);

    if (idx !== -1) {
      maxDep++;
      const branch = edge.find((e) => (e[0] === idx && e[1] < idx) || (e[1] === idx && e[0] < idx));
      if (branch) {
        if (branch[0] === idx) {
          answer += Math.ceil(people[branch[0] - 1] / 3);
          people[branch[1] - 1] += people[branch[0] - 1];
        }
        if (branch[1] === idx) {
          answer += Math.ceil(people[branch[1] - 1] / 3);
          people[branch[0] - 1] += people[branch[1] - 1];
        }
      }
      depth[idx] = 0;
    }
    maxDep--;
  }

  return answer;
}

console.log(
  solution(
    3,
    [2, 2, 4, 5, 3, 2, 2, 2],
    [
      [1, 2],
      [2, 3],
      [1, 4],
      [2, 5],
      [5, 6],
      [5, 7],
      [5, 8],
    ]
  )
);
