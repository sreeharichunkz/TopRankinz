d = 0;
function dark_theme_toggle() {

    if (d == 0) {
        d = 1;
        document.body.classList.toggle('dark');

    }
    else if (d == 1) {
        d = 0;
        document.body.classList.toggle('dark');

    }
    else {
        d = 1;
    }
}

function menu_toggle() {
    document.getElementById('menu').classList.toggle('-right-full');
    document.getElementById('menu').classList.toggle('right-0');
    document.getElementById('menu').classList.toggle('duration-700');
    document.getElementById('menu').classList.toggle('animate__fadeInRight');
    document.getElementById('menu').classList.toggle('animate__fadeOutRight');
}

function dropdown_menu_toggle(name) {
    document.getElementById(name).classList.toggle('h-0');
}