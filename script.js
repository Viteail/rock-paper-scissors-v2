const rockButton = document.querySelector('.rock-btn');
const paperButton = document.querySelector('.paper-btn');
const scissorsButton = document.querySelector('.scissors-btn');

const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');

const Moves = {
  Rock: 'Rock',
  Paper: 'Paper',
  Scissors: 'Scissors',
};

const WIN_SCORE = 5;

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
  },

  [`${Moves.Rock}&${Moves.Paper}`]: {
    label: 'You lost!',
    pcPoint: 1,
    plPoint: 0,
  },
  [`${Moves.Rock}&${Moves.Scissors}`]: {
    label: 'You won!',
    pcPoint: 0,
    plPoint: 1,
  },
  [`${Moves.Paper}&${Moves.Rock}`]: {
    label: 'You won!',
    pcPoint: 0,
    plPoint: 1,
  },

  [`${Moves.Paper}&${Moves.Paper}`]: {
    label: "It's a tie!",
    pcPoint: 0,
    plPoint: 0,
  },
  [`${Moves.Paper}&${Moves.Scissors}`]: {
    label: 'You lost!',
    pcPoint: 1,
    plPoint: 0,
  },
  [`${Moves.Scissors}&${Moves.Rock}`]: {
    label: 'You lost!',
    pcPoint: 1,
    plPoint: 0,
  },

  [`${Moves.Scissors}&${Moves.Paper}`]: {
    label: 'You won!',
    pcPoint: 0,
    plPoint: 1,
  },
  [`${Moves.Scissors}&${Moves.Scissors}`]: {
    label: "It's a tie!",
    pcPoint: 0,
    plPoint: 0,
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

  console.log(result.label, Scores.player, Scores.computer);

  if (Scores.player === WIN_SCORE) {
    console.log('cringe you won');
  } else if (Scores.computer === WIN_SCORE) {
    console.log('u fuking lost');
  }
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
