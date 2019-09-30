var woordLength = 5;

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
        for (let j = 0; j < 5; j++) {
            // board = [i[j]];
            // console.log(j);
            // board[i].push('a', 'b');
        }
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

var hetWoord = 'eiwip';
var guess = 'eiwit';

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
    // good dif bad

    let tempArray = wordToLetter(guess);
    console.log(tempArray);

    for (let i = 0; i <= woordLength; i++) {
        if (guess.charAt(i) == woord.charAt(i)) {
            goodLetter[i] = 'good';
            tempArray.splice(i, 1);
            console.log(tempArray);
            // break;
        } else {
            for (let j = 0; j < 5; j++) {
                if (tempArray[j] == woord.charAt(i)) {
                    goodLetter[i] = 'def';
                    tempArray.splice(i, 1);
                    console.log(tempArray);
                    console.log('def');
                } else {
                    goodLetter[i] = 'bad';
                    console.log('bad');
                }
            }
        }
    }
    console.log(goodLetter);

    // check if correct spot, dan check in woord, haal weg uit array als zo
}

compareWord('aaaate', 'eiwitt');

function PlaySound() {
    sound.src = 'Sound/Bier.mp3';
    sound.play();
}


