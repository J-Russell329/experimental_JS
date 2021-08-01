from unittest import TestCase, result
from app import app
from models import db, connect_db, User


class TestsApp(TestCase):

    @classmethod
    def setUpClass(cls):
        """
        runs before any test is proformed
        """

    @classmethod
    def tearDownClass(cls):
        """
        used to tear down after all tests are ran
        """
        
       

    
    def test_home_route(self):
        """
        test number 1. should probably test the home page first. 
        """
        with app.test_client() as client:

            resp_test_1 = client.get('/')
            html_1 = resp_test_1.get_data(as_text = True)
            self.assertEqual(resp_test_1.status_code,200)
            self.assertIn('hello',html_1)


