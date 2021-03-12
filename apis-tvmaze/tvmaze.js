/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
	try {
		const data = await axios.get(
			`http://api.tvmaze.com/search/shows?q=${query}`
		);
		console.log(data);
		return data.data;
	} catch (error) {
		console.log(error);
	}
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
	const $showsList = $('#shows-list');
	$showsList.empty();

	for (let show of shows) {
		if (show.show.image === null) {
			$item = $(
				`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.show.id}">
         <div class="card" data-show-id="${show.show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.show.name}</h5>
             <h6 class="text-center m-3" >no image available</h6>
             <p class="card-text">${show.show.summary}</p>
           </div>
           <button>More Info!</button>
         </div>
       </div>
      `
			);
		} else {
			$item = $(
				`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.show.id}">
         <div class="card" data-show-id="${show.show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.show.name}</h5>
             <img class="card-img-top" src="${show.show.image.medium}"/>
             <p class="card-text">${show.show.summary}</p>
           </div>
           <button>More Info!</button>
         </div>
       </div>
      `
			);
		}

		$showsList.append($item);
	}
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$('#search-form').on('submit', async function handleSearch(evt) {
	evt.preventDefault();
	console.log('loading.....');

	let query = $('#search-query').val();
	if (!query) return;

	$('#episodes-area').hide();

	let shows = await searchShows(query);
	if (shows !== undefined) {
		populateShows(shows);
		addEventListeners();
	}
});

function addEventListeners() {
	$('.Show').on('click', async function (event) {
		if (event.target.tagName === 'BUTTON') {
			const showId = event.target.parentElement.dataset.showId;

			const episodes = await getEpisodes(showId);
			populateEpisodeData(episodes);
		}
	});
}

function populateEpisodeData(episodes) {
	const $showData = $('#episodes-area');
	$showData.empty();

	for (let episode of episodes) {
		console.log(episode);
		let $item = $(
			`<div class="col-md-12 Show" data-show-id="${episode.id}">
		     <div class="card" data-show-id="${episode.id}">
		       <div class="card-body">
            <h5 class="card-title">Season: ${episode.season} Episode: ${episode.number}</h5>

		         <h5 class="card-title">${episode.name}</h5>
		         <p class="card-text">${episode.summary}</p>
		       </div>
		     </div>
		   </div>
		  `
		);
		$showData.append($item);
	}
	$showData.show();
}

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
	console.log('collecting episodes...');
	const data = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
	console.log(data);
	return data.data;
	// TODO: get episodes from tvmaze
	//       you can get this by making GET request to
	//       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
	// TODO: return array-of-episode-info, as described in docstring above
}
