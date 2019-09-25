var woordLength = 5;

let availableNumb = [];

var board = [''];
var bingoSheet = [
    ['','','','','',],
    ['','','','','',],
    ['','','','','',],
    ['','','','','',],
    ['','','','','',]
];

function setup() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
        // board = [i[j]];
        console.log(j);
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



