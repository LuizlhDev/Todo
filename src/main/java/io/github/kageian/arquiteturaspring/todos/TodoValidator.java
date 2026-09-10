package io.github.kageian.arquiteturaspring.todos;


import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
public class TodoValidator {

    private TodoRepository repository;

    public TodoValidator(TodoRepository repository){
        this.repository = repository;
    }


    public void validar(TodoEntity todo){

        if (existeTodoComDescricao(todo.getDescricao())){
            throw new IllegalArgumentException("Todo ja cadastrado, tente outro");
        }


    }


    private boolean existeTodoComDescricao(String descricao){
        return repository.existsByDescricao(descricao);
    }

}

