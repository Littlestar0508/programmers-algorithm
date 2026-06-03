package JK;

import java.util.Scanner;

class Solution {
  public static void main(String args[]) throws Exception {

    Scanner sc = new Scanner(System.in);
    int T;
    T = sc.nextInt();

    for (int test_case = 1; test_case <= T; test_case++) {
      int K = sc.nextInt();
      int[][] magnet = new int[4][8];
      int[] idx = new int[4];
      int answer = 0;

      for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 8; j++) {
          magnet[i][j] = sc.nextInt();
        }
      }

      for (int i = 0; i < K; i++) {
        int target = sc.nextInt();
        int dir = sc.nextInt();

        boolean[] allTarget = findTarget(target, magnet, idx);

        for (int num = 0; num < allTarget.length; num++) {
          if (allTarget[num]) {
            if ((target - 1 - num) % 2 == 0) {
              idx[num] = convertIdx(idx[num], -dir);
            } else {
              idx[num] = convertIdx(idx[num], dir);
            }
          }
        }
      }

      for (int ans = 0; ans < 4; ans++) {
        if (magnet[ans][idx[ans]] == 1)
          answer += Math.pow(2, ans);
      }

      System.out.println("#" + test_case + " " + answer);
    }

    sc.close();
  }

  public static boolean[] findTarget(int target, int[][] magnet, int[] idx) {
    boolean[] newTarget = new boolean[4];

    int start = target - 1;
    newTarget[start] = true;

    for (int i = start; i > 0; i--) {

      if (magnet[i - 1][convertIdx(idx[i - 1], 2)] != magnet[i][convertIdx(idx[i], -2)]) {
        newTarget[i - 1] = true;
      } else {
        break;
      }
    }

    for (int i = start; i < 3; i++) {
      if (magnet[i][convertIdx(idx[i], 2)] != magnet[i + 1][convertIdx(idx[i + 1], -2)]) {
        newTarget[i + 1] = true;
      } else {
        break;
      }
    }

    return newTarget;
  }

  public static int convertIdx(int idx, int add) {
    if (idx + add > 7) {
      return idx + add - 8;
    }

    if (idx + add < 0) {
      return idx + add + 8;
    }

    return idx + add;
  }
}
