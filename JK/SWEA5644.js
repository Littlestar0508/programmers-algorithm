function solution(M, A, dir1, dir2, bcList) {
  let p1 = [0, 0];
  let p2 = [9, 9];
  let sum = 0;
  const dir = [
    [0, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  const aAvailable = Array.from({ length: M + 1 }, () => []);
  const bAvailable = Array.from({ length: M + 1 }, () => []);

  for (let i = 0; i <= dir1.length; i++) {
    for (const bc of bcList) {
      const x1 = p1[0];
      const y1 = p1[1];

      const x2 = p2[0];
      const y2 = p2[1];

      const x = bc[0] - 1;
      const y = bc[1] - 1;

      const range = bc[2];
      const performance = bc[3];

      if (Math.abs(x1 - x) + Math.abs(y1 - y) <= range)
        aAvailable[i].push(bcList.indexOf(bc));

      if (Math.abs(x2 - x) + Math.abs(y2 - y) <= range)
        bAvailable[i].push(bcList.indexOf(bc));
    }

    if (i < M) {
      p1[0] += dir[dir1[i]][0];
      p1[1] += dir[dir1[i]][1];

      p2[0] += dir[dir2[i]][0];
      p2[1] += dir[dir2[i]][1];
    }
  }

  for (let time = 0; time <= M; time++) {
    sum += getMaxCharge(aAvailable[time], bAvailable[time], bcList);
  }

  return sum;
}

function calculateCharge(aBC, bBC, bcList) {
  if (aBC === -1 && bBC === -1) return 0;

  if (aBC === -1) return bcList[bBC][3];

  if (bBC === -1) return bcList[aBC][3];

  if (aBC === bBC) return bcList[aBC][3];

  return bcList[aBC][3] + bcList[bBC][3];
}

function getMaxCharge(aList, bList, bcList) {
  let maxCharge = 0;

  const avaA = [-1, ...aList];
  const avaB = [-1, ...bList];

  for (const aBC of avaA) {
    for (const bBC of avaB) {
      const charge = calculateCharge(aBC, bBC, bcList);
      maxCharge = Math.max(maxCharge, charge);
    }
  }

  return maxCharge;
}

console.log(
  solution(
    20,
    3,
    [2, 2, 3, 2, 2, 2, 2, 3, 3, 4, 4, 3, 2, 2, 3, 3, 3, 2, 2, 3],
    [4, 4, 1, 4, 4, 1, 4, 4, 1, 1, 1, 4, 1, 4, 3, 3, 3, 3, 3, 3],
    [
      [4, 4, 1, 100],
      [7, 10, 3, 40],
      [6, 3, 2, 70],
    ],
  ),
);
