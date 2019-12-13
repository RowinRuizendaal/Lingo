var woordLength = 6;
let availableNumb = [];

var guess = '';
var hetWoord = '';
var goedeLetters = [];
let goodArray = [];

var turn = 0;

var board = [''];
var bingoSheet = [
    ['', '', '', '', '', ],
    ['', '', '', '', '', ],
    ['', '', '', '', '', ],
    ['', '', '', '', '', ],
    ['', '', '', '', '', ]
];

var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', "w", 'x', 'y', 'z'];

/*link naar woordenlijsten*/
// var jsonUrl = 'https://rowinruizendaal.github.io/Lingo/woorden/';
var jsonUrl = 'http://127.0.0.1:5501/woorden/'; //offline server testing

const sound = new Audio();

function setup() {
    for (let i = 0; i < 99; i++) {
        availableNumb[i] = i + 1;
    }
    console.log(availableNumb);

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let index = Math.floor(Math.random() * availableNumb.length);
            let num = availableNumb[index];
            bingoSheet[j][i] = num;
            availableNumb.splice(index, 1);
        }
    }
    console.log(bingoSheet);

    // vul bingo sheet
    for (let i = 0; i < bingoSheet.length; i++) {
        for (let j = 0; j < bingoSheet.length; j++) {
            let x = i * 5 + j;
            document.querySelectorAll('#bingoSheet div')[x].textContent = bingoSheet[i][j];
        }
    }

    /*geluid knop*/
    // document.getElementsByClassName('bier')[0].addEventListener('click', PlaySound);

    /*prevent refresh als submit*/
    document.getElementsByClassName("testing")[0].addEventListener("click", function (event) {
        event.preventDefault()
    });

    // document.getElementsByClassName("bier")[0].addEventListener("click", function (event) {
    //     event.preventDefault()
    // });
}
setup();

async function randomWoord() {
    let ranNumb = Math.floor(Math.random() * abc.length);
    let url = jsonUrl + abc[ranNumb] + '.json';
    let data = await fetch(url);
    data = await data.json();
    ranNumb = Math.floor(Math.random() * data.length);

    hetWoord = data[ranNumb].toLowerCase();

    goodArray[0] = hetWoord.charAt(0);
    document.querySelectorAll('#letterSheet div')[0].textContent = hetWoord.charAt(0);
    console.log(hetWoord);
    return hetWoord;
}

hetWoord = randomWoord();
console.log(hetWoord);

/*check bingo board winner*/
function equals5(a, b, c, d, e) {
    return (a == b && b == c && c == d && d == e && a != '');
}

function checkWinner(sheet) {
    //horizontal en vertical
    for (let i = 0; sheet.length; i++) {
        if (equals5(sheet[i][0], sheet[i][1], sheet[i][2], sheet[i][3], sheet[i][4])) {
            console.log('winner');
        }
    }

    for (let i = 0; i < sheet.length; i++) {
        if (equals5(sheet[0][i], sheet[1][i], sheet[2][i], sheet[3][i], sheet[4][i])) {
            console.log('winner');
        }
    }

    //diagonal 
    if (equals5(sheet[0][0], sheet[1][1], sheet[2][2], sheet[3][3], sheet[4][4])) {
        console.log('winner');
    }

    if (equals5(sheet[0][4], sheet[1][3], sheet[2][2], sheet[3][1], sheet[4][0])) {
        console.log('winner');
    }
}


function wordToLetter(s) {
    s = s.toLowerCase();
    let letters = [];
    for (let i = 0; i < s.length; i++) {
        letters.push(s.charAt(i));
    }
    return letters;
}


function compareWord(guess, woord) {
    // good different/dif bad
    let goodLetter = [];
    let difLetter = [];

    console.log(guess);
    // console.log(woord);

    let guessArray = wordToLetter(guess);
    // let alleLetters = guessArray;
    let hetWoordArray = wordToLetter(woord);

    console.log(guessArray);
    //check same spot
    for (let i = 0; i < woordLength; i++) {
        if (guess.charAt(i) == woord.charAt(i)) {
            goodLetter[i] = 'good';
            goodArray[i] = guess.charAt(i);
            
            //voorkom dubbele triggers op goede letters
            hetWoordArray[i] = '';
        }
    }

    // check different spot
    for (let i = 0; i < woordLength; i++) {
        for (let j = 0; j < woordLength; j++) {
            if (guessArray[i] == hetWoordArray[j]) {
                difLetter[i] = 'dif';
                //haal letter uit array om dubbele te voorkomen
                hetWoordArray.splice(j, 1)
            }
        }
    }

    //combineer good en different
    for (let i = 0; i < woordLength; i++) {
        if (goodLetter[i] == 'good') {
            difLetter[i] = goodLetter[i];
        }
    }

    //Kijk of het woord goed is
    if (difLetter[1] == 'good') {
        let goodCounter = 0;
        for (let i = 0; i < woordLength; i++) {
            if (difLetter[i] == 'good') {
                goodCounter++;
            }
        }
        if (goodCounter >= woordLength) {
            console.log('Winner winner Chicken Dinner');

            //Select random bingo num, select, fill/class
            // document.querySelectorAll()[]

        }
    }
    console.log(difLetter);
    lettersToBoard(guess, difLetter);
}


function textveldCheck() {
    let input = document.getElementsByClassName('gok')[0].value; //input van form

    document.getElementsByClassName('Woord')[0].textContent = 'Gegokte woord: ' + input;
    document.getElementsByClassName('gok')[0].value = ""; //input van form weer leegmaken voor volgende ronde

    /*kijk of bestaat*/
    checkWoord(input);
}

// function PlaySound() {
//     sound.src = 'Sound/Bier.mp3';
//     sound.play();
// }

document.getElementsByClassName('testing')[0].addEventListener('click', textveldCheck);

/*check of woord bestaat*/
async function checkWoord(guess) {
    guessArray = wordToLetter(guess);
    if (guessArray.length < woordLength) {
        document.querySelector('input[type=text]').classList.add('shake');
        console.log('woord lengte klopt niet');
        
        return;
    }

    let jsonUrl2 = jsonUrl + guess.charAt(0).toLowerCase() + '.json';
    const responce = await fetch(jsonUrl2);
    let data = await responce.json();

    for (i = 0; i < data.length; i++) {
        if (data[i].toLowerCase() == guess.toLowerCase()) {
            compareWord(guess, hetWoord)
            return;
        }
    }
    document.querySelector('input[type=text]').classList.add('shake');
    console.log('Dit woord bestaat NIET');
}

//Haal class van object voor volgende animatie
document.querySelector('input[type=text]').addEventListener('animationend', () => {
    document.querySelector('input[type=text]').classList.remove('shake');
})

function lettersToBoard(guess, klopt) {
    let woordString = wordToLetter(guess);

    if (turn < 5) {
        for (let i = 0; i < woordLength; i++) {
            if (klopt[i] == 'good') {
                document.querySelectorAll('#letterSheet div')[woordLength * turn + i].textContent = woordString[i];
                document.querySelectorAll('#letterSheet div')[woordLength * turn + i].classList.add('good');
            } else if (klopt[i] == 'dif') {
                document.querySelectorAll('#letterSheet div')[woordLength * turn + i].textContent = woordString[i];
                document.querySelectorAll('#letterSheet div')[woordLength * turn + i].classList.add('diffrent');
            } else {
                document.querySelectorAll('#letterSheet div')[woordLength * turn + i].textContent = woordString[i];
            }
        }
        turn++;

        if (guess !== hetWoord) {
            for (let j = 0; j < woordLength; j++) {
                document.querySelectorAll('#letterSheet div')[woordLength * turn + j].textContent = goodArray[j];
            }
        }

    } else {
        console.log('game over bitch boi');
    }
}


