const audioContext = new AudioContext()
let playing = false
let play_button = document.getElementById("play_button")
let input = document.getElementById("in")
function play() {

    //let a = new Audio(input.attributes.)
    console.log(input.getAttribute("value"))
    audioContext.createMediaElementSource()
}
function click1() {
    if (playing == false) {
        playing = true
        play_button.innerText = "Pause"
        play()
    } else {
        playing = false
        play_button.innerText = "Play"
    }
}