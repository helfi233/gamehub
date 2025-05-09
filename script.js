// Навигация
const navItems = document.querySelectorAll('nav li');
navItems.forEach(li => {
  li.onclick = () => {
    navItems.forEach(x => x.classList.remove('active'));
    li.classList.add('active');
    const id = li.dataset.game;
    document.querySelectorAll('.game').forEach(g => {
      g.classList.toggle('active', g.id === id);
    });
  };
});

// 1. Tic-Tac-Toe
const cells   = document.querySelectorAll('#tic .cell');
const resetT  = document.querySelector('.reset-tic');
const winPat  = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
let board, turn;
function initT() {
  board = Array(9).fill('');
  turn  = 'X';
  cells.forEach(c => {
    c.textContent = '';
    c.onclick = () => {
      const i = c.dataset.i;
      if (board[i]) return;
      board[i] = turn;
      c.textContent = turn;
      if (winPat.some(p => p.every(i => board[i] === turn))) {
        alert(turn + ' победил!');
        endT();
      } else if (!board.includes('')) {
        alert('Ничья');
        endT();
      } else turn = turn === 'X' ? 'O' : 'X';
    };
  });
}
function endT() {
  cells.forEach(c => c.onclick = null);
}
resetT.onclick = initT;
initT();

// 2. Rock-Paper-Scissors
const rpsBtns = document.querySelectorAll('#rps .rps-buttons button');
const rpsRes  = document.querySelector('.rps-result');
const resetR  = document.querySelector('.reset-rps');
rpsBtns.forEach(b => b.onclick = () => {
  const you  = b.dataset.choice;
  const opts = ['✊','✋','✌️'];
  const comp = opts[Math.floor(Math.random()*3)];
  let res = you === comp ? 'Ничья' :
    (you==='✊'&&comp==='✌️'|| you==='✋'&&comp==='✊'|| you==='✌️'&&comp==='✋')
      ? 'Вы выиграли!' : 'Вы проиграли';
  rpsRes.textContent = `Вы: ${you} • Комп: ${comp} → ${res}`;
  rpsBtns.forEach(x => x.disabled = true);
});
resetR.onclick = () => {
  rpsRes.textContent = '';
  rpsBtns.forEach(x => x.disabled = false);
};

// 3. Reaction Test
const box    = document.querySelector('#react .box');
const startR = document.querySelector('.start-react');
const reactR = document.querySelector('.react-result');
let tStart, tId;
startR.onclick = () => {
  box.textContent = 'Ждите...';
  startR.disabled = true;
  reactR.textContent = '';
  tId = setTimeout(() => {
    box.textContent = 'Клик!';
    tStart = Date.now();
    box.onclick = () => {
      const dt = Date.now() - tStart;
      reactR.textContent = `Ваш результат: ${dt} мс`;
      box.textContent = 'Нажми «Старт»';
      startR.disabled = false;
      box.onclick = null;
      clearTimeout(tId);
    };
  }, Math.random()*2000 + 500);
};

// 4. Number Guessing
const guessBtn   = document.querySelector('.guess-btn');
const guessIn    = document.querySelector('.guess-input');
const guessR     = document.querySelector('.guess-result');
const resetG     = document.querySelector('.reset-guess');
let secretNumber;
function initG() {
  secretNumber = Math.floor(Math.random()*100) + 1;
  guessR.textContent = '';
  guessIn.value     = '';
  guessBtn.disabled = false;
}
guessBtn.onclick = () => {
  const v = +guessIn.value;
  if (!v || v<1 || v>100) guessR.textContent = 'Введите 1–100';
  else if (v < secretNumber) guessR.textContent = 'Больше ↑';
  else if (v > secretNumber) guessR.textContent = 'Меньше ↓';
  else {
    guessR.textContent = 'Угадали! 🎉';
    guessBtn.disabled = true;
  }
};
resetG.onclick = initG;
initG();

// 5. Click Counter
const startC = document.querySelector('.start-clicker');
const clickB = document.querySelector('.click-btn');
const clickC = document.querySelector('.click-count');
let clicks, clkTimeout;
startC.onclick = () => {
  clicks = 0;
  clickC.textContent = '0';
  clickB.disabled = false;
  startC.disabled = true;
  clkTimeout = setTimeout(() => {
    clickB.disabled = true;
    startC.disabled = false;
    alert(`Время вышло! Клики: ${clicks}`);
  }, 5000);
};
clickB.onclick = () => {
  clicks++;
  clickC.textContent = clicks;
};

// 6. Coin Flip
const flipBtn = document.querySelector('.flip-coin');
const coinR   = document.querySelector('.coin-result');
flipBtn.onclick = () => {
  coinR.textContent = 'Выпало: ' + (Math.random()<0.5 ? 'Орёл' : 'Решка');
};

// 7. Dice Roller
const rollB = document.querySelector('.roll-dice');
const diceR = document.querySelector('.dice-result');
rollB.onclick = () => {
  diceR.textContent = 'Выпало: ' + (Math.floor(Math.random()*6)+1);
};

// 8. Random Trivia
const facts     = [
  'Мёд никогда не портится.',
  'У осьминогов три сердца.',
  'Бананы — ягоды, а клубника — нет.',
  'В нашей Вселенной больше звёзд, чем песчинок на Земле.',
  'День на Венере длиннее года на Венере.'
];
const triviaB  = document.querySelector('.next-trivia');
const triviaT  = document.querySelector('.trivia-text');
triviaB.onclick = () => {
  triviaT.textContent = facts[Math.floor(Math.random()*facts.length)];
};

// 9. Math Challenge
const mathQ     = document.querySelector('.math-question');
const mathIn    = document.querySelector('.math-input');
const mathBtn   = document.querySelector('.math-btn');
const mathRes   = document.querySelector('.math-result');
const mathRst   = document.querySelector('.math-reset');
let mathAnswer;
function newMath() {
  const a = Math.floor(Math.random()*20)+1;
  const b = Math.floor(Math.random()*20)+1;
  const op = ['+','-','*'][Math.floor(Math.random()*3)];
  mathAnswer = eval(`${a}${op}${b}`);
  mathQ.textContent = `Сколько будет ${a} ${op} ${b}?`;
  mathIn.value  = '';
  mathRes.textContent = '';
  mathBtn.disabled = false;
}
mathBtn.onclick = () => {
  if (+mathIn.value === mathAnswer) mathRes.textContent = 'Правильно! 🎉';
  else mathRes.textContent = `Неверно, ответ: ${mathAnswer}`;
  mathBtn.disabled = true;
};
mathRst.onclick = newMath;
newMath();

// 10. Color Guess
const boxCol    = document.querySelector('.color-box');
const optsCol   = document.querySelector('.color-options');
const resCol    = document.querySelector('.color-result');
const newColBtn = document.querySelector('.new-color');
let targetColor;
function newColorGame() {
  const r=Math.floor(Math.random()*256),
        g=Math.floor(Math.random()*256),
        b=Math.floor(Math.random()*256);
  targetColor = `rgb(${r}, ${g}, ${b})`;
  boxCol.style.background = targetColor;
  resCol.textContent = '';
  const choices = [targetColor];
  while (choices.length < 3) {
    const cr=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
    if (!choices.includes(cr)) choices.push(cr);
  }
  choices.sort(() => 0.5 - Math.random());
  optsCol.innerHTML = '';
  choices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = c;
    btn.onclick = () => {
      resCol.textContent = c === targetColor ? 'Правильно! 🎉' : `Неверно, это ${targetColor}`;
      optsCol.querySelectorAll('button').forEach(x => x.disabled = true);
    };
    optsCol.appendChild(btn);
  });
}
newColBtn.onclick = newColorGame;
newColorGame();
