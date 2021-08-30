import './App.css';
// import Dogs from './components/Dogs';
// import { Route, NavLink } from 'react-router-dom';
import Routes from './components/Routes';
import whiskeyImage from './images/whiskey.jpg';
import dukeImage from './images/duke.jpg';
import perryImage from './images/perry.jpg';
import tubbyImage from './images/tubby.jpg';

function App() {
	App.defaultProps = {
		dogs: [
			{
				id: 1,
				name: 'Whiskey',
				age: 5,
				src: whiskeyImage,
				facts: [
					'Whiskey loves eating popcorn.',
					'Whiskey is a terrible guard dog.',
					'Whiskey wants to cuddle with you!',
				],
			},
			{
				id: 2,
				name: 'Duke',
				age: 3,
				src: dukeImage,
				facts: [
					'Duke believes that ball is life.',
					'Duke likes snow.',
					'Duke enjoys pawing other dogs.',
				],
			},
			{
				id: 3,
				name: 'Perry',
				age: 4,
				src: perryImage,
				facts: [
					'Perry loves all humans.',
					'Perry demolishes all snacks.',
					'Perry hates the rain.',
				],
			},
			{
				id: 4,
				name: 'Tubby',
				age: 4,
				src: tubbyImage,
				facts: [
					'Tubby is really stupid.',
					'Tubby does not like walks.',
					'Angelina used to hate Tubby, but claims not to anymore.',
				],
			},
		],
	};
	return (
		<div className="App">
			<header className="App-header">
				<Routes dogs={App.defaultProps.dogs} />
			</header>
		</div>
	);
}

export default App;
