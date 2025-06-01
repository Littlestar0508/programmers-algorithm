# 1. 방을 따땃하게~

# N, K = map(int, input().split())
# T = []
# for i in range(N):
#     T_i = int(input())
#     T.append(T_i)

# gap = []
# for i in range(1, N):
#     gap.append(T[i] - T[i - 1] - 1)


# gap.sort(reverse=True)
# print((T[-1] + 1) - T[0] - sum(gap[:K - 1]))
# 7, 3, 1,2,5,6,10,11,15 => {1 2 3 4 5 6 7} 8 9 {10 11 12} 13 14 {15 16} => 9

# 2. 점수 최소 최대 찾기

# N = int(input())
# board = []
# for _ in range(N):
#     board.append(list(map(int, input().split())))

# INF = 999999999
# max_dp = [[0 for i in range(N)] for j in range(N + 1)]
# min_dp = [[0 for i in range(N)] for j in range(N + 1)]

# for i in range(1, N + 1):
#     for j in range(N):
#         max_candidate = []
#         min_candidate = []
#         for t in range(-1,2):
#             if 0 <= j + t < N:
#                 max_candidate.append(max_dp[i - 1][j + t] + board[i - 1][j])
#                 min_candidate.append(min_dp[i - 1][j + t] + board[i - 1][j])
#             else:
#                 pass
#         max_dp[i][j] = max(max_candidate)
#         min_dp[i][j] = min(min_candidate)

# print(min(min_dp[-1]), max(max_dp[-1]))

# 3. 문화도시 찾아야 해요
# N, M, S, K = map(int, input().split())
# C = list(map(int, input().split()))
# graph = [[] for i in range(N + 1)]
# for _ in range(M):
#     u, v = map(int, input().split())
#     graph[u].append(v)
#     graph[v].append(u)


# from collections import deque

# visit = [-1 for _ in range(N + 1)]
# q = deque()
# for c in C:
#     q.append(c)
#     visit[c] = 0

# while q:
#     current = q.popleft()
#     for n in graph[current]:
#         if visit[n] == -1:
#             q.append(n)
#             visit[n] = visit[current] + 1

# cnt = 0
# for i in visit:
#     if i == -1:
#         pass
#     elif i <= S:
#         cnt += 1
# print(cnt)

# 4.
from collections import deque
N, T = map(int, input().split())
q = deque(enumerate(list(map(int, input().split()))))
current = 0
lst = [0 for i in range(T)]
while q:
    i, t = q.popleft()
    if t <= N:
        current += t
        lst[i] = current
    else:
        current += N
        q.append((i, t % N))

print(*lst, sep = " ")