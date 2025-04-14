# https://school.programmers.co.kr/learn/courses/30/lessons/169199

from collections import deque

def solution(board):
    print(*board, sep = "\n")
    r = None
    g = None
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == "R": r = (i, j)
            if board[i][j] == "G": g = (i, j)

    visit = [[99999 for _ in range(len(board[0]))] for _ in range(len(board))]
    move = [(0,1),(0,-1),(1,0),(-1,0)]

    def oob(x, y):
        if 0 <= x < len(board) and 0 <= y < len(board[0]) and board[x][y] != "D":
            return False
        else:
            return True

    q = deque()
    q.append(r)
    visit[r[0]][r[1]] = 0

    while q:
        sx, sy = q.pop()
        for dx, dy in move:
            nx, ny = sx, sy
            while not oob(nx + dx, ny + dy):
                nx, ny = nx + dx, ny + dy

            if visit[nx][ny] > visit[sx][sy] + 1:
                q.append((nx, ny))
            visit[nx][ny] = min(visit[nx][ny], visit[sx][sy] + 1)

    if visit[g[0]][g[1]] == 99999:
        return -1
    else:
        return visit[g[0]][g[1]]

# print(solution(["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."])) # 7
print(solution([".D.R", "....", ".G..", "...D"])) # -1
# print(solution(["ㆍㆍㆍㆍㆍㆍㆍㆍDㆍㆍ", "ㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ", "ㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ", "ㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ", "ㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ", "ㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍㆍ", "RㆍDㆍㆍㆍㆍㆍㆍㆍㆍ", "ㆍㆍㆍDㆍㆍㆍㆍㆍㆍㆍ", "ㆍDㆍㆍDㆍㆍㆍㆍㆍㆍ", "ㆍㆍDㆍㆍDㆍㆍㆍㆍㆍ", "ㆍㆍㆍDㆍㆍDㆍㆍㆍㆍ", "ㆍㆍㆍㆍDㆍㆍㆍㆍㆍD", "ㆍㆍㆍㆍㆍDㆍDㆍㆍㆍ", "ㆍㆍㆍㆍㆍㆍㆍㆍㆍGㆍ"])) # 5
