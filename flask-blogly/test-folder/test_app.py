from unittest import TestCase, result
from app import app
from models import db, connect_db, User


class TestsApp(TestCase):

    @classmethod
    def setUpClass(cls):
        """
        creates 5 people with unique names so that we can test with them. 
        """
        test_1 = User(first_name='Tone', last_name = 'Danka', image_url = "https://images1.fanpop.com/images/image_uploads/doggy-wallpapers-dogs-1153143_1024_768.jpg")
        test_2 = User(first_name='Berny', last_name = 'Portia')
        test_3 = User(first_name='Maurine', last_name = 'Winnifred')
        test_4 = User(first_name='Houston', last_name = 'Penny')
        test_5 = User(first_name='Foster', last_name = 'Agnes')
        db.session.add_all([test_1,test_2,test_3,test_4,test_5])
        # db.session.add(test_1)
        db.session.commit()
        # print(User.query.all())

    @classmethod
    def tearDownClass(cls):
        """
        tears down the created users.
        finds by getting the id created by test_1 from
        setupmethod and then adds  to get the other id's 
        """
        first = User.query.filter_by(first_name='Tone').first()
        User.query.filter(User.id>=first.id, User.id <= first.id+5).delete()
        # db.session.delete(test_1)
        # db.session.delete(test_2)
        # db.session.delete(test_3)
        # db.session.delete(test_4)
        # db.session.delete(test_5)
        db.session.commit()

    
    def test_home_route(self):
        """
        makes sure that the home route will redirect into the '/users/' route... as of section 1
        """
        with app.test_client() as client:

            resp_test_1 = client.get('/',follow_redirects=True)
            html_1 = resp_test_1.get_data(as_text = True)
            self.assertEqual(resp_test_1.status_code,200)
            self.assertIn('Redirect (302)',html_1)
            self.assertIn('<p>Location: <a href="/users">/users</a></p>',html_1)

            # print('*************')
            # print(html_1)
            # print('*************')

    def test_users_route(self):
        """
        makes sure that multiple users will show up on the page.
        """
        with app.test_client() as client:
            berny = User.query.filter(User.first_name == 'Berny').first()
            resp_test_1 = client.get('/users')
            html_1 = resp_test_1.get_data(as_text = True)
            self.assertEqual(resp_test_1.status_code,200)
            self.assertIn(f'<a href="/users/{berny.id}"><li>Berny Portia</li></a>',html_1)
            self.assertIn('Houston Penny',html_1)
            self.assertIn('Maurine Winnifred',html_1)

    def test_users_page_route(self):
        """
        checks to see if the route for each person is in working order.
        """
        berny = User.query.filter(User.first_name == 'Berny').first()
        tone = User.query.filter(User.first_name == 'Tone').first()


        with app.test_client() as client:
            resp_test_1 = client.get(f'/users/{berny.id}')
            html_1 = resp_test_1.get_data(as_text=True)
            self.assertEqual(resp_test_1.status_code,200)
            # print(html_1)
            self.assertIn(f"/users/{berny.id}/edit",html_1)
            self.assertIn(f"/users/{berny.id}/delete",html_1)
            self.assertIn(f"<h1>Berny Portia</h1>",html_1)
            self.assertIn(f'src="https://cybergisxhub.cigi.illinois.edu/wp-content/uploads/2020/10/Portrait_Placeholder.png"',html_1)

            resp_test_2 = client.get(f'/users/{tone.id}')
            html_2 = resp_test_2.get_data(as_text=True)
            self.assertEqual(resp_test_2.status_code,200)
            self.assertIn(f"/users/{tone.id}/edit",html_2)
            self.assertIn(f"/users/{tone.id}/delete",html_2)
            self.assertIn(f"<h1>Tone Danka</h1>",html_2)
            self.assertIn(f'src="https://images1.fanpop.com/images/image_uploads/doggy-wallpapers-dogs-1153143_1024_768.jpg"',html_2)

    def test_new_user_route(self):
        with app.test_client() as client:
            client.post(f'/users/new',
            content_type='multipart/form-data',
            data={'first_name':'James','last_name':'baxter','image_url':''}
            )

            person_1 = User.query.filter(User.first_name=='James').first()
            person_2 = User.query.filter(User.first_name=='Foster').first()
            self.assertEqual(person_1.id, person_2.id+1)

            db.session.delete(person_1)


