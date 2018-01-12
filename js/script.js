// scripts.js
// Przycisk inicjujący nową grę
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

//Wskazanie co się będzie działo po kliknięciu na przysciski
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//Wartości początkowe
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    }
//id elementów - zmienne, które będą wskazywać na elementy gry, a konkretnie jej poszczególne części
var newGameElem = document.getElementById('js-newGameElement'),
pickElem = document.getElementById('js-playerPickElement'),
resultsElem = document.getElementById('js-resultsTableElement');

//funkcja definująca jak elementy będą się wyświetlać w zależności od stanu gry
function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

//zdefiniowanie zmiennych odnoszących się do elemwntów na stronie -->
//--> po kolei jest to punktacja gracza, imię gracza wyświetlane na stronie oraz punktacja komputera
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

//Zdefiniowanie funkcji, która będzie uruchamiana po wciśnięciu przycisku "New Game" / "Play Again"
  function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}

//Funkcja, która odpowiada za pobranie wyboru gracza
function playerPick(playerPick) {
    console.log(playerPick);
}
//Funkcja losująca wybór komputera
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}
//Umieszczanie wyborów gracza ora komputera na stronie
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');
function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

//Logika gry i przyznawanie punktów
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
    setGamePoints();
}

//Aktualizacja wyniku
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    checkGameOfGamesWinner();
}

//Funkcja sprawdzająca, czy któryś z graczy zdobył 10 punktów
function checkGameOfGamesWinner() {
    if (player.score == 10) {
        gameState = 'ended';
        alert('Congratulations, ' + player.name + '! You win!');
        setGameElements();
    }
    else if (computer.score == 10) {
        gameState = 'ended';
        alert('You lose!');
        setGameElements();
    }
}