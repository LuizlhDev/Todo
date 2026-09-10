import { useEffect, useState } from 'react'

export default function TodoForm({ onAdd, errorSignal }) {
  const [descricao, setDescricao] = useState('')
  const [pop, setPop] = useState(false)
  const [shake, setShake] = useState(false)
  const [showMsg, setShowMsg] = useState(false)

  useEffect(() => {
    if (!errorSignal) return
    setShake(true)
    setShowMsg(true)
    const timer = window.setTimeout(() => setShowMsg(false), 1300)
    return () => window.clearTimeout(timer)
  }, [errorSignal])

  function handleSubmit(e) {
    e.preventDefault()
    const texto = descricao.trim()
    if (!texto) return
    setPop(true)
    onAdd(texto)
    setDescricao('')
  }

  return (
    <>
      <form
        className={`todo-form ${shake ? 'is-shaking' : ''}`}
        onSubmit={handleSubmit}
        onAnimationEnd={(e) => {
          if (e.animationName === 'form-shake') setShake(false)
        }}
      >
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
      {showMsg && (
        <p className="form-error-msg">essa tarefa já existe!</p>
      )}
    </>
  )
}
