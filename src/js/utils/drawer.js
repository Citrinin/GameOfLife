export default class Drawer {
    constructor(boardElement, gameSize) {
        this.elementForDrawing = boardElement;
        this.gameSize = gameSize;

        this.textBoard = document.createElement('pre');
        this.textBoard.classList.add('text-content');
        this.canvasBoard = document.createElement('canvas');
        this.svgBoard = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );

        this.draw = this.drawText;
        this.board = this.textBoard;

        this.pixelSize = 15;

        this.canvasImg = document.querySelector('.paw');
    }

    drawText(gameState) {
        var result = '';
        gameState.forEach((item, i) => {
            item.forEach((element, j) => {
                result += element ? '&#9642;' : ' ';
            });
            result += '\n';
        });
        this.board.innerHTML = result;
    }

    drawCanvas(gameState) {
        let context = this.board.getContext('2d');
        context.clearRect(
            0,
            0,
            this.gameSize.width * this.pixelSize,
            this.gameSize.height * this.pixelSize
        );
        context.fillStyle = 'antiquewhite';
        gameState.forEach((item, i) => {
            item.forEach((element, j) => {
                element &&
                    context.fillRect(
                        j * this.pixelSize,
                        i * this.pixelSize,
                        this.pixelSize - 2,
                        this.pixelSize - 2
                    );
            });
        });
    }

    drawSVG(gameState) {
        var result = '';
        gameState.forEach((item, i) => {
            item.forEach((element, j) => {
                result += element
                    ? `<rect 
                    x="${j * this.pixelSize}"
                    y="${i * this.pixelSize}" 
                    width="${this.pixelSize - 2}" 
                    height="${this.pixelSize - 2}"
                    style="fill:antiquewhite;"></rect>`
                    : '';
            });
        });
        this.svgBoard.innerHTML = result;
    }

    setDrawer(type) {
        this.elementForDrawing.innerHTML = '';
        switch (type) {
            case 'text': {
                this.draw = this.drawText;
                this.board = this.textBoard;
                break;
            }
            case 'canvas': {
                this.draw = this.drawCanvas;
                this.canvasBoard.height = this.gameSize.height * this.pixelSize;
                this.canvasBoard.width = this.gameSize.width * this.pixelSize;
                this.board = this.canvasBoard;
                break;
            }
            case 'svg': {
                this.draw = this.drawSVG;
                this.svgBoard.setAttribute(
                    'height',
                    this.gameSize.height * this.pixelSize
                );
                this.svgBoard.setAttribute(
                    'width',
                    this.gameSize.width * this.pixelSize
                );
                this.board = this.svgBoard;
                break;
            }
            default: {
                this.draw = this.drawText;
                this.board = this.textBoard;
                break;
            }
        }
        this.elementForDrawing.appendChild(this.board);
    }
}
