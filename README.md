[README.md](https://github.com/user-attachments/files/31786658/README.md)
# todo-frontend

Front end feito poR Julio e back end feito por mim(Luiz Henrique)

## Como rodar

1. Extraia o zip e entre na pasta:
   ```
   cd todo-frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Rode o backend Spring Boot (deve subir em `localhost:8080`, mas pode alterar se quiser).

4. Rode o front-end:
   ```
   npm run dev
   ```

5. Acesse o endereço que aparecer no terminal (geralmente `http://localhost:5173`).

## Como funciona a comunicação com o backend

O `vite.config.js` tem um proxy que redireciona todas as chamadas
para `/todos` feito no backend, direto para `http://localhost:8080/todos`. Assim o
front end não precisa se preocupar com CORS facilitando ainda mais o front e o back de ser feito!

## Estrutura

- `src/api/todoApi.js` — funções que chamam o `TodoController`
  (listar, criar, atualizar, deletar).
- `src/components/TodoForm.jsx` — input + botão para criar tarefa.
- `src/components/TodoItem.jsx` — cada linha da lista (checkbox,
  texto, botão X de excluir).
- `src/components/TodoList.jsx` — renderiza a lista de `TodoItem`.
- `src/App.jsx` — junta tudo e gerencia o estado.
- `src/styles/theme.css` — o tema pixelado e rosa pastel escolhido pela gabriella.
