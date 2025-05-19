# https://school.programmers.co.kr/learn/courses/30/lessons/86053

# 금은, 시간, 적재량 3가지의 변수? 존재
# 이걸로 어떻게 이분탐색을 판단해야하냐라는 것
# 선입선출 스케줄링하고 비슷한 그거 같음
# 시간을 기준으로 만족하는 지 확인 => 넘치면 줄이고 적으면 늘이고

def solution(a, b, g, s, w, t):
    l = len(g)

    def available(mid):
        total = 0
        gold = 0
        silver = 0
        for i in range(l):
            # 왔다가 갔다가 다시 와야하는게 인지상정이랄까 다시 가는 건 의미가 없음
            cnt = ((mid - t[i]) // (2 * t[i])) + 1
            weight = min(cnt * w[i], g[i] + s[i]) # 최대로 갖고 갈 수 있는 한계치
            total += weight # 총량 비교해야 한 방에 이동하는 경우 체크 가능
            gold += min(weight, g[i]) # 금이 최대 적재량보다 모자란 경우와 비교
            silver += min(weight, s[i]) # 은이 최대 적재량보다 모자란 경우와 비교
        
        if total >= a + b and gold >= a and silver >= b:
            return True
        else: 
            return False

    low = 1
    high = (2 * (10 ** 9)) * (2 * (10 ** 5))

    '''
    high > low 이렇게 돌리면 무한루프가 도는 거 같소... 어떻게 해야하오 
    high = mid - 1 이런식으로 하면 오답률이 개쩌는 거 같소


    '''

    while high - 1 > low:
        mid = (low + high) // 2
        if available(mid): # 성공한 경우라서 하한의 범위를 찾아야 하지, mid 조건에 성공했으니까 더 가혹한 조건에서 되는지 체크해봐야지지
            high = mid
        else: # 실패한 경우라서 상한의 범위
            low = mid

    return high # 마지막으로 성공했던 놈이긴 함.