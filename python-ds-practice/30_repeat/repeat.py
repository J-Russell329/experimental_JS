def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """
    return_phrase = None
    if type(num) == type(1) and type(phrase) == type(''):
        if num > 0:
            return_phrase = ''
            for num in range(num):
                return_phrase += phrase
    
    return return_phrase

