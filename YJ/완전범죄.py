# https://school.programmers.co.kr/learn/courses/30/lessons/389480

def solution1(info, n, m):
    answer = 0

    l = len(info)
    # 0 부터 2^l - 1까지의 경우의 수 생김
    lst = []
    for i in range(2**l):
        temp = str(bin(i)[2:]).zfill(l)
        a = 0
        b = 0

        for j in range(len(temp)):
            if temp[j] == '1':
                b += info[j][1]
                if b >= m: break
            else:
                a += info[j][0]
                if a >= n: break

        if b >= m or a >= n: continue
        else: 
            lst.append([a, b])
            print(temp)
    if len(lst) == 0:
        return -1
    else:
        lst.sort()
        return lst[0][0]
    
# 브루트포스 시간초과 예상하긴 함.
# 다른 방법은 없을까 고민한게 DP는?
# 개 어려운데; GPT햄에게 살짝 힌트 얻었습네다;

def solution2(info, n, m):
    inf = 999999999
    # 배열의 내부 인덱스가 b 흔적 계산, 배열의 원소가 a 흔적 계산
    dp = [[inf for i in range(m)] for j in range(len(info) + 1)]
    dp[0][0] = 0

    for i in range(1, len(info) + 1):
        for j in range(m):
            # 전 거에서 a가 훔침
            dp[i][j] = min(dp[i - 1][j] + info[i - 1][0], dp[i][j])
            if j + info[i - 1][1] < m:
                # 전 거에서 b가 훔침
                dp[i][j + info[i - 1][1]] = min(dp[i - 1][j], dp[i][j + info[i - 1][1]])

    if n <= min(dp[-1]):
        return -1
    else:
        return min(dp[-1])

print(solution2([[1, 2], [2, 3], [2, 1]],4,4))