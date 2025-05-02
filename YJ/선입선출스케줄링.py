# https://school.programmers.co.kr/learn/courses/30/lessons/12920

# remain_time을 어떻게 생각할 것이냐?
# 일단 queue가 의미가 애매해 왜냐면 인덱스가 낮은 코어가 먼저 할당이 되기 때문
# 해당 시간에 사용 가능한 코어를 알아야 한다. 어떻게 알 수 있을까?
# 개인적인 생각으로는 그냥 n이 무한으로 간다고 가정했을 때 순서를 정해놓고 하자
# 시간 초과가 나오는데 이 부분은 어쩌지, 일단 30001로 설정했을 때 90점 나옴 ㅋㅋㅋㅋ
# 최소공배수마다 반복될 거라는 건 안일한 생각임. 왜냐면 작업 처리 시간이 최대 10000이기 때문에 10000 안쪽으로 최소공배수가 존재할거라는 생각을 갖다 버려야 함
# 그래서 남예준은 남자답게 포기하겠음

# 알아보니 시간 h 동안 cores[i]에서 일어날 수 있는 작업의 총 양은 h//cores[i] 래 그래서 이분탐색 쓰는 듯

def solution(n, cores):
    if n <= len(cores):
        return n
    lst = [[] for i in range(30001)] # 10001
    for i, t in enumerate(cores): # 여기서 시간 초과가 나는듯 한데
        for j in range(0,30001,t): # 10001
            lst[j].append(i + 1)
    t = n
    for i in range(30001): # 10001
        if t - len(lst[i]) <= 0: # 리스트가 더 길어 => 따라서 이번 턴에 마무리될 수 있다는 뜻
            return lst[i][t - 1]
        else:
            t -= len(lst[i])


print(solution(6, [1,2,3]))
print(solution(5, [50, 50, 50, 30])) # 4


def solution(n, cores):

    if n <= len(cores):
        return n
    else:
        n -= len(cores)
        left = 1
        right = max(cores) * n

        while left < right:
            mid = (left + right) // 2
            capacity = 0
            for c in cores:
                capacity += mid // c
            if capacity >= n:
                right = mid
            else:
                left = mid + 1

        for c in cores:
            n -= (right-1) // c

        for i in range(len(cores)):
            if right % cores[i] == 0:
                n -= 1
                if n == 0:
                    return i + 1