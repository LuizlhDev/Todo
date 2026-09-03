import { useState } from 'react'
import { playCriar } from '../utils/sounds.js'

export default function TodoForm({ onAdd }) {
  const [descricao, setDescricao] = useState('')
  const [pop, setPop] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const texto = descricao.trim()
    if (!texto) return
    playCriar()
    setPop(true)
    onAdd(texto)
    setDescricao('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="pixel-input"
        type="text"
        placeholder="nova tarefa..."
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button
        className={`pixel-btn pixel-btn-add ${pop ? 'is-pop' : ''}`}
        type="submit"
        onAnimationEnd={() => setPop(false)}
      >
        add
      </button>
    </form>
  )
}
