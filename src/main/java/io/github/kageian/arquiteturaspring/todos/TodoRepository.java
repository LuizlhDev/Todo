package io.github.kageian.arquiteturaspring.todos;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<TodoEntity,Integer> {

    boolean existsByDescricao(String descricao);

}
