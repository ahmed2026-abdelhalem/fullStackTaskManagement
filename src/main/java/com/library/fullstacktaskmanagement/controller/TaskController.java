package com.library.fullstacktaskmanagement.controller;

import com.library.fullstacktaskmanagement.dto.task.TaskResponse;
import com.library.fullstacktaskmanagement.service.TaskService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<List<TaskResponse>> createTask(@PathVariable Long userId) {

        List<TaskResponse> tasks = taskService.getTasksByUserId(userId);

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TaskResponse>> getTasksByUserId(@PathVariable Long userId) {

        List<TaskResponse> tasks = taskService.getTasksByUserId(userId);

        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {

        taskService.deleteTask(taskId);

        return ResponseEntity.noContent().build();
    }
}
