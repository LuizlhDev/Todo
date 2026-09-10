import { useEffect, useRef, useState } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import {
  listarTodos,
  criarTodo,
  atualizarTodo,
  deletarTodo,
} from './api/todoApi.js'
import { playCriar, playErro } from './utils/sounds.js'

export default function App() {
  const [todos, setTodos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [formError, setFormError] = useState(0)

  const growRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    carregar()
  }, [])

  useEffect(() => {
    const growEl = growRef.current
    const innerEl = innerRef.current
    if (!growEl || !innerEl) return

    let alvo = -1
    let frame = null
    let pronto = false

    const aplicar = (animar) => {
      const proxima = Math.round(innerEl.getBoundingClientRect().height)
      if (proxima === alvo) return
      alvo = proxima
      growEl.style.transition = animar
        ? 'height 0.32s cubic-bezier(0.22, 1, 0.36, 1)'
        : 'none'
      growEl.style.height = `${proxima}px`
    }

    aplicar(false)
    requestAnimationFrame(() => {
      pronto = true
    })

    const observer = new ResizeObserver(() => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => aplicar(pronto))
    })
    observer.observe(innerEl)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  async function carregar() {
    try {
      setCarregando(true)
      const dados = await listarTodos()
      setTodos(dados.map((t) => ({ ...t, _key: t.id })))
      setErro(null)
    } catch (e) {
      setErro('rode o backend na porta 8080')
    } finally {
      setCarregando(false)
    }
  }

  async function handleAdd(descricao) {
    const jaExiste = todos.some(
      (t) => t.descricao.trim().toLowerCase() === descricao.trim().toLowerCase(),
    )
    if (jaExiste) {
      playErro()
      setFormError((n) => n + 1)
      return
    }

    const idTemporario = Date.now()
    const todoTemporario = {
      id: idTemporario,
      descricao,
      concluido: false,
      _key: idTemporario,
    }

    setTodos((atual) => [...atual, todoTemporario])

    try {
      const novo = await criarTodo(descricao)
      setTodos((atual) =>
        atual.map((t) =>
          t.id === idTemporario ? { ...novo, _key: t._key } : t,
        ),
      )
      playCriar()
    } catch (e) {
      setTodos((atual) => atual.filter((t) => t.id !== idTemporario))
      if (e.status === 409) {
        playErro()
        setFormError((n) => n + 1)
      }
    }
  }

  async function handleToggle(todo) {
    const atualizado = { ...todo, concluido: !todo.concluido }
    setTodos((atual) =>
      atual.map((t) => (t.id === todo.id ? atualizado : t)),
    )
    const { _key, ...payload } = atualizado
    await atualizarTodo(payload)
  }

  async function handleDelete(id) {
    setTodos((atual) => atual.filter((t) => t.id !== id))
    await deletarTodo(id)
  }

  return (
    <div className="page">
      <span className="pixel-deco heart-a" aria-hidden="true">
        ♥
      </span>
      <span className="pixel-deco heart-b" aria-hidden="true">
        ♥
      </span>
      <span className="pixel-deco star-a" aria-hidden="true">
        ✦
      </span>
      <span className="pixel-deco star-b" aria-hidden="true">
        ✦
      </span>

      <div className="console">
        <div className="console-grow" ref={growRef}>
          <div className="console-inner" ref={innerRef}>
            <div className="console-topbar">
              <span className="console-dot" />
              <span className="console-dot" />
              <span className="console-dot" />
            </div>

            <div className="console-title-wrap">
              <h1 className="console-title">todo.exe</h1>
              <span className="console-subtitle">Para o meu amor: gabriella!</span>
            </div>

            <TodoForm onAdd={handleAdd} errorSignal={formError} />

            {carregando && <p className="empty-state">carregando...</p>}
            {erro && <p className="erro-state">{erro}</p>}

            {!carregando && !erro && (
              <TodoList
                todos={todos}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
