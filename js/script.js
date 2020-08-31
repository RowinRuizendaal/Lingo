const woordLength = 6
let availableNumb = []

let guess = ''
let hetWoord = ''
let goedeLetters = []
let goodArray = []

let turn = 0

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

// link naar woordenlijsten
const jsonUrl = `${window.location.href}woorden/`

const sound = new Audio()

async function setup() {
  // get random word
  hetWoord = await randomWoord()
  console.log(hetWoord)

  for (let i = 0; i < 99; i++) {
    availableNumb.push(i + 1)
  }
  console.log(availableNumb)

  // Get 25 random numbers out of available array
  const shuffled = availableNumb.sort(() => 0.5 - Math.random()).slice(0, 25)
  console.log(shuffled)

  // vul bingo sheet
  for (let i = 0; i < bingoSheet.length; i++) {
    for (let j = 0; j < bingoSheet.length; j++) {
      let x = i * 5 + j
      bingoSheet[i][j] = shuffled[x]
      document.querySelectorAll('#bingoSheet div')[x].textContent = shuffled[x]
    }
  }

  console.log(bingoSheet)

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
    console.log('aaa')

    const goodArr = compareWord(input, woord)
    lettersToBoard(input, goodArr)

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
  //horizontal en vertical
  for (let i = 0; sheet.length; i++) {
    if (
      equals5(sheet[i][0], sheet[i][1], sheet[i][2], sheet[i][3], sheet[i][4])
    ) {
      console.log('winner')
    }
  }

  for (let i = 0; i < sheet.length; i++) {
    if (
      equals5(sheet[0][i], sheet[1][i], sheet[2][i], sheet[3][i], sheet[4][i])
    ) {
      console.log('winner')
    }
  }

  //diagonal
  if (
    equals5(sheet[0][0], sheet[1][1], sheet[2][2], sheet[3][3], sheet[4][4])
  ) {
    console.log('winner')
  }

  if (
    equals5(sheet[0][4], sheet[1][3], sheet[2][2], sheet[3][1], sheet[4][0])
  ) {
    console.log('winner')
  }
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
      compareWord(guess, hetWoord)
      console.log('yeeehaww')
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
      if (klopt[i] == 'good') {
        document.querySelectorAll('#letterSheet div')[
          woordLength * turn + i
        ].textContent = guess[i]
        document
          .querySelectorAll('#letterSheet div')
          [woordLength * turn + i].classList.add('good')
      } else if (klopt[i] == 'dif') {
        document.querySelectorAll('#letterSheet div')[
          woordLength * turn + i
        ].textContent = guess[i]
        document
          .querySelectorAll('#letterSheet div')
          [woordLength * turn + i].classList.add('diffrent')
      } else {
        document.querySelectorAll('#letterSheet div')[
          woordLength * turn + i
        ].textContent = guess[i]
      }
    }
    turn++

    if (guess !== hetWoord) {
      for (let j = 0; j < woordLength; j++) {
        document.querySelectorAll('#letterSheet div')[
          woordLength * turn + j
        ].textContent = goodArray[j]
      }
    }
  } else {
    console.log('game over bitch boi')
  }
}
