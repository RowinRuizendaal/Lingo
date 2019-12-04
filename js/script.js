var woordLength = 6;
let availableNumb = [];

var guess = '';
var hetWoord = '';

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
var jsonUrl = 'http://127.0.0.1:5500/woorden/'; //offline server testing

const sound = new Audio();

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
    console.log(url);
    let data = await fetch(url);
    data = await data.json();
    ranNumb = Math.floor(Math.random() * data.length);

    hetWoord = data[ranNumb];
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


function wordToLetter(s) {
    let input = document.getElementsByClassName('gok')[0].value; //input form
    // guess = input; //Var guess is gelijk een input

    // guess = guess.toLowerCase;
    var letters = [];
    for (let i = 0; i < s.length; i++) {
        letters.push(s.charAt(i));
    }
    // if (guess.length == woordLength) {
    //     console.log('Dat is een ' + woordLength + ' letter woord');
    // } else {
    //     console.log('Dat is geen ' + woordLength + ' letter woord makker');
    // }
    return letters;
}


function compareWord(guess, woord) {
    // good different/dif bad
    let goodLetter = [];
    let difLetter = [];

    console.log(guess);
    console.log(woord);

    let guessArray = wordToLetter(guess);
    let hetWoordArray = wordToLetter(woord);

    console.log(guessArray);

    //check woord lengte 
    if (guessArray < woordLength) {
        console.log('woord lengte klopt niet');
        return
    }



    //check same spot
    for (let i = 0; i < woordLength; i++) {
        if (guess.charAt(i) == woord.charAt(i)) {
            goodLetter[i] = 'good';
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
    console.log(difLetter);
}


function textveldCheck() {
    let input = document.getElementsByClassName('gok')[0].value; //input van form
    console.log(document.getElementsByClassName('gok')[0].value);

    document.getElementsByClassName('Woord')[0].textContent = 'Gegokte woord: ' + input;
    document.getElementsByClassName('gok')[0].value = ""; //input van form weer leegmaken voor volgende ronde

    /*kijk of bestaat*/
    if (checkWoord(input)) {
        compareWord(input, hetWoord);
    }

    lettersToBoard(input);
}

// function PlaySound() {
//     sound.src = 'Sound/Bier.mp3';
//     sound.play();
// }

document.getElementsByClassName('testing')[0].addEventListener('click', textveldCheck);


/*check of woord bestaat*/
async function checkWoord(guess) {
    let bestaat = false;
    let jsonUrl2 = jsonUrl + guess.charAt(0).toLowerCase() + '.json';
    const responce = await fetch(jsonUrl2);
    let data = await responce.json();

    for (i = 0; i < data.length; i++) {
        if (data[i].toLowerCase() == guess.toLowerCase()) {
            bestaat = true;
            console.log('dit woord bestaat');
            break;
        }
    }
    return bestaat;
}


/*
async function letterLenght() {
    for (let i = 0; i < abc.length; i++) {
        let url = jsonUrl + abc[i] + '.json';
        let resp = await fetch(url);
        resp = await resp.json();
        console.log(resp.length);
    }
}
*/
// letterLenght();

function testLengteWoord(guess) {
    if (!guess.charAt(woordLength + 1 == '')) {
        console.log('niet te lang');
    }

    if (guess.charAt(woordLength - 1 == '')) {
        console.log('te kort');
    }

}

function lettersToBoard(guess) {
    let woordString = wordToLetter(guess);

    for (let i = 0; i < woordLength; i++) {
        document.querySelectorAll('#letterSheet div')[woordLength * turn + i].textContent = woordString[i];
    }

    turn++;
    if (turn > 5) {
        console.log('game over bitch boi');
    }
}