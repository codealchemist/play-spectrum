class Fullscreen {
  isFullscreen () {
    this.fullscreenElement = document.fullscreenElement
    if (this.fullscreenElement === undefined) this.fullscreenElement = document.webkitFullscreenElement
    return !!this.fullscreenElement
  }

  toggle () {
    if (this.isFullscreen()) return this.disableFullscreen()
    this.enableFullscreen()
  }

  enableFullscreen () {
    if (document.body.requestFullscreen) return document.body.requestFullscreen()
    document.body.webkitRequestFullScreen()
  }

  disableFullscreen () {
    if (document.exitFullscreen) document.exitFullscreen()
    document.webkitExitFullscreen()
  }

  set (el = document) {
    if (typeof el === 'string') el = document.querySelector(el)
    el.addEventListener('dblclick', () => {
      this.toggle()
    })
  }
}

module.exports = new Fullscreen()
