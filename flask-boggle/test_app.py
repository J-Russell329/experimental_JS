from unittest import TestCase, result
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_game_board(self):
        with app.test_client() as client:
            resp_test_1 = client.get('/')
            html_1 = resp_test_1.get_data(as_text=True)
            resp_test_2 = client.get('/')
            html_2 = resp_test_2.get_data(as_text=True)
            

            self.assertEqual(resp_test_1.status_code, 200)
            self.assertNotEqual(html_1, html_2)
    
    def test_word_checker(self):
        with app.test_client() as client:
            with client.session_transaction() as sess:
                
                sess['game_board'] = [['C', 'K', 'P', 'L', 'H'], ['A', 'R', 'W', 'E', 'J'], ['T', 'W', 'R', 'W', 'H'], ['Y', 'K', 'U', 'M', 'C'], ['U', 'V', 'K', 'C', 'T']]
                print('*********************')
                print(sess['game_board'])
            resp_test_1 = client.post('/test-word',
            content_type='multipart/form-data', data={'word':'cat'})
            print(resp_test_1)

            html = resp_test_1.get_data(as_text=True)
            

            self.assertEqual(resp_test_1.status_code,200)
            self.assertIn('ok', html)




    # def test_test(self):
    #     with app.test_client() as client:
    #         with client.session_transaction() as sess:
    #             sess['test'] = 'bob@example.com'
    #             print('******************')
    #             print(sess['test'])


    #         response = client.post('/test')
            

    #         self.assertEqual(response.status_code,200)


    if __name__ == '__main__':
        unittest.main()
