import Player from 'uplayer'
import dragDrop from 'drag-drop'
import toast from 'js-simple-toast'
import Spectrum from 'spectrum'
import fullscreen from './fullscreen'
fullscreen.set()

console.log('TOAST', toast)
let filename = 'deploy.mp3'
let timeout
const toastDuration = 2000
const spectrum = new Spectrum()
const player = new Player('https://play-spectrum.herokuapp.com/deploy.mp3')
player
  .debug(true)
  .on('stop', () => showToast('Stop.'))
  .on('pause', () => showToast('Pause.'))
  .on('play', () => {
    showToast(`Playing ${filename}...`)
    spectrum
      .setAnalyzer({ audioContext: player.context, audioBuffer: player.buffer, audioSource: player.source })
      .render()
  })
  .on('forward', seconds => showToast(`Forward ${seconds} seconds.`))
  .on('rewind', seconds => showToast(`Rewind ${seconds} seconds.`))
  .useKeyboard()
  .load()
  .play()
showToast('Drop an audio file to start playing!')

dragDrop('body', function (files) {
  const file = files[0]
  console.log('GOT FILE:', file)
  filename = file.name
  const reader = new window.FileReader()
  reader.addEventListener('load', e => {
    const data = e.target.result
    player.load(data).play()
  })
  reader.addEventListener('error', err => {
    console.error('FileReader error' + err)
    toast.show('Oops! Something went wrong :(')
  })
  reader.readAsArrayBuffer(file)
})

function showToast (message) {
  if (toast.toast && toast.toast.style.display !== 'none') {
    clearTimeout(timeout)
    timeout = setTimeout(() => showToast(message, toastDuration), 100)
    return
  }

  toast.show(message, toastDuration)
}
