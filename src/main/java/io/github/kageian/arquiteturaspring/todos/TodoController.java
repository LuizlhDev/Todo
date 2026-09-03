package io.github.kageian.arquiteturaspring.todos;

import org.springframework.web.bind.annotation.*;

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
        return this.service.salvar(todo);
    }


    @PutMapping("/{id}")
    public void atualizar(@PathVariable Integer id, @RequestBody TodoEntity todo) {
        service.atualizar(id, todo);
    }

    @GetMapping("/{id}")
    public TodoEntity buscarPorId(@PathVariable Integer id){
        return service.buscarPorId(id);
    }
    @GetMapping
    public List<TodoEntity> buscarTodos(TodoEntity todos){
        return service.buscarTodos(todos);
    }

    @DeleteMapping("/{id}")
    public void deletarPorId(@PathVariable Integer id){
        service.deletar(id);
    }
}
