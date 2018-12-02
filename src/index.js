import Player from 'uplayer'
import dragDrop from 'drag-drop'
import toast from 'js-simple-toast'

const player = new Player('https://play-spectrum.herokuapp.com/deploy.mp3')
player
  .debug(true)
  .useKeyboard()
  .load()
  .play()
toast.show('Drop an audio file to start playing!')

dragDrop('body', function (files) {
  const file = files[0]
  console.log('GOT FILE:', file)
  const reader = new window.FileReader()
  reader.addEventListener('load', e => {
    const data = e.target.result
    player.load(data).play()
    toast.show(`Playing ${file.name}...`)
  })
  reader.addEventListener('error', err => {
    console.error('FileReader error' + err)
    toast.show('Oops! Something went wrong :(')
  })
  reader.readAsArrayBuffer(file)
})
