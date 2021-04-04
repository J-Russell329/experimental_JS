def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    true_list = []
    for item in lst:
        if  item:
            true_list.append(item)
    return true_list

    # return [val for val in lst if val]


