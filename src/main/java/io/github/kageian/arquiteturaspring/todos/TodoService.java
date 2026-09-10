package io.github.kageian.arquiteturaspring.todos;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TodoService {

    private TodoRepository repository;
    private TodoValidator validator;

    public TodoService(TodoRepository repository,
                       TodoValidator validator) {
        this.repository = repository;
        this.validator = validator;

    }

    public TodoEntity salvar(TodoEntity novoTodo) {
        validator.validar(novoTodo);
        return repository.save(novoTodo);

    }

    public TodoEntity atualizar(Integer id, TodoEntity todo){
        todo.setId(id);
        return repository.save(todo);
    }


    public TodoEntity buscarPorId(Integer id){
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Id não encontrado..."));
    }

    public List<TodoEntity> buscarTodos(){
        return repository.findAll();
    }

    public void deletar(Integer id){
        repository.deleteById(id);
    }

    public void deletarTodos(){
       repository.deleteAll();
    }
}
