const audioContext = new AudioContext();

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
    whiteNoiseSource.connect(snareFilter);
    whiteNoiseSource.start()
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
    kickOscillator.connect(primaryGainControl)
    kickOscillator.start()
    kickOscillator(audioContext.currentTime + 0.5)
})
document.body.appendChild(kickButton)