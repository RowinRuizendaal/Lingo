let woordLength = 5;
var board = [];
var bingoSheet = [
    ['','','','','',],
    ['','','','','',],
    ['','','','','',],
    ['','','','','',],
    ['','','','','',]
];

function setup() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < woordLength; j++) {
        }
        var board = [i + j] //Wat wil je doen met deze variable J & I ?
        board = [i[j]];
        board = [i][j];
    }
    console.log(board);
}

setup();