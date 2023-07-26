const homeTeam = {
	score: 0,
	homeScore: document.getElementById("home-score")
};
const guestTeam = {
	score: 0,
	guestScore: document.getElementById("guest-score")
};
const buttonsScore = document.querySelectorAll(".button-score");
const buttonStartGame = document.getElementById("new-game");
const buttonSetTimer = document.getElementById("set-timer");
const buttonResetScore = document.getElementById("reset-score");
const buttonSubmitTimer = document.getElementById("submit-timer");
const buttonCloseTimer = document.getElementById("close-timer");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const timerText = document.getElementById("timer-text");
const formTimerErrorMsg = document.getElementById("form-timer-error-msg");
const displayWinner = document.getElementById("display-winner");
const buttonPauseTime = document.getElementById("pause-time");
const buttonResumeTime = document.getElementById("resume-time");

buttonPauseTime.disabled = true;
buttonResumeTime.disabled = true;
buttonStartGame.disabled = true;

function toggleScoreButtons(toggle) { //loops over score buttons to disable/enable them
	for (let btn of buttonsScore) {
		btn.disabled = toggle;
	}
};

toggleScoreButtons(true); //disables score buttons on initialization

const gameDuration = { //object for gameDuration
	minutes: 0,
	seconds: 0,
	time: 0, //variable for storing id of setinterval so that clearInterval can be used
	padTimer: function (time) {
		return time.toString().padStart(2, "0");
	},
	setTime: function () {
		this.minutes = Number(minutes.value); //set initial minutes
		this.seconds = Number(seconds.value); //set initial seconds
		timerText.textContent = `${this.padTimer(this.minutes)}:${this.padTimer(this.seconds)}`;
	},
	startTimer: function () {
		this.time = setInterval(() => {
			if (this.minutes || this.seconds) {//if minutes and seconds are not zero
				if (this.seconds) { //if seconds not 0 then -1
					this.seconds -= 1;
				} else { //seconds is 0 then -1 on minutes then set seconds to 59
					this.minutes -= 1;
					this.seconds = 59;
				}
				timerText.textContent = `${this.padTimer(this.minutes)}:${this.padTimer(this.seconds)}`; //displays current time
			} else { //if minutes and seconds are zero
				clearInterval(this.time);
				buttonSetTimer.disabled = false;
				buttonPauseTime.disabled = true;
				buttonResumeTime.disabled = true;
				toggleScoreButtons(true);
				if (homeTeam.score === guestTeam.score) {
					displayWinner.textContent = "Score tied. No Winner!"
				} else if (homeTeam.score > guestTeam.score) {
					displayWinner.textContent = "Home team won!";
				} else {
					displayWinner.textContent = "Guest team won!";
				}
			}
		}, 1000) //interval runs every 1 second
	}
}


function highlightScoreLeader(home, guest) {
	if (home.score > guest.score) {
		home.homeScore.classList.add("highlight-score-leader");
		guest.guestScore.classList.remove("highlight-score-leader");
	} else if (home.score < guest.score) {
		guest.guestScore.classList.add("highlight-score-leader");
		home.homeScore.classList.remove("highlight-score-leader");
	} else {
		home.homeScore.classList.remove("highlight-score-leader");
		guest.guestScore.classList.remove("highlight-score-leader");
	}
};

function updateScore(home, guest, id) {
	if (id === "home-add-one") {
		home.score += 1;
	} else if (id === "home-add-two") {
		home.score += 2;
	} else if (id === "home-add-three") {
		home.score += 3;
	} else if (id === "guest-add-one") {
		guest.score += 1;
	} else if (id === "guest-add-two") {
		guest.score += 2;
	} else if (id === "guest-add-three") {
		guest.score += 3;
	}
	home.homeScore.textContent = home.score;
	guest.guestScore.textContent = guest.score;
	highlightScoreLeader(home, guest);
};

function setScoreButtons() { //add event listeners to each button score
	for (let btn of buttonsScore) {
		btn.addEventListener("click", (e) => {
			updateScore(homeTeam, guestTeam, e.target.id);
		})
	};

};
setScoreButtons(); //add event listeners to button upon clicking start game

buttonStartGame.addEventListener("click", (e) => {
	toggleScoreButtons(false); //enable score buttons
	gameDuration.setTime();
	gameDuration.startTimer();
	displayWinner.textContent = "";
	buttonSetTimer.disabled = true;
	buttonStartGame.disabled = true;
});

buttonSetTimer.addEventListener("click", (e) => {
	document.getElementById("set-timer-form").style.display = "block";
})

buttonSubmitTimer.addEventListener("click", (e) => {
	e.preventDefault();
	if (Number(minutes.value) === 12 && Number(seconds.value) > 0) {
		return;
	} else if (Number(minutes.value) === 0 && Number(seconds.value) === 0) {
		return;
	} else if (Number(minutes.value) <= 12 && Number(seconds.value) <= 59) {
		document.getElementById("set-timer-form").style.display = "none";
		timerText.textContent = `${gameDuration.padTimer(minutes.value)}:${gameDuration.padTimer(seconds.value)}`;
		buttonStartGame.disabled = false;
		buttonPauseTime.disabled = false;
		buttonResumeTime.disabled = false;
	} else {
		return;
	}
})

buttonCloseTimer.addEventListener("click", (e) => {
	document.getElementById("set-timer-form").style.display = "none";
})

buttonResetScore.addEventListener("click", (e) => {
	homeTeam.score = 0;
	guestTeam.score = 0;
	homeTeam.homeScore.textContent = homeTeam.score;
	guestTeam.guestScore.textContent = guestTeam.score;
	highlightScoreLeader(homeTeam, guestTeam);
	displayWinner.textContent = "";
})

buttonPauseTime.addEventListener("click", (e) => {
	clearInterval(gameDuration.time);
})

buttonResumeTime.addEventListener("click", (e) => {
	gameDuration.startTimer();
})