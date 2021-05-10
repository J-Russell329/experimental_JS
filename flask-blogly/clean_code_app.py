def is_good_user(first,last,image):
    if first == '':
        return 'first name is invalid'
    if last == '':
        last = None
    if image == '':
        image = None
    

    return [first,last,image]
    
def is_good_post(title,content):
    if title == '':
        return 'title is invalid'

    elif content == '':
        return 'content must be filled out'
    return[title,content]

def is_good_tag(name):
    if name == '':
        return 'tag name is invalid'
    
    return [name]