const music = document.getElementById("dialog-music")
const effect = document.getElementById("dialog-effect")
const actionScene = document.getElementById("animatedScene");
const scene = document.getElementById("scene-image");
const dialogActors = document.getElementsByClassName("actor");
const dialogContainer = document.querySelector(".game-container");
const dialogName = document.getElementById("name");
const dialogText = document.getElementById("text");
const files = ["jpg", "png", "webp"]
let actors = 1;
let subDialog = "";
let currentDialog;
let currentChar;
let isTyping = false;
let typeInstant = false;
let wasPuncuation = false;
let running = false;
let charIndex = 0;
let queue = [];
let found = false;

export function startStory(){
    if(!running){
        music.src = "assets/audio/music/Made in Abyss.mp3"
        running = true
        setScene(queue[0].scene)
        dialogName.innerHTML = queue[1].name
        removeActors()
        dialogActors[0].src = `assets/cast/${queue[1].name.toLowerCase()}/default.`
        dialogText.innerHTML = ""
    }
    setTimeout(()=> {
        if (running) {
            dialogContainer.addEventListener('click', () => {
                console.warn("...skipping text");
                typeInstant = true;
            });
        }
        while(isTyping == false && queue.length != 0){
        playQueued();
        }
    }, 1000);
}
    
//if currently typing que dialog while istyping false go through que array
function playQueued(){
    console.log("...starting queued dialog"+` ${queue.length}`);
    let isScene = Object.keys(queue[0])[0] == "scene"
    if (!isScene){
        setActors()
        dialogName.innerHTML = queue[0].name;
        let dialogueFinish = subDialog.length == 1;
        if (dialogueFinish) {
            queue.shift()
            subDialog = "";
        }
        else {
            let subDialogIndex = queue[0].dialog.indexOf(subDialog)
            queue[0].dialog = queue[0].dialog.substring(subDialogIndex)
            console.log(subDialog)
            typeDialog(queue[0].dialog);
        }
    }
    else{
        console.warn("...setting scene "+queue[0].scene);
        if (queue[0].type == ""){
            setScene(queue[0].scene);
        }
        queue.shift();
        subDialog = "";
    }
}

function removeActors(){
    if (actors != dialogActors.length){
        for(let i = actors; i<dialogActors.length; i++){
            dialogActors[i].style.display = "none";
        }
    }
}

function setActors(){
    removeActors();
    files.forEach(file => {
        fetch(queue[0].img+file) 
        .then(res => {
            if (res.ok) {
                dialogActors[0].src= queue[0].img+file;
                found = true;
            }
        })
    })
/**function doesnt update value of found when changed*/
    if(!found){
        dialogActors[0].src= "assets/default/blank.png";
    }
}
export function addToQueue(dialog){
    //if the dialog exist move up by 1 
    let isScene = Object.keys(dialog)[0] == "scene";
    if(!isScene){
        queue.push({name: dialog.actor,
                    img: `assets/cast/${dialog.actor.toLowerCase()}/default.`,
                    dialog: dialog.text});
    }
    else{
        queue.push({scene: `assets/backgrounds/${dialog.scene}.`,
                    type: "",
                    actors: dialog.actors});
    }
}

function typeDialog(dialog){
    const textLoop = setInterval(typeCharacter, 175, dialog);
    currentDialog = textLoop;
    isTyping = true;
    if (subDialog == "" || subDialog.length == 1) dialogText.innerHTML = "";
    
}
    
function typeCharacter(dialog){
    let isPuncuation = currentChar == "?" || currentChar == "!" || currentChar == ","; 
    if(!typeInstant){
        subDialog = dialog.substring(charIndex);
        currentChar = subDialog[0];
        effect.src = "assets/audio/effects/type.mp3";
        dialogText.innerHTML+=currentChar;
        charIndex++;
    } else {
        //need skip char at sub dialog
        if(wasPuncuation) dialogText.innerHTML+=subDialog
        else dialogText.innerHTML=dialog
        wasPuncuation = false;
        subDialog = dialog.substring(dialog.length-1)
        console.log(subDialog)
    }
    if (charIndex >= dialog.length || isPuncuation || typeInstant){
        clearInterval(currentDialog)
        charIndex=0;
        isTyping = false;
        typeInstant = false;
        wasPuncuation = true;
        startStory()
    }
}

export function setScene(img){
files.forEach(file =>{
    fetch(img+file)
        .then(res =>{
            if (res.ok) scene.src = img+file;
            else console.error("scene not found")
        }) 
    })
}
let y = -75;  
let currentScene;
export function playScene(img){
    let frame = document.getElementById("animated-image")
    isTyping = true;
    frame.src = img;
    actionScene.style.top = `${y}px`
    actionScene.appendChild(frame)
    const sceneLoop = setInterval(animateScene, 75, frame)
    currentScene = sceneLoop;
}
function animateScene(frame){
    if (y <= 0) actionScene.style.top = `${y}px`
    y++;
    if (y >= 50){
        console.log("...scene over")
        actionScene.style.display = "none";
        clearInterval(currentScene)
    }
}
