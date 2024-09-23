import {addToQueue, startStory} from '/src/Dialog.js'
let cast;
let script = []
let sortedScript = [];

export function playScript(text){
    createScript(text)
    sortScript()
    sortedScript.forEach(dialog => addToQueue(dialog))
    startStory()
}

function createScript(text){
    let line = ""
    for(let char of text){
        line +=char;
        if (char == '\n'){
            console.warn("...space detected")
            script.push(line);
            line = ""
        }
    }
}

function sortScript(){
    let isParathesis = false;
    let dialog = {actor: "", text:""}
    let actor = "";
    let text = "";
    let scene = "";
    let state = "";
    let isLine = false;
    let skip = false;

    for(let line of script){
        text = ""
        actor = ""
        isLine = false;

        for(let character of line){
            isParathesis = (character=="(" || character==")")
                //get actor for every line
                setDialog(character)
                isScene(isParathesis)
        }
        dialog.text = text.trimStart()
        if(!skip && !dialog.actor=="") sortedScript.push(dialog);
        dialog = {actor: "", text:""}
        if (scene != ""){
            if(isLine) state = scene
            else {
                dialog = {scene: scene, actors:""}
                sortedScript.push(dialog)
            }
            //console.warn(state)
            
            //console.warn(scene)
        }
        scene = ""
    }
    function setDialog(character){
        if (skip && !isParathesis) scene += character
        if(isLine && !skip) text += character
        if (character==":") {
            isLine = true;
            actor = actor.trimEnd()
            dialog.actor = actor
            //console.log(actor)
            text = ""
        }
        if(!skip && !isParathesis) actor += character
    }
    function isScene(isParathesis){
        if (isParathesis){
            skip == false ? skip = true : skip = false
        }
    }
    console.error(scene)
    console.warn(sortedScript)
}

