import { useEffect, useRef, useState } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import {
  listarTodos,
  criarTodo,
  atualizarTodo,
  deletarTodo,
} from './api/todoApi.js'

export default function App() {
  const [todos, setTodos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [expanding, setExpanding] = useState(false)
  const skipExpand = useRef(true)

  useEffect(() => {
    carregar()
  }, [])

  useEffect(() => {
    if (skipExpand.current) {
      skipExpand.current = false
      return
    }
    setExpanding(true)
    const timer = window.setTimeout(() => setExpanding(false), 500)
    return () => window.clearTimeout(timer)
  }, [todos.length])

  async function carregar() {
    try {
      setCarregando(true)
      const dados = await listarTodos()
      skipExpand.current = true
      setTodos(dados.map((t) => ({ ...t, _key: t.id })))
      setErro(null)
    } catch (e) {
      setErro('rode o backend na porta 8080')
    } finally {
      setCarregando(false)
    }
  }

  async function handleAdd(descricao) {
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
    } catch (e) {
      setTodos((atual) => atual.filter((t) => t.id !== idTemporario))
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

      <div className={`console ${expanding ? 'is-expanding' : ''}`}>
        <div className="console-topbar">
          <span className="console-dot" />
          <span className="console-dot" />
          <span className="console-dot" />
        </div>

        <div className="console-title-wrap">
          <h1 className="console-title">todo.exe</h1>
          <span className="console-subtitle">Para o meu amor: gabriella!</span>
        </div>

        <TodoForm onAdd={handleAdd} />

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
  )
}
