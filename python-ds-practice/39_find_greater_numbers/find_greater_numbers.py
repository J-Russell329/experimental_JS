def find_greater_numbers(nums):
    """Return # of times a number is followed by a greater number.

    For example, for [1, 2, 3], the answer is 3:
    - the 1 is followed by the 2 *and* the 3
    - the 2 is followed by the 3

    Examples:
        examples are a bit outdated: 


        >>> find_greater_numbers([1, 2, 3])
        3

        >>> find_greater_numbers([6, 1, 2, 7])
        4

        >>> find_greater_numbers([5, 4, 3, 2, 1])
        0

        >>> find_greater_numbers([])
        0
    """


    higher_count = 0
  
    if len(nums) > 0:
        last_num = nums[0]
        for num in nums:
            if num > last_num:
                higher_count += 1
            last_num = num
    return higher_count

    # answer provided in solutions page does not produce the same results as what the examples expects:


    # count = 0

    # for i in range(len(nums)):
    #     for j in range(i + 1, len(nums)):
    #         if nums[j] > nums[i]:
    #             count += 1

    #     return count