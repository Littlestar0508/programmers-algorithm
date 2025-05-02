# https://school.programmers.co.kr/learn/courses/30/lessons/87391

# 이게 생각해보니까 자료구조에 통과하는 위치 다 지정해서 하면 시간초과날 게 뻔함
# 그러면 꼭짓점만 처리하는 게 옳아보임
# 왼쪽 이동이다 => 오른쪽으로 sy, ey 옮겨줌, 범위 나가면 고정
# 오른쪽 이동이다 => 왼쪽으로
# ...

def solution(n, m, x, y, queries):
    move = [[0,1],[0,-1],[1,0],[-1,0]] # 역으로 이동할 수 있도록 한다.
    sx, sy, ex, ey = x, y, x, y

    for q, dx in reversed(queries):
        if q == 0: # 원래 왼쪽으로 이동 => 오른쪽으로 갈 수 있어야겠죠 y가 움직입니다. 양의 방향으로요. sy가 0일 때는 sy 고정,
            if sy == 0:
                ey = min(m - 1, ey + dx)
            else:
                if sy + dx >= m: # 이건 좀 잘못되긴 함. 안된다는 거
                    return 0
                else:
                    sy = min(m-1, sy + dx)
                    ey = min(m-1, ey + dx)
        elif q == 1: # 오른쪽 이동, 따라서 역이니 왼쪽으로 감. y 대상, ey = m-1일 때 ey 고정정
            if ey == m - 1:
                sy = max(0, sy - dx)
            else:
                if ey - dx < 0:
                    return 0
                else: 
                    sy = max(0, sy - dx)
                    ey = max(0, ey - dx)
        elif q == 2: # 위로 감, 아래로 가겠지, x 대상 증가, sx = 0일 때 sx 고정, sx가 고정되고
            if sx == 0:
                ex = min(n - 1, ex + dx)
            else:
                if sx + dx >= n:
                    return 0
                else:
                    sx = min(n - 1, sx + dx)
                    ex = min(n - 1, ex + dx)
        elif q == 3: # 아래로 감, 위로 가겠지, x 대상 감소, ex = n - 1일 때 ex 고정
            if ex == n - 1:
                sx = max(0, sx - dx)
            else:
                if ex - dx < 0:
                    return 0
                else:
                    sx = max(0, sx - dx)
                    ex = max(0, ex - dx)

    # print(sx, sy, ex, ey)
    return (ex-sx+1)*(ey-sy+1)
print(solution(2, 2, 0, 0, [[2,1],[0,1],[1,1],[0,1],[2,1]]))
print(solution(2, 5, 0, 1, [[3,1],[2,2],[1,1],[2,3],[0,1],[2,1]]))