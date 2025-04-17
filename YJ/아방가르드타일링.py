# https://school.programmers.co.kr/learn/courses/30/lessons/181186


# "가로길이 n, 세로길이 3"인 타일링 가짓수 판단
# n = 1 => 1, n = 2 => 3, n = 3 => 10, n = 4일때 
# 일단 n-1 케이스에 1 붙이기 + n-2 케이스에 (3-1) 곱하기 + n-3 케이스 (10-5) 곱하기
# 먼저 전항하고 전전항에서 dp[n] = dp[n-1] * 1 + dp[n-2] * 2 + dp[n-3] * 5
# 근데 뭐가 더 있지
# 4일때 생각해보자 
# 1 2 2 2  |  1 1 1 2
# 1 1 3 3  |  3 3 2 2
# 4 4 4 3  |  3 4 4 4
# 2개
# 
# 5의 경우는
# 1 1 2 2 2 | 1 1 1 2 2
# 1 3 3 3 4 | 3 4 4 4 2 + 4 케이스 * 1
# 5 5 5 4 4 | 3 3 5 5 5
# 4개
# 음 6은말이죠... 귀찮아 뒤지겠네요
# 
# 4 케이스 * 3 + 5 케이스 * 1 +
# 1 1 1 6 6 6 | 1 2 2 2 3 3 | 1 1 1 6 6 6 | 1 1 2 2 2 3
# 2 3 3 3 5 5 | 1 1 4 4 4 3 | 2 2 3 3 3 5 | 1 4 4 4 3 3
# 2 2 4 4 4 5 | 5 5 5 6 6 6 | 2 4 4 4 5 5 | 5 5 5 6 6 6
# 12개

# dp[i] = dp[i - 1] + 2 * dp[i - 2] + 5 * dp[i - 3] + 2 * dp[i - 4] + 2 * dp[i - 5] + 4 * dp[i - 6] ...
# dp[i + 3] = dp[i + 2] + 2 * dp[i + 1] + 5 * dp[i] + 2 * dp[i - 1] + 2 * dp[i - 2] + 4 * dp[i - 3] ...
# dp[i + 3] = dp[i + 2] + 2 * dp[i + 1] + 6 * dp[i] + dp[i - 1] - dp[i - 3]
# dp[i] = dp[i - 1] + 2 * dp[i - 2] + 6 * dp[i - 3] + dp[i - 4] - dp[i - 6]

def solution(n): # 시간 초과가 나버리는데 => 뭔가 점화식을 간단화 시킬 방법이 존재할 듯
    dp = [1,1,3,10]
    for i in range(4, n + 1):
        tmp = dp[i - 1] + 2 * dp[i - 2] + 5 * dp[i - 3]
        for j in range(4, i + 1):
            if j % 3 == 0:
                tmp += 4 * dp[i - j]
            else:
                tmp += 2 * dp[i - j]
        dp.append(tmp % 1000000007)
    return dp[n]

def solution(n):
    dp = [1,1,3,10,23,62,170]
    for i in range(7, n + 1):
        tmp = dp[i - 1] + 2 * dp[i - 2] + 6 * dp[i - 3] + dp[i - 4] - dp[i - 6]
        dp.append(tmp % 1000000007)
    return dp[n]

# print(solution(2))
# print(solution(3))
# print(solution(4))
print(solution(5))
print(solution(6))
print(solution(7))
print(solution(8))
print(solution(9))
print(solution(10))
print(solution(11))
print(solution(12))
print(solution(13))
print(solution(14))

