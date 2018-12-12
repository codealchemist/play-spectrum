import './progress.css'

class Progress {
  set (torrent) {
    this.torrent = torrent
    const template = `<div class="progress-bar-container"><div class="progress-bar"></div></div>`
    const temp = document.createElement('div')
    temp.innerHTML = template
    this.$container = temp.querySelector('.progress-bar-container')
    this.$element = this.$container.querySelector('.progress-bar')
    this.mount()
    return this
  }

  update () {
    if (this.torrent.progress === 1) this.destroy()
    const progress = !!this.torrent.progress && this.torrent.progress * 100
    this.$element.style.width = `${progress || 0}%`
    return this
  }

  stop () {
    clearInterval(this.interval)
  }

  destroy () {
    this.stop()
    this.$container.remove()
  }

  mount (container) {
    container = container || 'body'
    if (typeof container === 'string') container = document.querySelector(container)

    container.appendChild(this.$container)
    const seconds = 2
    this.interval = setInterval(() => this.update(), seconds * 1000)
    return this
  }
}

const progress = new Progress()
export default progress
