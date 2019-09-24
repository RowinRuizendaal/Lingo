/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console': 0*/

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
            board[i][j] = '';
        }
    }
    console.log(board);
}

setup();