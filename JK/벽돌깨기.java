package JK;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Scanner;

class Solution {
  static int answer;

  public static void main(String args[]) throws Exception {
    Scanner sc = new Scanner(System.in);
    int T = sc.nextInt();

    for (int i = 0; i < T; i++) {
      int N = sc.nextInt();
      int W = sc.nextInt();
      int H = sc.nextInt();

      int[][] map = new int[H][W];

      for (int height = 0; height < H; height++) {
        for (int width = 0; width < W; width++) {
          map[height][width] = sc.nextInt();
        }
      }

      answer = Integer.MAX_VALUE;

      int[] selected = new int[N];
      dfs(0, N, W, H, selected, map);

      System.out.println("#" + (i + 1) + " " + answer);
    }
  }

  public static void dfs(int depth, int limit, int W, int H, int[] selected, int[][] map) {
    if (depth == limit) {
      int[][] copyMap = copy(map, W, H);

      for (int num = 0; num < selected.length; num++) {
        int[] dx = { -1, 1, 0, 0 };
        int[] dy = { 0, 0, -1, 1 };
        boolean[][] chk = new boolean[H][W];
        Deque<int[]> que = new ArrayDeque<>();

        int col = selected[num];

        for (int row = 0; row < H; row++) {
          if (copyMap[row][col] != 0) {
            que.addFirst(new int[] { row, col, copyMap[row][col] });
            copyMap[row][col] = 0;
            chk[row][col] = true;
            break;
          }
        }

        while (!que.isEmpty()) {
          int[] cur = que.pollLast();
          int curX = cur[0];
          int curY = cur[1];
          int blast = cur[2];

          for (int dist = 0; dist < blast; dist++) {
            for (int dir = 0; dir < 4; dir++) {
              int nx = curX + dx[dir] * dist;
              int ny = curY + dy[dir] * dist;

              if (nx < 0 || nx >= H || ny < 0 || ny >= W)
                continue;
              if (chk[nx][ny])
                continue;

              que.addFirst(new int[] { nx, ny, copyMap[nx][ny] });
              copyMap[nx][ny] = 0;
              chk[nx][ny] = true;
            }
          }
        }

        gravity(copyMap, H, W);
      }

      int remain = count(copyMap, H, W);
      answer = Math.min(answer, remain);

      return;
    }

    for (int col = 0; col < W; col++) {
      selected[depth] = col;
      dfs(depth + 1, limit, W, H, selected, map);
    }
  }

  public static int count(int[][] map, int H, int W) {
    int cnt = 0;

    for (int row = 0; row < H; row++) {
      for (int col = 0; col < W; col++) {
        if (map[row][col] != 0) {
          cnt++;
        }
      }
    }

    return cnt;
  }

  public static int[][] copy(int[][] map, int W, int H) {
    int[][] copyMap = new int[H][W];

    for (int i = 0; i < H; i++) {
      for (int j = 0; j < W; j++) {
        copyMap[i][j] = map[i][j];
      }
    }

    return copyMap;
  }

  public static void gravity(int[][] map, int H, int W) {
    for (int col = 0; col < W; col++) {
      int writeRow = H - 1;

      for (int row = H - 1; row >= 0; row--) {
        if (map[row][col] != 0) {
          int temp = map[row][col];
          map[row][col] = 0;
          map[writeRow][col] = temp;
          writeRow--;
        }
      }
    }
  }
}