class Fullscreen {
  constructor () {
    this.fullscreenElement = document.fullscreenElement
    if (this.fullscreenElement === undefined) this.fullscreenElement = document.webkitFullscreenElement
  }

  toggle () {
    if (!this.fullscreenElement) {
      if (document.body.requestFullscreen) return document.body.requestFullscreen()
      document.body.webkitRequestFullScreen()
    } else {
      if (document.exitFullscreen) document.exitFullscreen()
      document.webkitExitFullscreen()
    }
  }

  set (el = document) {
    if (typeof el === 'string') el = document.querySelector(el)
    el.addEventListener('dblclick', () => {
      this.toggle()
    })
  }
}

module.exports = new Fullscreen()
