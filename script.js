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
    // Prevent multiple clicks during animation
    if (document.querySelector('.containertoss').classList.contains('flipping')) {
        return;
    }

    playermove = playerChoice;
    
    // Add flipping animation class
    document.querySelector('.containertoss').classList.add('flipping');
    
    // Disable buttons during animation
    const buttons = document.querySelectorAll('.containertoss button');
    buttons.forEach(btn => btn.disabled = true);
    
    // Simulate coin flip with delay
    setTimeout(() => {
        cointoss = computersteps();
        
        if (playermove === cointoss) {
            result = 'YOU WIN! 🎉';
            score.wins++;
        } else {
            result = 'YOU LOSE! 😢';
            score.losses++;
        }

        localStorage.setItem('score', JSON.stringify(score));
        updateDisplay();
        
        // Remove flipping class and re-enable buttons
        setTimeout(() => {
            document.querySelector('.containertoss').classList.remove('flipping');
            buttons.forEach(btn => btn.disabled = false);
        }, 800);
    }, 400);
}

function computersteps() {
    return Math.random() < 0.5 ? 'heads' : 'tails';
}

function resetscore() {
    if (confirm('Are you sure you want to reset your score?')) {
        score.wins = 0;
        score.losses = 0;
        playermove = '';
        cointoss = '';
        result = '';
        localStorage.removeItem('score');
        updateDisplay();
    }
}

function updateDisplay() {
    const playerMoveEl = document.querySelector('.playermove');
    const computerMoveEl = document.querySelector('.computermove');
    const resultEl = document.querySelector('.result');
    const winsEl = document.querySelector('.wins');
    const lossesEl = document.querySelector('.losses');
    
    if (playermove) {
        playerMoveEl.innerHTML = `🎯 Your Call: <strong>${playermove.toUpperCase()}</strong>`;
    } else {
        playerMoveEl.textContent = '🎯 Your Call: ';
    }
    
    if (cointoss) {
        computerMoveEl.innerHTML = `🪙 Coin Result: <strong>${cointoss.toUpperCase()}</strong>`;
    } else {
        computerMoveEl.textContent = '🪙 Coin Result: ';
    }
    
    if (result) {
        resultEl.innerHTML = `<span style="color: ${result.includes('WIN') ? '#4ade80' : '#f87171'}">${result}</span>`;
    } else {
        resultEl.textContent = 'Result: ';
    }
    
    winsEl.innerHTML = `✅ Wins: <strong>${score.wins}</strong>`;
    lossesEl.innerHTML = `❌ Losses: <strong>${score.losses}</strong>`;
}

// Initialize display on page load
updateDisplay();