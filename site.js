const audioContext = new AudioContext()
var playing = false
var play_button = document.getElementById("play_button")
var input = document.getElementById("in")
var audio 
var track


function checkInput(){ 
    let uploadInput = input.files[0]
    let link = URL.createObjectURL(uploadInput)

    audio = new Audio(link)

    track = audioContext.createMediaElementSource(audio)
    track.connect(audioContext.destination)
}

function play() {

    if (audioContext.state == "suspended") {
        audioContext.resume()
    }
    
    checkInput()
    audio.play()

}

function stop(){ 
    audio.pause()

}
function click1() {
    if (playing == false) {
        playing = true
        play_button.innerText = "Pause"
        play()
    } else {
        playing = false
        play_button.innerText = "Play"
        stop()
    }
}