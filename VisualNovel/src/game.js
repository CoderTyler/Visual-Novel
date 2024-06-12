import {playScript} from "/src/DialogManager.js"

const loadBg = document.getElementById("load-bg")
let loadY = loadBg.width-window.innerHeight;
let seconds = 2
let loadTime = (seconds*75)+loadY;
let loading = false;
let time = loadY + (75*loadTime);
let currentScene;
let files = ["Nanachi", "Capital of the Unreturned"];
let scripts = []

files.forEach(file => readScript(file))


function readScript(file){
        fetch(`assets/scripts/${file}.txt`)
                .then(res => res.blob())
                .then(blob => {
                                readFile(blob)   
                        })
}

function readFile(file){
        const fr = new FileReader() 
        fr.readAsText(file)
        fr.addEventListener("load", () =>{
                                const res = fr.result;
                                scripts.push(res)
                                if(scripts.length == files.length){
                                        sendScripts()
                                }
                            })

}

function sendScripts(){
        loadGame(scripts[0], playScript)  
}

//loadGame(text, playScript)
//loading()
function loadGame(param, gameMode){
    const gameLoad = document.querySelector(".game-load")
    const backgrounds = 3
    const randomBg = Math.ceil(Math.random()*backgrounds)
    gameLoad.style.top = 0
    gameLoad.style.display = "block"
    loadBg.src = `assets/loading/${randomBg}.jpg`
    console.log(randomBg)
    playLoading()
    function playLoading(){
        loadBg.style.top = `${loadY}px`
        const sceneLoop = setInterval(animateImage, 75, loadBg, gameLoad, param, gameMode)
        currentScene = sceneLoop;
        }
}
function animateIcon(){
        const icon = document.getElementById("load-icon")
        icon.style.transform = `rotate(${loadY}deg)`
}
function animateImage(img, gameLoad, param, gameMode){
        if (loadY <= 0) img.style.top = `${loadY}px`
        animateIcon()
        loadY++;
        console.log(loadTime)
        if (loadY >= loadTime){
            console.log("...scene over")
            gameLoad.style.display = "none";
            loading = false
            /**callback*/
            if(param != null)gameMode(param)
            else gameMode()
            clearInterval(currentScene)
        }
}