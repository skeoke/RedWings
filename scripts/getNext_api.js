/**** last game/next game scripts for 2021 Red Wings site ****/

window.onload = getGame;

function getGame() {

	// date set up
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let nextDate, year, mo, month, day;
	let nextGameDate;

	// home and away teams and records, and venue
	let nextHomeTeam, nextHWins, nextHLoss, nextHOtl;
	let nextAwayTeam, nextAWins, nextALoss, nextAOtl;
	let nextVenue;

	// get the next RW game from the api
	fetch('https://statsapi.web.nhl.com/api/v1/teams/17?expand=team.schedule.next&season=20202021')
	.then(results => {
		if (results.ok) {
			return results.json();
		} else {
			return Promise.reject('no next game data available');
		}
	})
	// parse out the info
	.then(next => {
		// format the game date
		nextDate = next.teams[0].nextGameSchedule.dates[0].date.split('-');
		year = nextDate[0];
		mo = nextDate[1] - 1;
		month = months[mo];
		day = nextDate[2];
		nextGameDate = `${month} ${day}, ${year}`;

		// figure out who the home team is
		nextHomeTeam = next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.team.name;
		// if RW style appropriately
		if (nextHomeTeam === 'Detroit Red Wings') {
			document.querySelector('#nextHomeTeam').setAttribute('class', 'det');
			document.querySelector('#nextHomeTeam').style.color = '#c8102e';
		}

		// get the home team record
		nextHWins = next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.leagueRecord.wins;
		nextHLoss = next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.leagueRecord.losses;
		nextHOtl = (!next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.leagueRecord.ot) ? 
			0 : next.teams[0].nextGameSchedule.dates[0].games[0].teams.home.leagueRecord.ot;

		// figure out who the away team is
		nextAwayTeam = next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name;
		// if RW style appropriately
		if (nextAwayTeam === 'Detroit Red Wings') {
			document.querySelector('#nextAwayTeam').setAttribute('class', 'det');
			document.querySelector('#nextAwayTeam').style.color = '#c8102e';
		}

		// get the away team record
		nextAWins = next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.leagueRecord.wins;
		nextALoss = next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.leagueRecord.losses;
		nextAOtl  = (!next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.leagueRecord.ot) ? 
			0 : next.teams[0].nextGameSchedule.dates[0].games[0].teams.away.leagueRecord.ot;

		// get the name of the venue
		nextVenue = next.teams[0].nextGameSchedule.dates[0].games[0].venue.name;

		// add values to html
		document.querySelector('#nextGameDate').innerHTML += nextGameDate;
		document.querySelector('#nextHomeTeam').innerHTML = nextHomeTeam;
		document.querySelector('#nextHRecord').innerHTML = nextHWins + ' - ' + nextHLoss + ' - ' + nextHOtl;
		document.querySelector('#nextAwayTeam').innerHTML = nextAwayTeam;
		document.querySelector('#nextARecord').innerHTML = nextAWins + ' - ' + nextALoss + ' - ' + nextAOtl;
		document.querySelector('#nextVenue').innerHTML = nextVenue;
	})
	.catch(error => console.log('no next game date available'));

	// get the results of the previous game
	fetch('https://statsapi.web.nhl.com/api/v1/teams/17?expand=team.schedule.previous&season=20202021')
	.then(results => {
		if (results.ok) {
			return results.json();
		} else {
			return Promise.reject('no previous game data available');
		}
	})

	// parse out the info
	.then(prev => {
		// format the date
		prevDate = prev.teams[0].previousGameSchedule.dates[0].date.split('-');
		year = prevDate[0];
		mo = prevDate[1] - 1;
		month = months[mo];
		day = prevDate[2];
		prevGameDate = `${month} ${day}, ${year}`;

		// figure out the home team
		prevHomeTeam = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.team.name;
		// if RW style appropriately
		if (prevHomeTeam === 'Detroit Red Wings') { 
			document.querySelector('#prevHomeTeam').setAttribute('class', 'det');
			document.querySelector('#prevHomeTeam').style.color = '#c8102e';
		}

		// get the home team record
		prevHomeScore = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.score;
		prevHWins = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.leagueRecord.wins;
		prevHLoss = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.leagueRecord.losses;
		prevHOtl = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.home.leagueRecord.ot;

		// figure out the away team
		prevAwayTeam = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.team.name;
		// if RW style appropriately
		if (prevAwayTeam === 'Detroit Red Wings') { 
			document.querySelector('#prevAwayTeam').setAttribute('class', 'det');
			document.querySelector('#prevAwayTeam').style.color = '#c8102e';
		}

		// get the away team record
		prevAwayScore = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.score;
		prevAWins = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.leagueRecord.wins;
		prevALoss = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.leagueRecord.losses;
		prevAOtl = prev.teams[0].previousGameSchedule.dates[0].games[0].teams.away.leagueRecord.ot;

		// figure out who won the game
		if (prevHomeScore > prevAwayScore) {
			document.querySelector('#prevHomeTeam').setAttribute('class', 'win');
			document.querySelector('#prevAwayTeam').setAttribute('class', 'loss');
		} else {
			document.querySelector('#prevAwayTeam').setAttribute('class', 'win');
			document.querySelector('#prevHomeTeam').setAttribute('class', 'loss');
		}

		// get the game venue
		prevVenue = prev.teams[0].previousGameSchedule.dates[0].games[0].venue.name;

		// add values to html
		document.querySelector('#prevGameDate').innerHTML += prevGameDate;
		document.querySelector('#prevHomeTeam').innerHTML = prevHomeTeam + ': ' + prevHomeScore;
		document.querySelector('#prevHRecord').innerHTML = prevHWins + ' - ' + prevHLoss + ' - ' + prevHOtl;
		document.querySelector('#prevAwayTeam').innerHTML = prevAwayTeam + ': ' + prevAwayScore;
		document.querySelector('#prevARecord').innerHTML = prevAWins + ' - ' + prevALoss + ' - ' + prevAOtl;
		document.querySelector('#prevVenue').innerHTML = prevVenue;
	});
}
