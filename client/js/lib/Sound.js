export default class Sound {
  constructor(url) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    this.volume = 1
    this.context = new AudioContext()
    this.load(this.filename(url))
  }

  filename(url) {
    const testAudio = document.createElement('audio')
    const mp3support = !!(testAudio.canPlayType && testAudio.canPlayType('audio/mpeg;').replace(/no/, ''))
    if (mp3support) {
      return url
    } else {
      return url.replace('mp3', 'ogg')
    }
  }

  play() {
    if (this.buffer){
      const source = this.context.createBufferSource()
      const gainNode = this.context.createGain()
      source.buffer = this.buffer
      gainNode.gain.value = this.volume
      source.connect(gainNode)
      gainNode.connect(this.context.destination)
      source.start(0)
    } else if (!this.queued) {
      this.queued = true
      this.onReady = this.play
    }
  }

  load(url) {
    const request = new XMLHttpRequest()
    request.open('get', url, true)
    request.responseType = 'arraybuffer'
    request.onload = this.decodeAudio.bind(this)
    request.send()
  }

  decodeAudio(e) {
    this.context.decodeAudioData(e.currentTarget.response, this.saveBuffer.bind(this))
  }

  saveBuffer(incomingBuffer) {
    this.buffer = incomingBuffer
    this.onReady && this.onReady()
  }
}

