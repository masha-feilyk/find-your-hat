const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field
    }

    print() {
        let str = '';
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                str += this.field[i][j];
            }
            console.log(str);
            str = '';
        }
    }

    static generateField(width, height, percentage) {

        let generatedField = Array.from(Array(height), () => new Array(width));

        let hatPositionX = 0;
        let hatPositionY = 0;

        while (hatPositionY === 0 && hatPositionX === 0) {
            hatPositionX = Math.floor(Math.random() * width);
            hatPositionY = Math.floor(Math.random() * height);
        }

        generatedField[hatPositionY][hatPositionX] = hat;
        generatedField[0][0] = pathCharacter;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (generatedField[i][j] === pathCharacter) {
                    continue;
                } else if (generatedField[i][j] === hat) {
                    continue;
                } else if (Math.random() * 100 < percentage) {
                    generatedField[i][j] = hole;
                } else {
                    generatedField[i][j] = fieldCharacter;
                }
            }
        }

        return generatedField;
    }
}


console.log('Use keyboard to navigate through the field:\n l - left\n r - right\n u - up\n d - down\n');

const myField = new Field(Field.generateField(10, 5, 25));
myField.print();

let findHat = false;
let outBoundaries = false;
let fallInHole = false;
let i = 0,
    j = 0;

while (!outBoundaries && !findHat && !fallInHole) {
    const direction = prompt('Which way?');

    const congratText = 'Congrats, you found your hat!';
    const outBoundariesText = 'You are out of boundaries!';
    const fallInHallText = 'Sorry, you felt into the hole :(';

    if (direction === 'r') {
        if (j + 1 === myField.field[0].length) {
            console.log(outBoundariesText);
            outBoundaries = true;
        } else if (myField.field[i][j + 1] === hole) {
            console.log(fallInHallText);
            fallInHole = true;
        } else if (myField.field[i][j + 1] === hat) {
            console.log(congratText);
            findHat = true;
        } else {
            myField.field[i][j + 1] = pathCharacter;
            myField.print();
            j += 1;
        }

    } else if (direction === 'l') {
        if (j - 1 < 0) {
            console.log(outBoundariesText);
            outBoundaries = true;
        } else if (myField.field[i][j - 1] === hole) {
            console.log(fallInHallText);
            fallInHole = true;
        } else if (myField.field[i][j - 1] === hat) {
            console.log(congratText);
            findHat = true;
        } else {
            myField.field[i][j - 1] = pathCharacter;
            myField.print();
            j -= 1;
        }

    } else if (direction === 'u') {
        if (i - 1 < 0) {
            console.log(outBoundariesText);
            outBoundaries = true;
        } else if (myField.field[i - 1][j] === hole) {
            console.log(fallInHallText);
            fallInHole = true;
        } else if (myField.field[i - 1][j] === hat) {
            console.log(congratText);
            findHat = true;
        } else {
            myField.field[i - 1][j] = pathCharacter;
            myField.print();
            i -= 1;
        }

    } else if (direction === 'd') {
        if (i + 1 === myField.field.length) {
            console.log(outBoundariesText);
            outBoundaries = true;
        } else if (myField.field[i + 1][j] === hole) {
            console.log(fallInHallText);
            fallInHole = true;
        } else if (myField.field[i + 1][j] === hat) {
            console.log(congratText);
            findHat = true;
        } else {
            myField.field[i + 1][j] = pathCharacter;
            myField.print();
            i += 1;
        }
    }
}