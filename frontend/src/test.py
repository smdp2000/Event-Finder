import heapq

def median_window(nums, k):
    result = []
    max_heap, min_heap = [], []

    for i in range(len(nums)):
        # Add new number to heaps
        if not max_heap or nums[i] <= -max_heap[0]:
            heapq.heappush(max_heap, -nums[i])
        else:
            heapq.heappush(min_heap, nums[i])

        # Balance heaps
        if len(max_heap) > len(min_heap) + 1:
            heapq.heappush(min_heap, -heapq.heappop(max_heap))
        elif len(min_heap) > len(max_heap):
            heapq.heappush(max_heap, -heapq.heappop(min_heap))

        # Get median if window is complete
        if i >= k - 1:
            if len(max_heap) == len(min_heap):
                median = (min_heap[0] - max_heap[0]) / 2
            else:
                median = -max_heap[0]
            result.append(median)

            # Remove first number from heaps
            if nums[i - k + 1] <= -max_heap[0]:
                max_heap.remove(-nums[i - k + 1])
                heapq.heapify(max_heap)
            else:
                min_heap.remove(nums[i - k + 1])
                heapq.heapify(min_heap)

    return result

count =0
k=0
nums=[]

lines= ['3','7,7,7,7,17,7,7,7,7,77,7,7,7']
for line in lines:

    if(count==0):
        k=int(line)

    else:
        nums = list(map(int,line.split(','))) 
        print(nums)
        print(median_window(nums,k))
    
    count = count+1
