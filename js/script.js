var woordLength = 6;

let availableNumb = [];

var board = [''];
var bingoSheet = [
    ['', '', '', '', '', ],
    ['', '', '', '', '', ],
    ['', '', '', '', '', ],
    ['', '', '', '', '', ],
    ['', '', '', '', '', ]
];

const sound = new Audio();
const button = document.getElementsByClassName('bier')[0];
button.addEventListener('click', PlaySound);

function setup() {

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {}
        board.push('a', 'b');
    }
    console.log(board);

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
}

setup();



function fillBingoSheet() {
    for (let i = 0; i < bingoSheet.length; i++) {
        for (let j = 0; j < bingoSheet.length; j++) {
            let x = i * 5 + j;
            document.querySelectorAll('#bingoSheet .row')[x].textContent = bingoSheet[i][j];
        }
    }
}

fillBingoSheet();





/*check bingo board winner*/
function equals5(a, b, c, d, e) {
    return (a == b && b == c && c == d && d == e && a != '');
}

function bingoCheck(sheet) {
    //horizontal en vertical
    for (let i = 0; sheet.length; i++) {
        if (equals5(sheet[i][0], sheet[i][1], sheet[i][2], sheet[i][3], sheet[i][4], )) {
            console.log('winner');
        }
    }

    for (let i = 0; i < sheet.length; i++) {
        if (equals5(sheet[0][i], sheet[1][i], sheet[2][i], sheet[3][i], sheet[4][i], )) {
            console.log('winner');
        }
    }

    //diagonal 
    if (equals5(sheet[0][0], sheet[1][1], sheet[2][2], sheet[3][3], sheet[4][4], )) {
        console.log('winner');
    }

    if (equals5(sheet[0][4], sheet[1][3], sheet[2][2], sheet[3][1], sheet[4][0], )) {
        console.log('winner');
    }
}

let input = document.getElementsByClassName('gok')[0].value; //input van form
var hetWoord = 'eiwip';
var guess = input; //Var guess is gelijk een input
console.log(input);

// guess = guess.toLowerCase;
var letters = [];

function wordToLetter(s) {
    letters = [];
    for (let i = 0; i < s.length; i++) {
        letters.push(s.charAt(i));
    }
    if (guess.length != woordLength) {
        console.log('helaas dat is geen ' + woordLength + ' woord')
    }
    return letters;
}


// hetWoord = hetWoord.toLowerCase;


function compareWord(guess, woord) {
    let goodLetter = [];
    let difLetter = [];

    // good different/dif bad

    let tempArray = wordToLetter(guess);
    let tempArray2 = wordToLetter(woord);

    console.log(tempArray);

    //check same spot
    for (let i = 0; i < woordLength; i++) {
        if (guess.charAt(i) == woord.charAt(i)) {
            goodLetter[i] = 'good';
        }
    }
    console.log(goodLetter);

    for (let i = 0; i < woordLength; i++) {
        for (let j = 0; j < woordLength; j++) {
            if (tempArray[i] == tempArray2[j]) {
                difLetter[i] = 'dif';
                //haal letter uit array om dubbele te voorkomen
                tempArray2.splice(j, 1)
            }
        }
    }
    console.log(difLetter);

    //combineer good en different
    for (let i = 0; i < woordLength; i++) {
        if (goodLetter[i] == 'good') {
            difLetter[i] = goodLetter[i];
        }
    }
    console.log(difLetter);

    //check if correct spot, dan check in woord, haal weg uit array als zo
}



//compareWord('eiwitt', 'eiwitt'); aanroepen in functie textveldcheck laten staan voor debug


function textveldCheck() {
    let input = document.getElementsByClassName('gok')[0].value; //input van form
    document.getElementsByClassName('Woord')[0].textContent = 'Gegokte woord: ' + input;
    compareWord(input, 'eiwitt'); //Vergelijk de woorden van input met het gekozen woord
    document.getElementsByClassName('gok')[0].value = ""; //input van form weer leegmaken voor volgende ronde
}


function PlaySound() {
    sound.src = 'Sound/Bier.mp3';
    sound.play();
}


document.getElementsByClassName('testing')[0].addEventListener('click', textveldCheck);