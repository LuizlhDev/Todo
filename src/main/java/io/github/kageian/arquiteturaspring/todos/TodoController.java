package io.github.kageian.arquiteturaspring.todos;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {


    private TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @PostMapping
    public TodoEntity salvar(@RequestBody TodoEntity todo) {
        try{
            return service.salvar(todo);

        }catch (IllegalArgumentException e ){
                var menssagemError = e.getMessage();
                throw  new ResponseStatusException(HttpStatus.CONFLICT, menssagemError);
        }

    }


    @PutMapping("/{id}")
    public void atualizar(@PathVariable Integer id, @RequestBody TodoEntity todo) {
        service.atualizar(id, todo);
    }

    @GetMapping("/{id}")
    public TodoEntity buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }

    @GetMapping
    public List<TodoEntity> buscarTodos() {
        return service.buscarTodos();
    }

    @DeleteMapping("/{id}")
    public void deletarPorId(@PathVariable Integer id) {
        service.deletar(id);
    }

    @DeleteMapping
    public void deletarTodos(){
        service.deletarTodos();
    }
}
