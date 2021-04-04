"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    @staticmethod
    def update_count_from_starter(starting_value = None):
        """
        updates serial_counter.txt (acting database) with either plus one or replaces file with new starter value.
        """
        if starting_value == None:
            file = open("serial_counter.txt", 'a')
            file.write('\n1')
            file.close()
        else: 
            file = open("serial_counter.txt", 'w')
            file.write(str(starting_value))
            file.close()

    # @staticmethod 
    # def get_count_from_starter():

    @staticmethod
    def get_count_from_starter():
        """
        reads infomation from serial_counter.txt (acting database) to get the current serial number in the series. 
        """
        file = open('serial_counter.txt','r')
        num = 0
        for line in file:
            num += int(line)
        file.close()
        return num

    

    def __init__(self,starter_value=None):
        """
        if starter_value is not definded it will grab the value from the data base and update serial_counter.txt for the next.

        if starter_value is defined it will grab the value from the starter_value and over write the serial_counter.txt file with the new
        """
        SerialGenerator.update_count_from_starter(starter_value)      
        self.serial_number = SerialGenerator.get_count_from_starter()
        self.starter_value = starter_value



    def __repr__(self) -> str:
        return f"SerialGenerator(starter_value = {self.serial_number})"
    
    def __str__(self) -> str:
        return f"SerialGenerator(serial_number = {self.serial_number})"


