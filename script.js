let score = {
    wins: 0,
    losses: 0
};

// Load score from localStorage if available
const scorerecover = localStorage.getItem('score');
if (scorerecover) {
    score = JSON.parse(scorerecover);
}

let result = '';
let playermove = '';
let cointoss = '';

function playgame(playerChoice) {
    playermove = playerChoice;
    cointoss = computersteps();
    
    if (playermove === cointoss) {
        result = 'you win';
        score.wins++;
    } else {
        result = 'you lose';
        score.losses++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateDisplay();
}

function computersteps() {
    return Math.random() < 0.5 ? 'heads' : 'tails';
}

function resetscore() {
    score.wins = 0;
    score.losses = 0;
    playermove = '';
    cointoss = '';
    result = '';
    localStorage.removeItem('score');
    updateDisplay();
}

function updateDisplay() {
    document.querySelector('.playermove').textContent = `Your Call: ${playermove}`;
    document.querySelector('.computermove').textContent = `Computer move: ${cointoss}`;
    document.querySelector('.result').textContent = `Result: ${result}`;
    document.querySelector('.wins').textContent = `Wins: ${score.wins}`;
    document.querySelector('.losses').textContent = `Losses: ${score.losses}`;
}
