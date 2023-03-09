const audioContext = new AudioContext();
var file
const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * 1,
    audioContext.sampleRate);

const channelData = buffer.getChannelData(0)

for (let i = 0; i < buffer.length; i++) {
    channelData[i] = Math.random() * 2 - 1;
}



const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);

primaryGainControl.connect(audioContext.destination);

const button = document.createElement('button')
button.innerText = "White Noise"
button.addEventListener("click", () => {
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    whiteNoiseSource.connect(primaryGainControl);
    whiteNoiseSource.start()
})
document.body.appendChild(button)

const snareFilter = audioContext.createBiquadFilter()
snareFilter.type = "highpass"
snareFilter.frequency.value = 1500;
snareFilter.connect(primaryGainControl)

const snareButton = document.createElement("button")
snareButton.innerText = "Snare"

snareButton.addEventListener("click", ()=> {
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;

    const whiteNoiseGain = audioContext.createGain();
    whiteNoiseGain.gain.setValueAtTime(1, audioContext.currentTime)
    whiteNoiseGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
    )
    whiteNoiseSource.connect(whiteNoiseGain);
    whiteNoiseGain.connect(snareFilter)

    whiteNoiseSource.start()
    whiteNoiseSource.stop(audioContext.currentTime + 0.2)

    const snareOscillator = audioContext.createOscillator()
    snareOscillator.type = "triangle"
    snareOscillator.frequency.setValueAtTime(250, audioContext.currentTime)
    
    const oscillatorGain = audioContext.createGain()
    oscillatorGain.gain.setValueAtTime(1, audioContext.currentTime)
    oscillatorGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime)
    snareOscillator.connect(oscillatorGain)
    oscillatorGain.connect(primaryGainControl)
    snareOscillator.start()
    snareOscillator.stop(audioContext.currentTime + 0.2)

})
document.body.appendChild(snareButton);

const kickButton = document.createElement("button")
kickButton.innerText = "Kick"
kickButton.addEventListener("click", ()=> {
    const kickOscillator = audioContext.createOscillator()

    kickOscillator.frequency.setValueAtTime(150, 0)
    kickOscillator.frequency.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.5
    )

    const kickGain = audioContext.createGain()
    kickGain.gain.setValueAtTime(1, 0)
    kickGain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.5
    )
    kickGain.connect(primaryGainControl)
    kickOscillator.connect(primaryGainControl)
    kickOscillator.start()
    kickOscillator(audioContext.currentTime + 0.5)
})
document.body.appendChild(kickButton)

function upload() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = () => {
        file = Array.from(input.files)
       //console.log(file[0])
    }
    input.click();
}


function test() {
    console.log("Hello from the other side!")
    console.log(file[0])
    const track = audioContext.createMediaStreamDestination(file[0])
    track.connect(audioContext.destination)
    
}