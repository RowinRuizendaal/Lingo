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
        for (let j = 0;  j < bingoSheet.length; j++) {
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




var woord = 'Bannaan';
var letters = [];

function wordToLetter(s) {
    letters = [];
    for (let i = 0; i < s.length; i++) {
        letters.push(s.charAt(i));
    }
    console.log(letters);

    if (woord.length != woordLength) {
        console.log('helaas dat is geen ' + woordLength + ' woord')
    }
}

wordToLetter(woord);




function compareWord() {
    
}