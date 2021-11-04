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
        console.log('Use keyboard to navigate through the field:\n l - left\n r - right\n u - up\n d - down\n');

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

const myField = new Field(Field.generateField(10, 5, 25));
myField.print();

const congratText = 'Congrats, you found your hat!';
const outBoundariesText = 'You are out of boundaries!';
const fallInHallText = 'Sorry, you felt into the hole :(';

let findHat = false,
    outBoundaries = false,
    fallInHole = false;
let i = 0,
    j = 0;

while (!outBoundaries && !findHat && !fallInHole) {
    const direction = prompt('Which way?');

    switch (direction) {
        case 'r':
            j += 1;
            break;
        case 'l':
            j -= 1;
            break;
        case 'u':
            i -= 1;
            break;
        case 'd':
            i += 1;
            break;
        default:
            console.log('Use these commands to navigate through the field:\n l - left\n r - right\n u - up\n d - down\n');
    }

    if (j === myField.field[0].length || i === myField.field.length || j < 0 || i < 0) {
        console.log(outBoundariesText);
        outBoundaries = true;
    } else if (myField.field[i][j] === hole) {
        console.log(fallInHallText);
        fallInHole = true;
    } else if (myField.field[i][j] === hat) {
        console.log(congratText);
        findHat = true;
    } else {
        myField.field[i][j] = pathCharacter;
        console.clear();
        myField.print();
    }
}