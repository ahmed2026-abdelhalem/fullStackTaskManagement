package com.library.fullstacktaskmanagement.service;

import com.library.fullstacktaskmanagement.dto.task.*;
import com.library.fullstacktaskmanagement.entity.Task;
import com.library.fullstacktaskmanagement.entity.User;
import com.library.fullstacktaskmanagement.entity.enums.TaskStatus;
import com.library.fullstacktaskmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Transactional
    public TaskResponse createTask(TaskRequest request) {

        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found with id: " + request.getUserId()));

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        task.setStatus(request.getStatus() != null ? request.getStatus() : TaskStatus.PENDING);
        task.setUser(user);

        Task savedTask = taskRepository.save(task);
        return mapToTaskResponse(savedTask);
    }

    public List<TaskResponse> getTasksBuUserId(Long userId) {
        return taskRepository.findByUserId(userId)
                .stream()
                .map(this::mapToTaskResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTask(Long taskId){

        if (!taskRepository.existsById(taskId)) {
            throw new RuntimeException("Task not found with id: " + taskId);
        }

        taskRepository.deleteById(taskId);
    }

    private TaskResponse mapToTaskResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .userId(task.getUser().getId())
                .userName(task.getUser().getName())
                .build();
    }


}