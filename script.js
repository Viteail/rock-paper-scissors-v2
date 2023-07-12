const buttonWrapper = document.querySelector('.button-wrapper');
const rockButton = document.querySelector('.rock-btn');
const paperButton = document.querySelector('.paper-btn');
const scissorsButton = document.querySelector('.scissors-btn');

const nextTurnButton = document.querySelector('.next-turn');

const playerChoiceDisplay = document.querySelector('.player-choice');
const computerChoiceDisplay = document.querySelector('.computer-choice');
const compareDisplay = document.querySelector('.compare-box');

const resultDisplay = document.querySelector('#result-display');
const roundDisplay = document.querySelector('#round');

const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');

const Moves = {
  Rock: 'Rock',
  Paper: 'Paper',
  Scissors: 'Scissors',
};

const MAXROUNDS = 5;

let round = 1;

let Scores = {
  player: 0,
  computer: 0,
};

const PcChoices = {
  0: Moves.Rock,
  1: Moves.Paper,
  2: Moves.Scissors,
};

const RoundMoves = {
  [`${Moves.Rock}&${Moves.Rock}`]: {
    label: "It's a tie",
    pcPoint: 0,
    plPoint: 0,
    plImgSrc: 'icons/hand-rock.svg',
    pcImgSrc: 'icons/hand-rock.svg',
    compareImgSrc: 'icons/equal.svg',
  },

  [`${Moves.Rock}&${Moves.Paper}`]: {
    label: 'Paper beats rock!',
    pcPoint: 1,
    plPoint: 0,
    plImgSrc: 'icons/hand-rock.svg',
    pcImgSrc: 'icons/hand-paper.svg',
    compareImgSrc: 'icons/left-arrow.svg',
  },
  [`${Moves.Rock}&${Moves.Scissors}`]: {
    label: 'Rock beats scissors!',
    pcPoint: 0,
    plPoint: 1,
    plImgSrc: 'icons/hand-rock.svg',
    pcImgSrc: 'icons/hand-scissors.svg',
    compareImgSrc: 'icons/right-arrow.svg',
  },
  [`${Moves.Paper}&${Moves.Rock}`]: {
    label: 'Paper beats rock!',
    pcPoint: 0,
    plPoint: 1,
    plImgSrc: 'icons/hand-paper.svg',
    pcImgSrc: 'icons/hand-rock.svg',
    compareImgSrc: 'icons/right-arrow.svg',
  },

  [`${Moves.Paper}&${Moves.Paper}`]: {
    label: "It's a tie!",
    pcPoint: 0,
    plPoint: 0,
    plImgSrc: 'icons/hand-paper.svg',
    pcImgSrc: 'icons/hand-paper.svg',
    compareImgSrc: 'icons/equal.svg',
  },
  [`${Moves.Paper}&${Moves.Scissors}`]: {
    label: 'Scissors beats paper!',
    pcPoint: 1,
    plPoint: 0,
    plImgSrc: 'icons/hand-paper.svg',
    pcImgSrc: 'icons/hand-scissors.svg',
    compareImgSrc: 'icons/left-arrow.svg',
  },
  [`${Moves.Scissors}&${Moves.Rock}`]: {
    label: 'Rock beats scissors!',
    pcPoint: 1,
    plPoint: 0,
    plImgSrc: 'icons/hand-scissors.svg',
    pcImgSrc: 'icons/hand-rock.svg',
    compareImgSrc: 'icons/left-arrow.svg',
  },

  [`${Moves.Scissors}&${Moves.Paper}`]: {
    label: 'Scissors beats paper!',
    pcPoint: 0,
    plPoint: 1,
    plImgSrc: 'icons/hand-scissors.svg',
    pcImgSrc: 'icons/hand-paper.svg',
    compareImgSrc: 'icons/right-arrow.svg',
  },
  [`${Moves.Scissors}&${Moves.Scissors}`]: {
    label: "It's a tie!",
    pcPoint: 0,
    plPoint: 0,
    plImgSrc: 'icons/hand-scissors.svg',
    pcImgSrc: 'icons/hand-scissors.svg',
    compareImgSrc: 'icons/equal.svg',
  },
};

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);

  return PcChoices[randomNumber];
};

const playRound = (playerSelection, computerSelection) => {
  const result = RoundMoves[`${playerSelection}&${computerSelection}`];

  Scores.player += result.plPoint;
  Scores.computer += result.pcPoint;
  displayScores();

  createAndDisplayElement(
    result.label,
    result.plImgSrc,
    result.pcImgSrc,
    result.compareImgSrc
  );
};

const createAndDisplayElement = (
  label,
  playerImgSrc,
  computerImgSrc,
  compareImgSrc
) => {
  resultDisplay.textContent = `${label}`;

  hideElement();

  playerChoiceDisplay.classList.remove('invisible');
  computerChoiceDisplay.classList.remove('invisible');
  compareDisplay.classList.remove('invisible');

  nextTurnButton.parentElement.classList.remove('invisible');

  playerChoiceDisplay.firstElementChild.src = `${playerImgSrc}`;
  compareDisplay.firstElementChild.src = `${compareImgSrc}`;
  computerChoiceDisplay.firstElementChild.src = `${computerImgSrc}`;

  if (round === MAXROUNDS) {
    checkWinner();
    nextTurnButton.textContent = 'Restart';
  }
};

const displaySelectionState = () => {
  nextTurnButton.textContent = 'Next turn';
  displayScores();
  round++;
  displayRound();
  resultDisplay.textContent = 'Select Your Move!';

  playerChoiceDisplay.classList.add('invisible');
  computerChoiceDisplay.classList.add('invisible');
  compareDisplay.classList.add('invisible');

  nextTurnButton.parentElement.classList.add('invisible');

  rockButton.parentElement.classList.remove('invisible');
  paperButton.parentElement.classList.remove('invisible');
  scissorsButton.parentElement.classList.remove('invisible');
};

const hideElement = () => {
  rockButton.parentElement.classList.add('invisible');
  paperButton.parentElement.classList.add('invisible');
  scissorsButton.parentElement.classList.add('invisible');
};

const displayRound = () => {
  roundDisplay.textContent = `${round}`;
};

const displayScores = () => {
  playerScore.textContent = `${Scores.player}`;
  computerScore.textContent = `${Scores.computer}`;
};

const checkWinner = () => {
  hideElement();
  round = 0;

  if (Scores.player > Scores.computer) {
    resultDisplay.textContent = 'Congratulations! You WON!';
  } else if (Scores.player < Scores.computer) {
    resultDisplay.textContent = 'Try next time, You Lost...';
  } else {
    resultDisplay.textContent = "GG It's a TIE!";
  }
  Scores.player = 0;
  Scores.computer = 0;
};

rockButton.addEventListener('click', () => {
  playRound('Rock', getComputerChoice());
});

paperButton.addEventListener('click', () => {
  playRound('Paper', getComputerChoice());
});

scissorsButton.addEventListener('click', () => {
  playRound('Scissors', getComputerChoice());
});

nextTurnButton.addEventListener('click', () => {
  displaySelectionState();
});
