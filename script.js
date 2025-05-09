// === Навигация ===
const navItems = document.querySelectorAll('nav li');
navItems.forEach(li => {
  li.addEventListener('click', () => {
    navItems.forEach(x => x.classList.remove('active'));
    li.classList.add('active');
    const gameId = li.dataset.game;
    document.querySelectorAll('.game').forEach(g => {
      g.classList.toggle('active', g.id === gameId);
    });
  });
});

// === Tic-Tac-Toe ===
const cells = document.querySelectorAll('#tic .cell');
const resetTic = document.querySelector('.reset-tic');
const winPat = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
let board, turn;
function initTic() {
  board = Array(9).fill('');
  turn = 'X';
  cells.forEach(c => {
    c.textContent = '';
    c.onclick = ticClick;
  });
}
function ticClick() {
  const i = this.dataset.i;
  if (board[i]) return;
  board[i] = turn;
  this.textContent = turn;
  if (winPat.some(p => p.every(i => board[i] === turn))) {
    alert(turn + ' победил!');
    endTic();
  } else if (!board.includes('')) {
    alert('Ничья');
    endTic();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
  }
}
function endTic() {
  cells.forEach(c => c.onclick = null);
}
resetTic.addEventListener('click', initTic);
initTic();

// === Rock-Paper-Scissors ===
const rpsBtns = document.querySelectorAll('#rps .rps-buttons button');
const rpsRes  = document.querySelector('.rps-result');
const resetR  = document.querySelector('.reset-rps');
rpsBtns.forEach(b => {
  b.addEventListener('click', () => {
    const you = b.dataset.choice;
    const opts = ['✊','✋','✌️'];
    const comp = opts[Math.floor(Math.random()*3)];
    let res = you === comp ? 'Ничья' :
      (you==='✊'&&comp==='✌️' || you==='✋'&&comp==='✊' || you==='✌️'&&comp==='✋')
        ? 'Вы выиграли!' : 'Вы проиграли';
    rpsRes.textContent = `Вы: ${you} • Комп: ${comp} → ${res}`;
    rpsBtns.forEach(x => x.disabled = true);
  });
});
resetR.addEventListener('click', () => {
  rpsRes.textContent = '';
  rpsBtns.forEach(x => x.disabled = false);
});

// === Reaction Test ===
const box    = document.querySelector('.box');
const btnR   = document.querySelector('.start-react');
const rRes   = document.querySelector('.react-result');
let tStart, tId;
btnR.addEventListener('click', () => {
  box.textContent = 'Ждите...';
  box.classList.add('wait');
  btnR.disabled = true;
  rRes.textContent = '';
  tId = setTimeout(() => {
    box.textContent = 'Клик!';
    box.classList.remove('wait');
    box.classList.add('go');
    tStart = Date.now();
    box.onclick = record;
  }, Math.random()*2000 + 500);
});
function record() {
  const dt = Date.now() - tStart;
  rRes.textContent = `Ваш результат: ${dt} мс`;
  box.classList.remove('go');
  box.textContent = 'Нажми «Старт»';
  btnR.disabled = false;
  box.onclick = null;
  clearTimeout(tId);
}

// === Number Guessing ===
const guessBtn   = document.querySelector('.guess-btn');
const guessInput = document.querySelector('.guess-input');
const guessRes   = document.querySelector('.guess-result');
const resetGuess = document.querySelector('.reset-guess');
let secret;
function initGuess() {
  secret = Math.floor(Math.random()*100) + 1;
  guessRes.textContent = '';
  guessInput.value = '';
  guessBtn.disabled = false;
}
guessBtn.addEventListener('click', () => {
  const val = +guessInput.value;
  if (!val || val<1 || val>100) {
    guessRes.textContent = 'Введите число от 1 до 100';
  } else if (val < secret) {
    guessRes.textContent = 'Больше ↑';
  } else if (val > secret) {
    guessRes.textContent = 'Меньше ↓';
  } else {
    guessRes.textContent = 'Угадали! 🎉';
    guessBtn.disabled = true;
  }
});
resetGuess.addEventListener('click', initGuess);
initGuess();

// === Click Counter ===
const startClick = document.querySelector('.start-clicker');
const clickBtn   = document.querySelector('.click-btn');
const clickCnt   = document.querySelector('.click-count');
let count, clkT;
startClick.addEventListener('click', () => {
  count = 0;
  clickCnt.textContent = '0';
  clickBtn.disabled = false;
  startClick.disabled = true;
  clkT = setTimeout(() => {
    clickBtn.disabled = true;
    startClick.disabled = false;
    alert(`Время вышло! Всего кликов: ${count}`);
  }, 5000);
});
clickBtn.addEventListener('click', () => {
  count++;
  clickCnt.textContent = count;
});

// === Coin Flip ===
const flipBtn = document.querySelector('.flip-coin');
const coinRes = document.querySelector('.coin-result');
flipBtn.addEventListener('click', () => {
  const result = Math.random() < 0.5 ? 'Орёл' : 'Решка';
  coinRes.textContent = `Выпало: ${result}`;
});

// === Dice Roller ===
const rollBtn = document.querySelector('.roll-dice');
const diceRes = document.querySelector('.dice-result');
rollBtn.addEventListener('click', () => {
  const value = Math.floor(Math.random()*6) + 1;
  diceRes.textContent = `Выпало: ${value}`;
});

// === Random Trivia ===
const facts = [
  'Мёд никогда не портится.',
  'У осьминогов три сердца.',
  'Бананы — ягоды, а клубника — нет.',
  'В нашей Вселенной больше звёзд, чем песчинок на Земле.',
  'Один день на Венере длиннее года на Венере.'
];
const triviaBtn  = document.querySelector('.next-trivia');
const triviaText = document.querySelector('.trivia-text');
triviaBtn.addEventListener('click', () => {
  const idx = Math.floor(Math.random()*facts.length);
  triviaText.textContent = facts[idx];
});
