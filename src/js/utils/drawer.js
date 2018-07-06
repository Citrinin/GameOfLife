export default class Drawer {
    constructor(boardElement) {
        this.elementForDrawing = boardElement;
        this.drawText = (gameState) => {

            this.elementForDrawing.innerHTML = '';

            var pre = document.createElement('pre');
            pre.classList.add('text-content');

            var result = '';
            gameState.forEach((item, i) => {
                item.forEach((element, j) => {
                    result += element ? 'x' : ' ';
                });
                result += '\n';
            });
            pre.innerHTML = result;
            this.elementForDrawing.appendChild(pre);
        }
    }
}