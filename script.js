// ==================== GAME STATE ====================
let score = {
    wins: 0,
    losses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalGames: 0,
    history: []
};

// Settings
let settings = {
    soundEnabled: true,
    darkMode: false
};

// Load data from localStorage
const scorerecover = localStorage.getItem('score');
if (scorerecover) {
    score = JSON.parse(scorerecover);
}

const settingsRecover = localStorage.getItem('settings');
if (settingsRecover) {
    settings = JSON.parse(settingsRecover);
    applySettings();
}

let result = '';
let playermove = '';
let cointoss = '';

// Achievements
const achievements = [
    { id: 'first_win', name: 'First Victory', description: 'Win your first game', unlocked: false },
    { id: 'streak_3', name: 'Hot Streak', description: 'Win 3 games in a row', unlocked: false },
    { id: 'streak_5', name: 'On Fire!', description: 'Win 5 games in a row', unlocked: false },
    { id: 'streak_10', name: 'Unstoppable', description: 'Win 10 games in a row', unlocked: false },
    { id: 'games_10', name: 'Dedicated Player', description: 'Play 10 games', unlocked: false },
    { id: 'games_50', name: 'Coin Flip Master', description: 'Play 50 games', unlocked: false },
    { id: 'games_100', name: 'Century Club', description: 'Play 100 games', unlocked: false }
];

// Load achievements
const achievementsRecover = localStorage.getItem('achievements');
if (achievementsRecover) {
    const saved = JSON.parse(achievementsRecover);
    achievements.forEach((ach, i) => {
        if (saved[i]) ach.unlocked = saved[i].unlocked;
    });
}

// ==================== MAIN GAME LOGIC ====================
function playgame(playerChoice) {
    // Prevent multiple clicks during animation
    if (document.querySelector('.containertoss').classList.contains('flipping')) {
        return;
    }

    playermove = playerChoice;
    
    // Play sound effect
    playSound('flip');
    
    // Add flipping animation class
    document.querySelector('.containertoss').classList.add('flipping');
    
    // Disable buttons during animation
    const buttons = document.querySelectorAll('.containertoss button');
    buttons.forEach(btn => btn.disabled = true);
    
    // Simulate coin flip with delay
    setTimeout(() => {
        cointoss = computersteps();
        
        const won = playermove === cointoss;
        
        if (won) {
            result = 'YOU WIN! 🎉';
            score.wins++;
            score.currentStreak++;
            
            // Update best streak
            if (score.currentStreak > score.bestStreak) {
                score.bestStreak = score.currentStreak;
            }
            
            // Trigger confetti
            createConfetti();
            playSound('win');
        } else {
            result = 'YOU LOSE! 😢';
            score.losses++;
            score.currentStreak = 0;
            
            // Shake animation
            document.querySelector('.container').classList.add('shake');
            setTimeout(() => {
                document.querySelector('.container').classList.remove('shake');
            }, 500);
            
            playSound('lose');
        }

        // Update game stats
        score.totalGames++;
        score.history.unshift({ player: playermove, coin: cointoss, won, timestamp: Date.now() });
        if (score.history.length > 10) score.history.pop();

        // Save to localStorage
        localStorage.setItem('score', JSON.stringify(score));
        
        // Check achievements
        checkAchievements();
        
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

// ==================== ACHIEVEMENTS ====================
function checkAchievements() {
    const newAchievements = [];
    
    if (score.wins >= 1 && !achievements[0].unlocked) {
        achievements[0].unlocked = true;
        newAchievements.push(achievements[0]);
    }
    if (score.currentStreak >= 3 && !achievements[1].unlocked) {
        achievements[1].unlocked = true;
        newAchievements.push(achievements[1]);
    }
    if (score.currentStreak >= 5 && !achievements[2].unlocked) {
        achievements[2].unlocked = true;
        newAchievements.push(achievements[2]);
    }
    if (score.currentStreak >= 10 && !achievements[3].unlocked) {
        achievements[3].unlocked = true;
        newAchievements.push(achievements[3]);
    }
    if (score.totalGames >= 10 && !achievements[4].unlocked) {
        achievements[4].unlocked = true;
        newAchievements.push(achievements[4]);
    }
    if (score.totalGames >= 50 && !achievements[5].unlocked) {
        achievements[5].unlocked = true;
        newAchievements.push(achievements[5]);
    }
    if (score.totalGames >= 100 && !achievements[6].unlocked) {
        achievements[6].unlocked = true;
        newAchievements.push(achievements[6]);
    }
    
    // Save achievements
    localStorage.setItem('achievements', JSON.stringify(achievements));
    
    // Show achievement notifications
    newAchievements.forEach((ach, index) => {
        setTimeout(() => showAchievement(ach), index * 500);
    });
}

function showAchievement(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-content">
            <div class="achievement-title">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
        </div>
    `;
    document.body.appendChild(notification);
    
    playSound('achievement');
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== VISUAL EFFECTS ====================
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

// ==================== SOUND EFFECTS ====================
function playSound(type) {
    if (!settings.soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'flip') {
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'win') {
        [523, 659, 784].forEach((freq, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.2);
            osc.start(audioContext.currentTime + i * 0.1);
            osc.stop(audioContext.currentTime + i * 0.1 + 0.2);
        });
    } else if (type === 'lose') {
        oscillator.frequency.value = 200;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'achievement') {
        [659, 784, 988, 1047].forEach((freq, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, audioContext.currentTime + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.08 + 0.15);
            osc.start(audioContext.currentTime + i * 0.08);
            osc.stop(audioContext.currentTime + i * 0.08 + 0.15);
        });
    }
}

// ==================== SETTINGS & CONTROLS ====================
function toggleSound() {
    settings.soundEnabled = !settings.soundEnabled;
    localStorage.setItem('settings', JSON.stringify(settings));
    updateDisplay();
    
    // Play confirmation sound
    if (settings.soundEnabled) {
        playSound('flip');
    }
}

function toggleDarkMode() {
    settings.darkMode = !settings.darkMode;
    localStorage.setItem('settings', JSON.stringify(settings));
    applySettings();
}

function applySettings() {
    if (settings.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function resetscore() {
    if (confirm('Are you sure you want to reset your score? This will clear all stats and achievements!')) {
        score.wins = 0;
        score.losses = 0;
        score.currentStreak = 0;
        score.bestStreak = 0;
        score.totalGames = 0;
        score.history = [];
        playermove = '';
        cointoss = '';
        result = '';
        
        // Reset achievements
        achievements.forEach(ach => ach.unlocked = false);
        
        localStorage.removeItem('score');
        localStorage.removeItem('achievements');
        updateDisplay();
    }
}

// ==================== DISPLAY UPDATES ====================
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
        resultEl.innerHTML = `<span style="color: ${result.includes('WIN') ? '#4ade80' : '#f87171'}; font-size: 1.3em; font-weight: bold;">${result}</span>`;
    } else {
        resultEl.textContent = 'Result: ';
    }
    
    winsEl.innerHTML = `✅ Wins: <strong>${score.wins}</strong>`;
    lossesEl.innerHTML = `❌ Losses: <strong>${score.losses}</strong>`;
    
    // Update stats panel
    updateStats();
    
    // Update history
    updateHistory();
    
    // Update achievements display
    updateAchievementsDisplay();
    
    // Update sound button
    const soundBtn = document.getElementById('soundToggle');
    if (soundBtn) {
        soundBtn.textContent = settings.soundEnabled ? '🔊' : '🔇';
        soundBtn.title = settings.soundEnabled ? 'Sound On' : 'Sound Off';
    }
    
    // Update dark mode button
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) {
        darkModeBtn.textContent = settings.darkMode ? '☀️' : '🌙';
        darkModeBtn.title = settings.darkMode ? 'Light Mode' : 'Dark Mode';
    }
}

function updateStats() {
    const statsEl = document.getElementById('stats');
    if (!statsEl) return;
    
    const winRate = score.totalGames > 0 ? ((score.wins / score.totalGames) * 100).toFixed(1) : 0;
    
    statsEl.innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Win Rate</div>
            <div class="stat-value">${winRate}%</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Total Games</div>
            <div class="stat-value">${score.totalGames}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Current Streak</div>
            <div class="stat-value ${score.currentStreak >= 3 ? 'streak-hot' : ''}">${score.currentStreak} 🔥</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Best Streak</div>
            <div class="stat-value">${score.bestStreak} ⭐</div>
        </div>
    `;
}

function updateHistory() {
    const historyEl = document.getElementById('history');
    if (!historyEl) return;
    
    if (score.history.length === 0) {
        historyEl.innerHTML = '<p style="opacity: 0.5; text-align: center;">No games played yet</p>';
        return;
    }
    
    historyEl.innerHTML = score.history.map((game, index) => `
        <div class="history-item ${game.won ? 'win' : 'loss'}">
            <span class="history-number">#${score.totalGames - index}</span>
            <span class="history-choice">You: ${game.player.toUpperCase()}</span>
            <span class="history-result">Coin: ${game.coin.toUpperCase()}</span>
            <span class="history-outcome">${game.won ? '✅' : '❌'}</span>
        </div>
    `).join('');
}

function updateAchievementsDisplay() {
    const achievementsEl = document.getElementById('achievements');
    if (!achievementsEl) return;
    
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    
    achievementsEl.innerHTML = `
        <div class="achievements-header">
            <h3>🏆 Achievements (${unlockedCount}/${achievements.length})</h3>
        </div>
        <div class="achievements-grid">
            ${achievements.map(ach => `
                <div class="achievement-item ${ach.unlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon-small">${ach.unlocked ? '🏆' : '🔒'}</div>
                    <div class="achievement-info">
                        <div class="achievement-name">${ach.name}</div>
                        <div class="achievement-description">${ach.description}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Prevent shortcuts if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    const key = e.key.toLowerCase();
    
    if (key === 'h') {
        playgame('heads');
    } else if (key === 't') {
        playgame('tails');
    } else if (key === 'r') {
        resetscore();
    } else if (key === 's') {
        toggleSound();
    } else if (key === 'd') {
        toggleDarkMode();
    }
});

// ==================== MODAL CONTROLS ====================
function showStatsModal() {
    const modal = document.getElementById('statsModal');
    if (modal) {
        modal.style.display = 'flex';
        updateStats();
        updateHistory();
    }
}

function showAchievementsModal() {
    const modal = document.getElementById('achievementsModal');
    if (modal) {
        modal.style.display = 'flex';
        updateAchievementsDisplay();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// ==================== INITIALIZATION ====================
// Initialize display on page load
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    applySettings();
    
    // Show keyboard shortcuts hint
    setTimeout(() => {
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.innerHTML = '💡 Tip: Press <kbd>H</kbd> for Heads, <kbd>T</kbd> for Tails';
        document.body.appendChild(hint);
        
        setTimeout(() => hint.classList.add('show'), 100);
        setTimeout(() => {
            hint.classList.remove('show');
            setTimeout(() => hint.remove(), 300);
        }, 5000);
    }, 2000);
});

// Fallback for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDisplay);
} else {
    updateDisplay();
}

