test_list = ['things', 'and stufff', 'and even more stuff', 'here are some more things too']

def last_element(lst):
    """Return last item in list (None if list is empty.
    
        >>> last_element([1, 2, 3])
        3
        
        >>> last_element([]) is None
        True
    """
    if type(lst) == list:
        if len(lst) > 0:
            return lst[-1]
        else:
            return True    

