package JK;

import java.util.Scanner;

class 보호필름 {
  static int D, W, K;
  static int min;

  public static void main(String args[]) throws Exception {
    Scanner sc = new Scanner(System.in);
    int T;
    T = sc.nextInt();

    for (int test_case = 1; test_case <= T; test_case++) {
      D = sc.nextInt();
      W = sc.nextInt();
      K = sc.nextInt();

      int[][] film = new int[D][W];

      for (int i = 0; i < D; i++) {
        for (int j = 0; j < W; j++) {
          film[i][j] = sc.nextInt();
        }
      }

      min = Integer.MAX_VALUE;

      dfs(film, 0, 0);

      System.out.println("#" + test_case + " " + min);
    }

    sc.close();
  }

  public static boolean chkFit(int[][] film) {
    for (int i = 0; i < film[0].length; i++) {
      int cnt = 0;
      int cont = 1;
      for (int j = 1; j < film.length; j++) {
        if (film[j][i] == film[j - 1][i])
          cont++;
        else {
          cnt = Math.max(cnt, cont);
          cont = 1;
        }
      }

      cnt = Math.max(cnt, cont);
      cont = 1;

      if (cnt < K)
        return false;
    }

    return true;
  }

  public static void dfs(int[][] film, int depth, int cnt) {
    if (cnt >= min) {
      return;
    }

    if (chkFit(film)) {
      min = Math.min(min, cnt);
      return;
    }

    if (depth == D) {
      return;
    }

    int[] origin = new int[W];
    for (int i = 0; i < origin.length; i++)
      origin[i] = film[depth][i];

    dfs(film, depth + 1, cnt);

    for (int i = 0; i < W; i++) {
      film[depth][i] = 0;
    }

    dfs(film, depth + 1, cnt + 1);

    for (int i = 0; i < W; i++) {
      film[depth][i] = 1;
    }

    dfs(film, depth + 1, cnt + 1);

    for (int i = 0; i < W; i++)
      film[depth][i] = origin[i];
  }
}