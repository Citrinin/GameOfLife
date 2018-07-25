import GameOfLife from './gameOfLife';
import Drawer from './utils/drawer';
import { start } from 'repl';

let drawer = new Drawer(document.querySelector('#content'));
let game = new GameOfLife(13, 13, 100, drawer.drawText);
game.showControls();
let startButton = document.querySelector('.play-button');
startButton.addEventListener('click', () => {
    game.toggleGame();
    if (game.play == true) {
        startButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        startButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

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
            game.hideControls();
            let content = document.querySelector('#content');
            changeActivePage('about');
            content.innerHTML = `
            <div class="about">
                <h1>
                    <i class="fab fa-buromobelexperte label"></i>
                    <span>Conway\'s Game of Life</span>
                </h1>
                <h2 class="wiki">
                    <a class="link" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia</a>
                </h2>
                <h2><a class="link" href="https://github.com/Citrinin">Author - Kate Kuzkina</a></h2>
            </div>`;
        },
        onLeave: () => {
            game.showControls();
        }
    },
    {
        match: 'text',
        onEnter: () => {
            changeActivePage('text');
            content.innerHTML = 'Text';
            game.prepareGame();
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
];

export default routes;

function changeActivePage(newPage) {
    document.querySelector('.active').className = '';
    document.querySelector(`[href="#${newPage}"]`).parentElement.className =
        'active';
}
