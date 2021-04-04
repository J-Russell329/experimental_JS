from random import randint
"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    """
    on creation creates a list of words from a file. ( one word per line )

    file_name must be in the same folder.
    """

    def __repr__(self) -> str:
        return f'WordFinder({self.file_name})'

    def __init__(self,file_name):
        """ initalizes the file"""
        self.file_name = file_name 
        self.word_list= self.get_word_list(file_name)

    def get_word_list(self,file_name):
        """ creates a word list based on a certain file location. file must have the words on their own line."""
        temp_word_list = []
        words = open(file_name,'r')
        for line in words:
            # more versitle way albiet potentailly slower
            temp_word_list.append(''.join([letter for letter in line if not letter == '\n']))
            # potentailly faster way of doing it assuming the data is all marked up the same way
            # temp_word_list.append(line[:len(line)-1]) 
        words.close()
        return temp_word_list

    def random(self):
        """ returns a random word from the self.word_list list """
        return self.word_list[randint(0,len(self.word_list))]

class SpecialWordFinder(WordFinder):
    """
    """
    def __repr__(self):
        return f'SpecialWordFinder({self.file_name})'

    def __init__(self,file_name):
        super().__init__(file_name)
        self.word_list = self.get_word_dict(file_name)
    
    def get_word_dict(self,file_name):
        """ finds """
        temp_word_dict = {}
        temp_list_key = ''
        words = open(file_name,'r')
        used_keys = set()
        
        for line in words:

            word = line.replace('\n','').strip()

            if line.count('#') > 0:
                temp_list_key = word.replace('#','').strip()
                
    
                if not temp_list_key == "" and not temp_list_key in used_keys:
                    temp_word_dict[temp_list_key] = []
                    used_keys.add(temp_list_key)

            if len(word) > 0 and not word.replace('#','').strip() == temp_list_key:

                if temp_list_key == '':
                    try:
                        temp_word_dict['misc']
                    except:
                        temp_word_dict['misc'] = []
                        
                    temp_word_dict['misc'].append(word.replace('#','').strip())

                else: 
                    word = word.replace('#','').strip()
                    temp_word_dict[temp_list_key].append(word)

        return temp_word_dict
        
            






