var routes = [
    {
        match: '',
        onEnter: () => {
            window.location.hash = 'about';
        }
    },
    {
        match: 'about',
        onEnter: () => {
            let content = document.querySelector("#content");

            content.innerHTML = '<h1 class="about"><i class="fab fa-buromobelexperte label"></i><span>Conway\'s Game of Life</span><h1>';

        }
    },
    {
        match: 'text',
        onEnter: () => {
            content.innerHTML = 'Text';

        }
    },
    {
        match: 'canvas',
        onEnter: () => {
            content.innerHTML = 'Canvas';

        }
    },
    {
        match: 'svg',
        onEnter: () => {
            content.innerHTML = 'SVG';

        }
    }
]

export default routes;