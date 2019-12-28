// jshint esversion: 6/**** Calendar Scripts for 2020 Red Wings site ****//*** Create the backbone of the calendar ***//*** and call getGames_api.js for game info ***/// get current monthlet thisMonth = new Date().getMonth();// switch the month number to the tab number// October through April - hockey seasonconst monthTab =  {	8: 0,	9: 1,	10: 2,	11: 3,	0: 4,	1: 5,	2: 6,	3: 7};//on initial load show current monthfunction startMonth() {	showMonth(monthTab[thisMonth]);}// on user click show requested monthfunction chMonth(n) {	showMonth(n);}function showMonth(n) {	// create an array 'season' containing all the months	let season = document.querySelectorAll(".month");	// create an array 'tabs' of the navigation tabs	let tabs = document.querySelectorAll(".monthtab");	// set display to none and none are active to start	season.forEach(i => i.style.display = "none");	tabs.forEach(i => i.classList.remove("active"));		//if season is over or no month is selected, show October	let tab = (n >= season.length) ? 1 : n;		//display selected month and give class active	season[tab].style.display = "block";	tabs[tab].classList += " active";}/***  Fill in the games  ***/// old-fashioned async// TODO - bring up-to-datefunction wait() {	if( !done ) {		setTimeout(wait, 100);	} else {		processGames();	}}function processGames() {	for (let i = 0, l = games.length; i < l; i++) {		let rowID = document.getElementById(games[i].gameDate);				let teams = document.createElement("p");		teams.setAttribute("class", "teams");		rowID.appendChild(teams);		if (games[i].homeAway === 'home') {			teams.innerHTML = games[i].homeTeamAbbr + ' vs ' + games[i].awayTeamAbbr;			rowID.setAttribute("class", "home");		} else {			teams.innerHTML = games[i].awayTeamAbbr + ' @ ' + games[i].homeTeamAbbr;			rowID.setAttribute("class", "away");		}		if ( games[i].gameDate < dayID ) {			let score = document.createElement("p");			score.setAttribute("class", "score");			rowID.appendChild(score);			let points = document.createElement("p");			points.setAttribute("class", "points");			rowID.appendChild(points);			score.innerHTML = games[i].awayScore + ' - ' + games[i].homeScore;			points.innerHTML = games[i].detRecord;			rowID.classList.add(games[i].gameResult);		}	}}wait();