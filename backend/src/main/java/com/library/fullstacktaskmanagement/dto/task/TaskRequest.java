package com.library.fullstacktaskmanagement.dto.task;

import com.library.fullstacktaskmanagement.entity.enums.TaskPriority;
import com.library.fullstacktaskmanagement.entity.enums.TaskStatus;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private TaskStatus status;

    @NotNull(message = "Priority is required")
    private TaskPriority priority;

    @NotNull(message = "Due Date is required")
    private LocalDate dueDate;

    @NotNull(message = "User Id is required")
    private Long userId;
}
