print('number_compare is running')

def number_compare(a, b):
    """Report on whether a>b, b>a, or b==a
    
        >>> number_compare(1, 1)
        'Numbers are equal'
        
        >>> number_compare(-1, 1)
        'Second is greater'
        
        >>> number_compare(1, -2)
        'First is greater'
    """

    if a>b:
        return 'first number is greater'
    elif a<b:
        return "Second number is greater"
    else:
        return 'numbers are equal'

