export default class Drawer {
    constructor(boardElement) {
        this.elementForDrawing = boardElement;

        this.textBoard = document.createElement('pre');
        this.textBoard.classList.add('text-content');
        this.canvasBoard = document.createElement('canvas');
        this.svgBoard = document.createElement('svg');

        this.draw = this.drawText;
        this.board = this.textBoard;
    }

    drawText(gameState) {
        this.elementForDrawing.innerHTML = '';

        var result = '';
        gameState.forEach((item, i) => {
            item.forEach((element, j) => {
                result += element ? 'x' : ' ';
            });
            result += '\n';
        });
        this.board.innerHTML = result;
        this.elementForDrawing.appendChild(this.board);
    }

    setDrawer(type) {
        switch (type) {
            case 'text': {
                this.draw = this.drawText;
                this.board = this.textBoard;
                return;
            }
            case 'canvas': {
                this.draw = this.drawCanvas;
                this.board = this.canvasBoard;
                return;
            }
            case 'svg': {
                this.draw = this.drawSVG;
                this.board = this.svgBoard;
                return;
            }
            default: {
                return;
            }
        }
    }
}
