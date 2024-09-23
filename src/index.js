const gameMenu = document.querySelector(".game-menu")
const options = document.querySelectorAll(".menu-option");
const music = "assets/audio/music/To the Abyss.mp3"
const menuMusic = document.getElementById("menu-music");
const effect = document.getElementById("menu-effect")
let currentSelect;
const settings = document.querySelector(".game-settings")
const credits = document.querySelector(".game-credits")

window.addEventListener('load', loadMenu)
function loadMenu(){
    settings.style.display = "none"
    credits.style.display = "none"
    console.log("..loading music")
    menuMusic.volume = 0.4;
    menuMusic.src= music;
}

options.forEach(option => {
                            option.addEventListener("click", optionSelected)
                            option.addEventListener("mousemove", optionHover)
                          })

function optionSelected(e){
    const option = e.target.id
    const menu = document.querySelector(".menu-options")

    if(option == "play") {
        console.log("...starting game")
        effect.src = "assets/audio/effects/tap.mp3"
    }
    if(option == "settings" ){
        menu.style.display = "none"
        credits.style.display = "none"
        settings.style.display = "block"
        console.log(settings.style.display)
    }
    if (option == "credits"){
        menu.style.display = "none"
        settings.style.display = "none"
        credits.style.display = "block"
        console.log(credits.style.display)
    }
}

function optionHover(e){
    const option = e.target.id
    if (option != currentSelect){
        effect.src = "assets/audio/effects/select.mp3"
        const menuBg = document.querySelector("#menu-bg")
        console.log(option)
        menuBg.src = `assets/menu/${option}.jpg`
    }
    currentSelect = option

}