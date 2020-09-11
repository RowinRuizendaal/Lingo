const woordLength = 6

// 1D bingo sheet array
let availableNumb = []
// all items in the ballenbak
let ballenbak = []

let guess = ''
let hetWoord = ''
let goedeLetters = []
let goodArray = []

let turn = 0
let score = 0

let board = ['']
let bingoSheet = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
]

const abc = 'abcdefghijklmnopqrstuvwxyz'
const woordSubmitButton = document.querySelector('.testing')
const guessTextField = document.querySelector('.gok')
const letterBoardArr = document.querySelectorAll('#letterSheet div')
const bingoSheetElement = document.querySelectorAll('#bingoSheet div')

// link naar woordenlijsten
const jsonUrl = `${window.location.href}woorden/`

const sound = new Audio()

async function setup() {
  // get random word
  hetWoord = await randomWoord()
  console.log(hetWoord)

  fillBallenbak()

  // vul bingo sheet
  for (let i = 0; i < bingoSheet.length; i++) {
    for (let j = 0; j < bingoSheet.length; j++) {
      let x = i * 5 + j
      bingoSheet[i][j] = availableNumb[x]
      bingoSheetElement[x].textContent = availableNumb[x]
    }
  }

  /*geluid knop*/
  // document.getElementsByClassName('bier')[0].addEventListener('click', PlaySound);

  /*prevent refresh als submit*/
  document
    .getElementsByClassName('testing')[0]
    .addEventListener('click', function (event) {
      event.preventDefault()
    })

  // document.getElementsByClassName("bier")[0].addEventListener("click", function (event) {
  //     event.preventDefault()
  // });
}
setup()

async function resetGame() {
  turn = 0

  // clear text display
  for (let i of letterBoardArr) {
    i.textContent = ''
    i.classList.remove('diffrent')
    i.classList.remove('good')
  }

  // get new word
  hetWoord = await randomWoord()
  console.log(hetWoord)
}

function fillBallenbak() {
  // generate random 60 balls + special
  for (let i = 0; i < 100; i++) {
    availableNumb.push(i)
  }

  // Get 60 random numbers out of available array
  availableNumb = availableNumb.sort(() => 0.5 - Math.random()).slice(0, 60)
  // use this so it points to different memory adress
  ballenbak = [...availableNumb]

  // add special balls
  ballenbak.push('groen')
  ballenbak.push('groen')
  ballenbak.push('groen')
  // ballsArr.push('goud')

  // shuffle ballenbak 1 more time
  ballenbak = ballenbak.sort(() => 0.5 - Math.random())

  console.log(ballenbak)
  console.log(availableNumb)
}

async function gameLogic() {
  console.log('start gamelogic')
  const input = guessTextField.value
  const woord = hetWoord

  document.querySelector('.Woord').textContent = `Gegokte woord: ${input}`
  guessTextField.value = '' // Clear input for next round

  // check lenght
  if (input.length != woordLength) {
    console.log('Word to short')
    return
  }

  // Kijk of woord in woordenlijst
  const exists = await checkWoord(input)

  if (exists) {
    const goodArr = compareWord(input, woord)
    lettersToBoard(input, goodArr)

    // get ball if goodArr all good
    const unique = goodArr.filter((v, i, a) => a.indexOf(v) === i)
    // let unique = [...new Set(goodArr)];

    if (
      unique.length == 1 &&
      unique[0] == 'good' &&
      !goodArr.includes(undefined)
    ) {
      // get ball
      pickBall()
      score++

      resetGame()
    }

    // get bingo number
  } else {
    console.log('Dit woord bestaat NIET')
    document.querySelector('input[type=text]').classList.add('shake')
  }
}

woordSubmitButton.addEventListener('click', gameLogic)

async function randomWoord() {
  const url = `${jsonUrl}${abc[Math.floor(Math.random() * abc.length)]}.json`
  let data = await fetch(url)
  data = await data.json()

  word = data[Math.floor(Math.random() * data.length)].toLowerCase()

  goodArray[0] = word[0]
  document.querySelectorAll('#letterSheet div')[0].textContent = word[0]
  return word
}

/*check bingo board winner*/
function equals5(a, b, c, d, e) {
  return a == b && b == c && c == d && d == e && a != ''
}

function checkWinner(sheet) {
  let winner = false

  for (let i = 0; i < sheet.length; i++) {
    // horizontal
    if (
      equals5(sheet[i][0], sheet[i][1], sheet[i][2], sheet[i][3], sheet[i][4])
    ) {
      winner = true
    }

    // vertical
    if (
      equals5(sheet[0][i], sheet[1][i], sheet[2][i], sheet[3][i], sheet[4][i])
    ) {
      winner = true
    }
  }

  //diagonals
  if (
    equals5(sheet[0][0], sheet[1][1], sheet[2][2], sheet[3][3], sheet[4][4])
  ) {
    winner = true
  }

  if (
    equals5(sheet[0][4], sheet[1][3], sheet[2][2], sheet[3][1], sheet[4][0])
  ) {
    winner = true
  }

  return winner
}

function compareWord(guess, woord) {
  guess = guess.toLowerCase()
  woord = woord.toLowerCase()

  // good different/dif bad
  let goodLetter = []
  let difLetter = []

  if (guess == woord) {
    // We have a winner
    console.log('Winner winner Chicken Dinner')
    difLetter = ['good', 'good', 'good', 'good', 'good', 'good']
    return difLetter
  }

  //check same spot
  for (let i = 0; i < woordLength; i++) {
    if (guess.charAt(i) == woord.charAt(i)) {
      goodLetter[i] = 'good'
      goodArray[i] = guess.charAt(i)

      //voorkom dubbele triggers op goede letters
      woord[i] = ''
    }
  }

  // check different spot
  for (let i = 0; i < woordLength; i++) {
    for (let j = 0; j < woordLength; j++) {
      if (guess[i] == woord[j]) {
        difLetter[i] = 'dif'
        //haal letter uit array om dubbele te voorkomen
        woord[j] = ''
      }
    }
  }

  //combineer good en different
  for (let i = 0; i < woordLength; i++) {
    if (goodLetter[i] == 'good') {
      difLetter[i] = goodLetter[i]
    }
  }

  //Kijk of het woord goed is
  if (difLetter[1] == 'good') {
    let goodCounter = 0
    for (let i = 0; i < woordLength; i++) {
      if (difLetter[i] == 'good') {
        goodCounter++
      }
    }
  }
  console.log(difLetter)
  return difLetter
}

// function PlaySound() {
//     sound.src = 'Sound/Bier.mp3';
//     sound.play();
// }

/*check of woord bestaat*/
async function checkWoord(guess) {
  guess = guess.toLowerCase()

  let jsonUrl2 = `${jsonUrl}${guess[0]}.json`
  const responce = await fetch(jsonUrl2)
  let data = await responce.json()

  for (let i of data) {
    if (i.toLowerCase() == guess.toLowerCase()) {
      return true
    }
  }
  document.querySelector('input[type=text]').classList.add('shake')
  console.log('Dit woord bestaat NIET')

  return false
}

// Remove class for next animation
document
  .querySelector('input[type=text]')
  .addEventListener('animationend', () => {
    document.querySelector('input[type=text]').classList.remove('shake')
  })

function lettersToBoard(guess, klopt) {
  if (turn < 5) {
    for (let i = 0; i < woordLength; i++) {
      const letterSpot = woordLength * turn + i
      if (klopt[i] == 'good') {
        letterBoardArr[letterSpot].textContent = guess[i]
        letterBoardArr[letterSpot].classList.add('good')
      } else if (klopt[i] == 'dif') {
        letterBoardArr[letterSpot].textContent = guess[i]
        document
        letterBoardArr[letterSpot].classList.add('diffrent')
      } else {
        letterBoardArr[letterSpot].textContent = guess[i]
      }
    }
    turn++

    if (guess !== hetWoord) {
      for (let j = 0; j < woordLength; j++) {
        letterBoardArr[woordLength * turn + j].textContent = goodArray[j]
      }
    }
  } else {
    console.log('game over bitch boi')
  }
}

function pickBall() {
  const randomNumb = Math.floor(Math.random() * ballenbak.length)

  const pull = ballenbak[randomNumb]
  console.log(pull)

  ballenbak.splice(randomNumb, 1)

  if (typeof pull == 'number') {
    const valueIndex = availableNumb[pull]
    if (valueIndex > -1) {
      availableNumb.splice(valueIndex, 1)
    }

    // update board
    for (let i of bingoSheetElement) {
      if (i.innerHTML == pull) {
        i.classList.add('good')
      }
    }
  }
  console.log(ballenbak)
}
