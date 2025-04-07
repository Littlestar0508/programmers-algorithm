# https://school.programmers.co.kr/learn/courses/30/lessons/159993

def solution(maps):
    def oob(x, y):
        if 0 <= x < len(maps) and 0 <= y < len(maps[0]):
            return False
        else:
            return True
        

    answer = 0
    from collections import deque
    bfs1 = [[-1 for i in range(len(maps[0]))] for j in range(len(maps))]
    bfs2 = [[-1 for i in range(len(maps[0]))] for j in range(len(maps))]
    move = [(0, 1),(1, 0),(0, -1),(-1, 0)]
    s = None
    l = None
    e = None
    for i in range(len(maps)):
        for j in range(len(maps[0])):
            if maps[i][j] == 'S': s = (i, j)
            if maps[i][j] == 'L': l = (i, j)
            if maps[i][j] == 'E': e = (i, j)

    q = deque()
    q.append(s)
    bfs1[s[0]][s[1]] = 0
    while q:
        sx, sy = q.popleft()
        for dx, dy in move:
            nx, ny = sx + dx, sy + dy
            if not oob(nx, ny) and bfs1[nx][ny] == -1 and maps[nx][ny] == 'L':
                bfs1[nx][ny] = bfs1[sx][sy] + 1
            if not oob(nx, ny) and bfs1[nx][ny] == -1 and maps[nx][ny] != "X":
                bfs1[nx][ny] = bfs1[sx][sy] + 1
                q.append((nx, ny))

    # print(*bfs1, sep = "\n")
    # print()

    q = deque()
    q.append(l)
    bfs2[l[0]][l[1]] = 0
    while q:
        sx, sy = q.popleft()
        for dx, dy in move:
            nx, ny = sx + dx, sy + dy
            if not oob(nx, ny) and bfs2[nx][ny] == -1 and maps[nx][ny] == 'E':
                bfs2[nx][ny] = bfs2[sx][sy] + 1
            if not oob(nx, ny) and bfs2[nx][ny] == -1 and maps[nx][ny] != "X":
                bfs2[nx][ny] = bfs2[sx][sy] + 1
                q.append((nx, ny))

    # print(*bfs2, sep = "\n")

    if bfs1[l[0]][l[1]] != -1 and bfs2[e[0]][e[1]] != -1:
        return bfs1[l[0]][l[1]] + bfs2[e[0]][e[1]]
    else: 
        return -1

print(solution(["SOOOL","XXXXO","OOOOO","OXXXX","OOOOE"]))
print(solution(["LOOXS","OOOOX","OOOOO","OOOOO","EOOOO"]))
