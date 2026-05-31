package JK;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Scanner;

class Solution {
  public static void main(String args[]) throws Exception {

    Scanner sc = new Scanner(System.in);
    int T;
    T = sc.nextInt();
    int[] answer = new int[T];

    int[][][] move = { {}, { { -1, 0 }, { 1, 0 }, { 0, 1 }, { 0, -1 } }, { { -1, 0 }, { 1, 0 } },
        { { 0, -1 }, { 0, 1 } },
        { { -1, 0 }, { 0, 1 } }, { { 1, 0 }, { 0, 1 } }, { { 0, -1 }, { 1, 0 } }, { { 0, -1 }, { -1, 0 } } };

    for (int i = 0; i < T; i++) {
      int N = sc.nextInt();
      int M = sc.nextInt();
      int R = sc.nextInt();
      int C = sc.nextInt();
      int L = sc.nextInt();
      Deque<int[]> que = new ArrayDeque<>();

      int[][] map = new int[N][M];
      int[][] chk = new int[N][M];

      for (int j = 0; j < N; j++) {
        for (int k = 0; k < M; k++) {
          map[j][k] = sc.nextInt();
        }
      }

      que.addFirst(new int[] { R, C });
      chk[R][C] = 1;

      while (!que.isEmpty()) {
        int[] cur = que.pollLast();
        int curX = cur[0];
        int curY = cur[1];

        int idx = map[curX][curY];

        if (chk[curX][curY] >= L) {
          continue;
        }

        for (int dir = 0; dir < move[idx].length; dir++) {
          int nx = curX + move[idx][dir][0];
          int ny = curY + move[idx][dir][1];

          if (nx < 0 || nx >= N || ny < 0 || ny >= M)
            continue;
          if (chk[nx][ny] != 0)
            continue;
          if (map[nx][ny] == 0)
            continue;
          if (linked(move[map[nx][ny]], move[idx][dir][0], move[idx][dir][1])) {
            que.addFirst(new int[] { nx, ny });
            chk[nx][ny] = chk[cur[0]][cur[1]] + 1;
          }
        }
      }

      int cnt = 0;

      for (int j = 0; j < chk.length; j++) {
        for (int k = 0; k < chk[0].length; k++) {
          if (chk[j][k] != 0)
            cnt++;
        }
      }

      answer[i] = cnt;
    }

    for (int i = 0; i < answer.length; i++) {
      System.out.println("#" + (i + 1) + " " + answer[i]);
    }
    sc.close();
  }

  public static boolean linked(int[][] next, int dx, int dy) {
    for (int i = 0; i < next.length; i++) {
      if (next[i][0] == -dx && next[i][1] == -dy) {
        return true;
      }
    }

    return false;
  }
}
