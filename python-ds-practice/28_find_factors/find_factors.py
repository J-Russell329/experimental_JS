def find_factors(test_number):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    factor_list = [ num for num in range(1,(test_number/2).__ceil__()+1) if test_number% num == 0]
    factor_list.append(test_number)
    return factor_list
