package com.library.fullstacktaskmanagement.dto.task;

import com.library.fullstacktaskmanagement.entity.enums.TaskPriority;
import com.library.fullstacktaskmanagement.entity.enums.TaskStatus;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDate dueDate;
    private Long userId;
    private String userName;


}
