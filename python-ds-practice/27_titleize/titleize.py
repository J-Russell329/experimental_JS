def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    count_from_spaces = 1
    return_phrase = ''

    for letter in phrase:
        if letter == ' ':

            return_phrase += letter
            count_from_spaces = 0     

        else:

            if count_from_spaces == 1:
                count_from_spaces += 1
                return_phrase += letter.upper()

            else:
                return_phrase += letter.lower()

        count_from_spaces += 1

    return return_phrase