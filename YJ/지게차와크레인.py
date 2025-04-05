# https://school.programmers.co.kr/learn/courses/30/lessons/388353

from collections import deque

def solution1(storage, requests):
    answer = 0

    move = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    temp = []
    for s in storage:
        temp.append(list(map(str, s)))

    storage = temp
    
    def out_of_bound(x, y):
        if 0 <= x < len(storage) and 0 <= y < len(storage[0]):
            return False
        else:
            return True

    def available(x, y):
        if x == 0 or y == 0 or x == len(storage) - 1 or y == len(storage[0]) - 1:
            return True
        from collections import deque
        q = deque()
        visit = [[0 for i in range(len(storage[0]))] for j in range(len(storage))]
        visit[x][y] = 1
        q.append((x, y))
        while q:
            sx, sy = q.popleft()
            for dx, dy in move:
                nx, ny = sx + dx, sy + dy
                if not out_of_bound(nx, ny) and not visit[nx][ny] and storage[nx][ny] == '':
                    q.append((nx, ny))
                    visit[nx][ny] = 1
                    if nx == 0 or ny == 0 or nx == len(storage) - 1 or ny == len(storage[0]) - 1:
                        return True
        return False

    def exp(req):
        lst = set()
        if len(req) == 1:
            for i in range(len(storage)):
                for j in range(len(storage[0])):
                    if available(i, j) and storage[i][j] == req:
                        lst.add((i, j))
        elif len(req) == 2:
            for i in range(len(storage)):
                for j in range(len(storage[0])):
                    if storage[i][j] == req[0]:
                        lst.add((i, j))

        for i, j in lst:
            storage[i][j] = ''

    for req in requests:
        exp(req)


    for i in range(len(storage)):
        for j in range(len(storage[0])):
            if storage[i][j] != '':
                answer += 1

    return answer

def solution(storage, requests):
    from collections import deque
    from copy import deepcopy
    answer = 0
    move = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    temp = [['' for i in range(len(storage[0]) + 2)]]
    for s in storage:
        temp.append([''] + list(map(str, s)) + [''])
    temp.append(['' for i in range(len(storage[0]) + 2)])

    def out_of_bound(x, y):
        if 0 <= x < len(temp) and 0 <= y < len(temp[0]):
            return False
        else:
            return True
        
    visit = [[0 for i in range(len(temp[0]))] for j in range(len(temp))]

    for req in requests:
        if len(req) == 1:
            lst = set()
            q = deque()
            q.append((0, 0))
            v = deepcopy(visit)
            v[0][0] = 1
            while q:
                sx, sy = q.popleft()
                for dx, dy in move:
                    nx, ny = sx + dx, sy + dy
                    if not out_of_bound(nx, ny) and temp[nx][ny] == req:
                        lst.add((nx, ny))
                    elif not out_of_bound(nx, ny) and v[nx][ny] == 0 and temp[nx][ny] == '':
                        q.append((nx, ny))
                        v[nx][ny] = 1
            for i, j in lst:
                temp[i][j] = ''

        else:
            for i in range(len(temp)):
                for j in range(len(temp[0])):
                    if temp[i][j] == req[0]:
                        temp[i][j] = ''

    for i in range(len(temp)):
        for j in range(len(temp[0])):
            if temp[i][j] != '':
                answer += 1
    

    return answer


print(solution(["AZWQY", "CAABX", "BBDDA", "ACACA"], ["A", "BB", "A"]))