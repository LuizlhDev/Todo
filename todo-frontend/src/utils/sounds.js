import criarSrc from '../assets/sound/criar.mp3'
import removerSrc from '../assets/sound/remover.mp3'
import terminarSrc from '../assets/sound/terminar.mp3'
import erroSrc from '../assets/sound/erro.mp3'

function makePool(src, size = 3) {
  const pool = Array.from({ length: size }, () => {
    const audio = new Audio(src)
    audio.preload = 'auto'
    audio.load()
    return audio
  })
  let index = 0

  return function play() {
    const audio = pool[index]
    index = (index + 1) % pool.length
    audio.currentTime = 0
    const playPromise = audio.play()
    if (playPromise) playPromise.catch(() => {})
  }
}

export const playCriar = makePool(criarSrc)
export const playRemover = makePool(removerSrc)
export const playTerminar = makePool(terminarSrc)
export const playErro = makePool(erroSrc)
