const audioContext = new AudioContext()
var playing = false
var play_button = document.getElementById("play_button")
var input = document.getElementById("in")
var slider = document.getElementById("myRange")
var gainNode = null
var audio = null
var track


function checkInput(){ 
    let uploadInput = input.files[0]
    let link = URL.createObjectURL(uploadInput)
    const biquadFilter = audioContext.createBiquadFilter()
    gainNode = audioContext.createGain()

    audio = new Audio(link)

    track = audioContext.createMediaElementSource(audio)
    

    track.connect(gainNode)
    biquadFilter.connect(gainNode)
    gainNode.connect(audioContext.destination)

    biquadFilter.gain.setTargetAtTime(400, audioContext.currentTime, 0)
    biquadFilter.detune.setTargetAtTime(100, audioContext.currentTime, 0)
    biquadFilter.type = 'lowpass'
    biquadFilter.frequency.setTargetAtTime(2000, audioContext.currentTime, 0)
    
    gainNode.gain.setTargetAtTime(slider.value/100, audioContext.currentTime, 0)
    
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

slider.oninput = function() {
    if (gainNode != null) {
        gainNode.gain.setTargetAtTime(slider.value/100, audioContext.currentTime, 0)
    }
}