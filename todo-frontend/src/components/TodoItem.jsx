import { useRef, useState } from 'react'
import { playRemover, playTerminar } from '../utils/sounds.js'

export default function TodoItem({ todo, onToggle, onDelete }) {
  const [entering, setEntering] = useState(true)
  const [leaving, setLeaving] = useState(false)
  const [completing, setCompleting] = useState(false)
  const deleted = useRef(false)

  function finishDelete() {
    if (deleted.current) return
    deleted.current = true
    onDelete(todo.id)
  }

  function handleToggle() {
    if (!todo.concluido) {
      playTerminar()
      setCompleting(true)
    }
    onToggle(todo)
  }

  function handleDelete() {
    if (leaving) return
    playRemover()
    setLeaving(true)
    window.setTimeout(finishDelete, 360)
  }

  function handleAnimationEnd(event) {
    if (event.target !== event.currentTarget) return
    if (event.animationName === 'task-enter') {
      setEntering(false)
    }
    if (event.animationName === 'task-close') {
      finishDelete()
    }
    if (event.animationName === 'task-complete') {
      setCompleting(false)
    }
  }

  const classes = [
    'todo-item',
    todo.concluido ? 'is-done' : '',
    entering ? 'is-entering' : '',
    leaving ? 'is-leaving' : '',
    completing ? 'is-completing' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li className={leaving ? 'todo-slot is-leaving' : 'todo-slot'}>
      <div className={classes} onAnimationEnd={handleAnimationEnd}>
        <button
          className="pixel-checkbox"
          aria-label="marcar como concluído"
          onClick={handleToggle}
        >
          {todo.concluido ? '✓' : ''}
        </button>

        <span className="todo-sparkles" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>

        <span className="todo-texto">{todo.descricao}</span>

        <button
          className="pixel-btn pixel-btn-x"
          aria-label="excluir tarefa"
          onClick={handleDelete}
        >
          X
        </button>
      </div>
    </li>
  )
}
