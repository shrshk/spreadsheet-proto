 export const createGraph = (rows, cols) => {
    const colNames = ['', ..."abcdefghijklmnopqrstuvwxyz".substr(0,cols).toUpperCase().split('')];
    let res = {};
    [...Array(rows).keys()].forEach((row, i) =>
        colNames.forEach((col, j) => {
            const key = col+row;
            res[key] = {key, value: '', expr: ''};
        })
    )
    return res;
}

function numberToLetters(num) {
    let letters = ''
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters
        num = Math.floor(num / 26) - 1
    }
    return letters
}