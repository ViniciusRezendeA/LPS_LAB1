package com.lps.back.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lps.back.dtos.user.UserRegisterDTO;
import com.lps.back.models.Student;
import com.lps.back.services.interfaces.IStudentService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private IStudentService studentService;

    /**
     * Cria um novo estudante com base nos dados recebidos.
     * - Usamos `@Valid` para garantir a validação dos dados do `UserRegisterDTO`.
     * - Retornamos `201 Created` ao invés de `200 OK`, pois é mais apropriado para indicar criação.
     */
    @PostMapping()
    public ResponseEntity<Student> createStudent(@Valid @RequestBody UserRegisterDTO student) {
        Student createdStudent = studentService.create(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    /**
     * Retorna a lista de todos os estudantes.
     * - Retorna `200 OK` com a lista de estudantes.
     * - Se a lista estiver vazia, ainda retornará `200 OK` com uma lista vazia, indicando que a requisição foi bem-sucedida.
     */
    @GetMapping()
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAll();
        return ResponseEntity.ok(students);
    }

    /**
     * Busca um estudante pelo seu ID.
     * - Se o estudante não for encontrado, lança uma `EntityNotFoundException`, capturada com um tratamento apropriado.
     * - Retorna `404 Not Found` para um ID inexistente, garantindo uma resposta HTTP correta.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        try {
            Student student = studentService.get(id);
            return ResponseEntity.ok(student);
        } catch (EntityNotFoundException e) {
            // Lança uma resposta `404 Not Found` se o estudante não for encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(null);
        }
    }

    /**
     * Exclui um estudante com base no seu ID.
     * - Retorna `204 No Content` após a exclusão bem-sucedida, sem conteúdo no corpo da resposta.
     * - Retorna `404 Not Found` se o ID não for encontrado, para indicar que o recurso não existe.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        try {
            studentService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            // Retorna `404 Not Found` caso o ID não exista
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
