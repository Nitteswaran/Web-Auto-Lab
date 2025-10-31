let idletime = 0;
const statusEl = document.getElementById('status');
const music = document.getElementById('music');


setInterval(() => {
    idletime++;
    if (idletime > 5) {
        statusEl.textContent = "Idle detected... Starting Focus Music";
        music.play();
    }
}, 1000);

document.addEventListener('mousemove', () => {
    idletime = 0;
    statusEl.textContent = "You're active!";
    music.pause();
    music.currentTime = 0;
})

