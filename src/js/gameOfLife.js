export default class GameOfLife {
    constructor(gameSize, speed, drawer) {
        this.gameSize = gameSize;
        this.speed = speed;
        this.state = this.getEmpty2DArray(
            this.gameSize.height,
            this.gameSize.width
        );
        this.drawer = drawer;

        this.addGalaxy();
        this.play = false;
        this.toggleCell();
    }

    prepareGame() {
        this.drawer.draw(this.state);
    }

    toggleGame() {
        this.play = !this.play;
        if (this.play) {
            this.timer = setInterval(() => {
                this.step();
            }, this.speed);
        } else {
            clearInterval(this.timer);
        }
    }
    changeSpeed(newValue) {
        this.speed = newValue;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.step();
        }, this.speed);
    }
    stopGame() {
        this.play = false;
        clearInterval(this.timer);
    }
    step() {
        var newArray = this.getEmpty2DArray(
            this.gameSize.height,
            this.gameSize.width
        );

        for (let i = 0; i < this.gameSize.height; i++) {
            for (let j = 0; j < this.gameSize.width; j++) {
                var aliveCells = this.countAliveCells(this.state, i, j);
                if (this.state[i][j]) {
                    if (aliveCells === 3 || aliveCells === 2) {
                        newArray[i][j] = 1;
                    }
                } else {
                    if (aliveCells === 3) {
                        newArray[i][j] = 1;
                    }
                }
            }
        }
        this.state = newArray;
        this.drawer.draw(this.state);
    }

    countAliveCells(array, x, y) {
        var result = 0;
        for (var i = x - 1; i <= x + 1; i++) {
            result += this.getCellState(array, i, y - 1);
            result += this.getCellState(array, i, y + 1);
        }
        result += this.getCellState(array, x - 1, y);
        result += this.getCellState(array, x + 1, y);
        return result;
    }

    getCellState(array, x, y) {
        return (array[x] || [])[y] ? 1 : 0;
    }

    getEmpty2DArray(height, width) {
        return new Array(height).fill(0).map(() => new Array(width).fill(0));
    }
    toggleCell() {
        this.drawer.elementForDrawing.addEventListener('click', event => {
            if (event.target !== this.drawer.board) {
                return;
            }
            var height = this.drawer.board.clientHeight;
            var width = this.drawer.board.clientWidth;
            var x = event.offsetX;
            var y = event.offsetY;
            var rowHeight = height / this.gameSize.height;
            var cellWidth = width / this.gameSize.width;
            var offsetX = Math.floor(x / cellWidth);
            var offsetY = Math.floor(y / rowHeight);
            this.state[offsetY][offsetX] = this.state[offsetY][offsetX] ? 0 : 1;
            this.drawer.draw(this.state);
        });
    }
    addGalaxy() {
        this.state[2][2] = 1;
        this.state[3][2] = 1;
        this.state[4][2] = 1;
        this.state[5][2] = 1;
        this.state[6][2] = 1;
        this.state[7][2] = 1;

        this.state[2][3] = 1;
        this.state[3][3] = 1;
        this.state[4][3] = 1;
        this.state[5][3] = 1;
        this.state[6][3] = 1;
        this.state[7][3] = 1;

        this.state[9][2] = 1;
        this.state[9][3] = 1;
        this.state[9][4] = 1;
        this.state[9][5] = 1;
        this.state[9][6] = 1;
        this.state[9][7] = 1;

        this.state[10][2] = 1;
        this.state[10][3] = 1;
        this.state[10][4] = 1;
        this.state[10][5] = 1;
        this.state[10][6] = 1;
        this.state[10][7] = 1;

        this.state[5][9] = 1;
        this.state[6][9] = 1;
        this.state[7][9] = 1;
        this.state[8][9] = 1;
        this.state[9][9] = 1;
        this.state[10][9] = 1;

        this.state[5][10] = 1;
        this.state[6][10] = 1;
        this.state[7][10] = 1;
        this.state[8][10] = 1;
        this.state[9][10] = 1;
        this.state[10][10] = 1;

        this.state[2][5] = 1;
        this.state[2][6] = 1;
        this.state[2][7] = 1;
        this.state[2][8] = 1;
        this.state[2][9] = 1;
        this.state[2][10] = 1;

        this.state[3][5] = 1;
        this.state[3][6] = 1;
        this.state[3][7] = 1;
        this.state[3][8] = 1;
        this.state[3][9] = 1;
        this.state[3][10] = 1;
    }

    showControls() {
        var controlsDiv = document.querySelector('.controls');
        controlsDiv.style.display = 'block';
    }

    hideControls() {
        var controlsDiv = document.querySelector('.controls');
        controlsDiv.style.display = 'none';
    }

    changeSize() {
        let newState = this.getEmpty2DArray(
            this.gameSize.height,
            this.gameSize.width
        );

        for (let i = 0; i < newState.length; i++) {
            for (let j = 0; j < newState[i].length; j++) {
                newState[i][j] = (this.state[i] || [])[j] || 0;
            }
        }
        this.state = newState;
        this.drawer.draw(this.state);
    }
}
