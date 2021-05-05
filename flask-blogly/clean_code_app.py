def is_good_user(first,last,image):
    if first == '':
        return 'first name is invalid'
    if last == '':
        last = None
    if image == '':
        image = None
    

    return [first,last,image]
    
