'use strict';

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
	storyList = await StoryList.getStories();
	$storiesLoadingMsg.remove();

	putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
	// console.debug('generateStoryMarkup', story);

	console.debug('Stories: generateStroyMarkup');

	let favStar = 'far';
	if (currentUser !== undefined) {
		favStar = User.isStoryFavorite(story.storyId);
	}

	// favstar = favStar.replace(/['"]+/g, '');
	const hostName = story.getHostName();
	return $(`
      <li id="${story.storyId}">
      <span class="star">
       <i class="${favStar} fa-star"></i>
      </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
	console.debug('Stories: putStoriesOnPage');

	User.addFavsToFavSet();
	$allStoriesList.empty();

	// loop through all of our stories and generate HTML for them

	for (let story of storyList.stories) {
		const $story = generateStoryMarkup(story);
		$allStoriesList.append($story);
	}
	currentUser ? $('i').show() : $('i').hide();

	$allStoriesList.show();
	addFavoriteClicks();
}

//------------create story btn / attempts to post new story----

async function postNewStory(event) {
	event.preventDefault();
	console.debug('postNewStories');

	const title = $('#create-title').val();
	const author = $('#create-author').val();
	const url = $('#create-url').val();
	const story = await storyList.postStory({ title, author, url });
	const $story = generateStoryMarkup(story);

	$allStoriesList.prepend($story);
}
$storyFormBtn.on('click', postNewStory);

//--------------- event listener for the favorite buttons
function favoriteClicker(event) {
	event.preventDefault();
	console.debug('stories: favoriteClicks');
	const id = event.target.parentElement.parentElement.id;

	if (event.target.classList.contains('far')) {
		console.debug('add favorite');
		User.changeFavorite(id, 'POST');
		User.updateFavorites(id, 'POST');
		event.target.classList.remove('far');
		event.target.classList.add('fas');
	} else {
		console.debug('remove favorite');
		User.changeFavorite(id, 'DELETE');
		User.updateFavorites(id, 'DELETE');
		event.target.classList.remove('fas');
		event.target.classList.add('far');
	}
}
function addFavoriteClicks() {
	$('body i').on('click', favoriteClicker);
}

//-----------create a function to put favorite items onto page------
function putMyStoriesOnPage() {
	console.debug('stories: putMyStoriesOnPage');

	$myStories.empty();

	// loop through all of our stories and generate HTML for them

	for (let story of currentUser.ownStories) {
		const $story = generateStoryMarkup(story);
		$myStories.append($story);
	}

	$myStories.show();
}
//-----------create a function to put favorite items onto page------
function putMyFavoritesOnPage() {
	console.debug('stories: putMyFavoritesOnPage');
	User.addFavsToFavSet();
	$favoritedStories.empty();

	// loop through all of our stories and generate HTML for them

	for (let story of currentUser.favorites) {
		const $story = generateStoryMarkup(story);
		// $story[0].classList.remove('far');
		// $story[0].classList.add('fas');

		$favoritedStories.append($story);
	}

	$favoritedStories.show();
}
