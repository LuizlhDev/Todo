const BASE_URL = '/todos'

export async function listarTodos() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Erro ao buscar todos')
  return res.json()
}

export async function criarTodo(descricao) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao, concluido: false }),
  })
  if (!res.ok) {
    const erro = new Error('Erro ao criar todo')
    erro.status = res.status
    throw erro
  }
  return res.json()
}

export async function atualizarTodo(todo) {
  const res = await fetch(`${BASE_URL}/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
  if (!res.ok) throw new Error('Erro ao atualizar todo')
}

export async function deletarTodo(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erro ao deletar todo')
}
