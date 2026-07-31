package com.library.fullstacktaskmanagement.controller;

import com.library.fullstacktaskmanagement.dto.task.TaskRequest;
import com.library.fullstacktaskmanagement.dto.task.TaskResponse;
import com.library.fullstacktaskmanagement.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody TaskRequest request) {

        TaskResponse response = taskService.createTask(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.getTaskById(taskId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskResponse>> getTasksByUserId(@PathVariable Long userId) {

        List<TaskResponse> tasks = taskService.getTasksByUserId(userId);

        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @Valid @RequestBody TaskRequest request) {
        TaskResponse updatedTask = taskService.updateTask(taskId, request);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {

        taskService.deleteTask(taskId);

        return ResponseEntity.noContent().build();
    }
}
