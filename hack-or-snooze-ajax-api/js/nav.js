'use strict';

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
	console.debug('navAllStories', evt);
	hidePageComponents();
	putStoriesOnPage();
}

$body.on('click', '#nav-all', navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
	console.debug('navLoginClick', evt);
	hidePageComponents();
	$loginForm.show();
	$signupForm.show();
}

$navLogin.on('click', navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
	console.debug('updateNavOnLogin');
	$('.main-nav-links').show();
	$navLogin.hide();
	$navLogOut.show();
	$navUserProfile.text(`${currentUser.username}`).show();
}

//------------------add event listner for the submit tab
function submitStoryClick(event) {
	console.debug('submitStoryClick', event);
	hidePageComponents();
	$storyForm.show();
}

$navSubmitStory.on('click', submitStoryClick);

//--------------add event listner for the my stories tab
function navMyStories() {
	console.debug('click navMyStories');
	hidePageComponents();
	putMyStoriesOnPage();
}

$navMyStories.on('click', navMyStories);

//--------------add event listner for the my favorites tab
function navFavorites() {
	console.debug('click navMyFavorites');
	hidePageComponents();
	putMyFavoritesOnPage();
	addFavoriteClicks();
}

$navFavorites.on('click', navFavorites);
