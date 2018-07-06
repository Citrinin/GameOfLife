import GameOfLife from './gameOfLife';
import Drawer from './utils/drawer';
import { start } from 'repl';

let game;
let drawer = new Drawer(document.querySelector('#content'));
let startButton = document.querySelector('.play-button');

let routes = [
    {
        match: '',
        onEnter: () => {
            window.location.hash = 'about';
        }
    },
    {
        match: 'about',
        onEnter: () => {
            let content = document.querySelector('#content');
            changeActivePage('about');
            content.innerHTML = '<h1 class="about"><i class="fab fa-buromobelexperte label"></i><span>Conway\'s Game of Life</span><h1>';

        }
    },
    {
        match: 'text',
        onEnter: () => {
            changeActivePage('text');
            content.innerHTML = 'Text';
            game = new GameOfLife(13, 13, 100, drawer.drawText);
            startButton.addEventListener('click', () => { game.startGame() });

        }
    },
    {
        match: 'canvas',
        onEnter: () => {
            changeActivePage('canvas');
            content.innerHTML = 'Canvas';

        }
    },
    {
        match: 'svg',
        onEnter: () => {
            changeActivePage('svg');
            content.innerHTML = 'SVG';

        }
    }
]

export default routes;

function changeActivePage(newPage) {
    document.querySelector('.active').className = '';
    document.querySelector(`[href="#${newPage}"]`).parentElement.className = 'active';
}
