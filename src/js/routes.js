import GameOfLife from './gameOfLife';
import Drawer from './utils/drawer';
import { start } from 'repl';

let gameSize = {
    width: +document.querySelector('.size-input.x-input').value,
    height: +document.querySelector('.size-input.y-input').value
};

let drawer = new Drawer(document.querySelector('#content'), gameSize);
let game = new GameOfLife(gameSize, 250, drawer);

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

let speedRange = document.querySelector('input[type=range]');
speedRange.addEventListener('change', ev => {
    game.changeSpeed(ev.target.value);
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
        onBeforeEnter: () => {
            game.stopGame();
            startButton.innerHTML = '<i class="fas fa-play"></i>';
            game.hideControls();
        },
        onEnter: () => {
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
        match: /game-(.+)/,
        onEnter: type => {
            drawer.setDrawer(type[0]);
            changeActivePage(type[0]);
            game.prepareGame();
        },
        onLeave: () => {}
    }
];

export default routes;

function changeActivePage(newPage) {
    document.querySelector('.active').className = '';
    document.querySelector(`[href*="${newPage}"]`).parentElement.className =
        'active';
}
