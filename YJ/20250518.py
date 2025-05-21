# def solution(arr):
#     answer = 0
#     N = len(arr)
#     M = len(arr[0])

#     # heights[i]는 열 i에서 지금까지 연속된 0의 개수
#     heights = [0] * M

#     for i in range(N):
#         for j in range(M):
#             if arr[i][j] == 0:
#                 heights[j] += 1
#             else:
#                 heights[j] = 0

#         # 각 행마다 히스토그램 최대 넓이 계산
#         stack = [-1]  # 0번째부터 시작하니까 base index, 히스토그램이 오름차순이 될 수 있도록 만드는 열 위치
#         for idx in range(M + 1):  # 마지막에 0 추가된 것처럼 처리
#             cur_height = heights[idx] if idx < M else 0
#             while stack[-1] != -1 and heights[stack[-1]] > cur_height:
#                 h = heights[stack.pop()] # 현재 인덱스보다 높이 높거나 같은 곳, pop을 해주는 건 현재 높이가 스택의 top보다 낮아졌으니 top 인덱스 기준으로 왼쪽으로 확장가능한 최대 너비를 계산할 시점이라는 뜻
#                 w = idx - stack[-1] - 1 # 위에 pop한 h를 만족하는 w위치
#                 answer = max(answer, h * w)
#             stack.append(idx)

#     return answer


# print(
#     solution(
#         [
#             [0, 0, 1, 0],
#             [0, 0, 0, 0],
#             [0, 1, 0, 0],
#             [0, 0, 0, 0]
#         ]
#     )
# )

###############################################################################################

# def solution(n, k, core, score):
#     answer = []
#     for i in range(len(score)):
#         b = True
#         for j in range(len(score[i])):
#             if j + 1 in core and score[i][j] < 3:
#                 b = False
#         if sum(score[i]) < k:
#             b = False
#         if b:
#             answer.append(i + 1)
#     return answer

# print(solution(5, 20, [1, 3], [[3,10,20,11,6], [2,10,10,11,6], [3,10,7,11,6], [3,10,20,1,6]]))

###############################################################################################

# import math
# answer = 0
# def solution(k, people, edge):
#     total = sum(people)
#     graph = [[0 for _ in range(len(people))] for _ in range(len(people))]
    
#     for e1, e2 in edge:
#         graph[e1 - 1][e2 - 1] = 1
#         graph[e2 - 1][e1 - 1] = 1
#     stack = []

#     def postorder(i):
#         global answer
#         stack.append(i)
#         for j in range(len(graph[0])): # 자식 노드 있는지 확인하는 과정
#             if j not in stack and graph[i][j] == 1:
#                 postorder(j)
#         # 여기에 온 애들은 자식이 없거나 이미 스택에 다 넣은 애들임
#         if people[0] == total: # 마지막에 연결 아무것도 안된 루트가 다음 코드 실행 안하도록 제어
#             pass
#         else:
#             answer = answer + math.ceil(people[i] / k)
#             for j in range(len(graph[0])): # 부모 찾기 시퀀스
#                 if graph[i][j] == 1: # 리프노드이기 때문에 부모는 하나임
#                     people[j] += people[i] # 사람 옮기기
#                     people[i] = 0
#                     graph[i][j] = 0 # 연결 끊기
#                     graph[j][i] = 0 
#                     break # 쓸모없는 반복문 패스하기
#             # print(people, answer)
#             # print(*graph, sep = "\n")
#             # print()

#     postorder(0)
    
#     return answer

# print(solution(3, [2,2,4,5,3,2,2,2], [[1,2],[2,3],[1,4],[2,5],[5,6],[5,7],[5,8]]))
# print(solution(1, [1,1,1,1,1,1,1], [[1,2],[1,3],[1,4],[5,3],[5,6],[5,7]]))

###############################################################################################

# def switch_one(arr, s, digit, n): # 하나만 돌리기기
#     temp = ""
#     carry = 0
#     for i in reversed(range(len(s))):
#         if i + 1 == digit:
#             if n == 1:
#                 temp = str((int(s[i]) + 1) % (arr[i] + 1)) + temp
#                 if int(s[i]) + 1 > arr[i]:
#                     carry = 1
#             else:
#                 temp = str((int(s[i]) - 1) % (arr[i] + 1)) + temp
#                 if int(s[i]) - 1 < 0:
#                     carry = -1
#         else:
#             if carry == 0:
#                 temp = s[i] + temp
#             elif carry == 1:
#                 if int(s[i]) + 1 > arr[i]:
#                     carry = 1
#                 else:
#                     carry = 0
#                 temp = str((int(s[i]) + 1) % (arr[i] + 1)) + temp
#             else:
#                 if int(s[i]) - 1 < 0:
#                     carry = -1
#                 else:
#                     carry = 0
#                 temp = str((int(s[i]) - 1) % (arr[i] + 1)) + temp
#     return temp
    
# def switch_all(arr, s, n): # 다 돌리기
#     temp = ""
#     if n == 1:
#         for i in range(len(s)):
#             temp += str((int(s[i]) + 1) % (arr[i] + 1))
#     else:
#         for i in range(len(s)):
#             temp += str((int(s[i]) - 1) % (arr[i] + 1))

#     return temp

# from collections import deque
# def solution(arr, num, password):
#     queue = deque()
#     queue.append((num, 0))
#     visit = {}
#     visit[num] = 0

#     while queue:
#         current, k = queue.popleft()
#         for t in [1, -1]:
#             next = switch_all(arr, current, t)
#             if next not in visit.keys():
#                 queue.append((next, k + 1))
#                 visit[next] = k + 1
#             elif visit[next] > k + 1:
#                 queue.append((next, k + 1))
#                 visit[next] = k + 1

#         for i in range(1, len(arr) + 1):
#             for t in [1, -1]:
#                 next = switch_one(arr, current, i, t)
#                 if next not in visit.keys():
#                     queue.append((next, k + 1))
#                     visit[next] = k + 1
#                 elif visit[next] > k + 1:
#                     queue.append((next, k + 1))
#                     visit[next] = k + 1
    
#     if password not in visit.keys():
#         return -1
#     return visit[password]
    

# print(solution([3,4,5,6], "1111", "2223"))
# print(solution([3,4,5,6], "1111", "0006"))

###############################################################################################

# open인 괄호의 노드 모아놓고
# close인 괄호의 노드 모아놓고
# DFS를 조져?
# def solution(k, node, edge):
#     answer = 0
#     return answer

# print(solution(4, "((())", [[1,2], [1,3], [2,3], [2,4], [3,5], [4, 5]]))