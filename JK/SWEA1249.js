class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const minValue = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return minValue;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      // 누적 비용을 기준으로 최소 힙 유지
      if (this.heap[parentIndex][0] <= this.heap[index][0]) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;

    while (true) {
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 2;

      let smallestIndex = index;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex][0] < this.heap[smallestIndex][0]
      ) {
        smallestIndex = leftIndex;
      }

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex][0] < this.heap[smallestIndex][0]
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex === index) {
        break;
      }

      [this.heap[index], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[index],
      ];

      index = smallestIndex;
    }
  }
}

function solution(N, map) {
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const dist = Array.from({ length: N }, () => Array(N).fill(Infinity));

  const pq = new MinHeap();

  dist[0][0] = 0;

  pq.push([0, 0, 0]);

  while (!pq.isEmpty()) {
    const [cost, x, y] = pq.pop();

    if (cost > dist[x][y]) {
      continue;
    }

    if (x === N - 1 && y === N - 1) {
      return cost;
    }

    for (const [dx, dy] of dir) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) {
        continue;
      }

      const nextCost = cost + map[nx][ny];

      if (nextCost < dist[nx][ny]) {
        dist[nx][ny] = nextCost;

        pq.push([nextCost, nx, ny]);
      }
    }
  }

  return dist[N - 1][N - 1];
}

console.log(
  solution(4, [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 0, 1, 0],
  ]),
);
