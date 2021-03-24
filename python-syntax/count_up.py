def count_up(start, stop):
    """Print all numbers from start up to and including stop.

    For example:

        count_up(5, 7)

   should print:

        5
        6
        7
    """
    if start < stop:
        while start <= stop:
            print(start)
            start += 1
    else:
        print("stoping number must be greater than starting number")

count_up(5, 7)        
