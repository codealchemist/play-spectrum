import Player from 'uplayer'
import dragDrop from 'drag-drop'
import toast from 'js-simple-toast'
import { USpectrumWave, USpectrumHeatmap, USpectrumCircle } from 'uspectrum'
import fullscreen from './fullscreen'
fullscreen.set()

const spectrumAnalyzers = [new USpectrumWave(), new USpectrumHeatmap(), new USpectrumCircle()]
let filename
let timeout
const toastDuration = 2000
let selectedSpectrumAnalyzer = 0

const player = new Player('https://play-spectrum.herokuapp.com/deploy.mp3')
player
  .debug(true)
  .on('stop', () => showToast('Stop.'))
  .on('pause', () => showToast('Pause.'))
  .on('play', () => {
    if (filename) showToast(`Playing ${filename}...`)
    spectrumAnalyzers[selectedSpectrumAnalyzer]
      .init({ context: player.context, buffer: player.buffer, source: player.source })
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

// Switch spectrum analyzer with "s" key.
document.body.addEventListener('keydown', ({ key }) => {
  if (key !== 's') return

  const spectrum = spectrumAnalyzers[selectedSpectrumAnalyzer]
  spectrum.$canvas.style.display = 'none'

  selectedSpectrumAnalyzer++
  if (selectedSpectrumAnalyzer >= spectrumAnalyzers.length) {
    selectedSpectrumAnalyzer = 0
  }

  const newSpectrum = spectrumAnalyzers[selectedSpectrumAnalyzer]
  newSpectrum.$canvas.style.display = 'block'

  console.log('Spectrum Analyzer:', selectedSpectrumAnalyzer)
  spectrumAnalyzers[selectedSpectrumAnalyzer]
    .init({ context: player.context, buffer: player.buffer, source: player.source })
    .render()
})
