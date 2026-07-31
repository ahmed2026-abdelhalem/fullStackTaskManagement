package com.library.fullstacktaskmanagement.repository;

import com.library.fullstacktaskmanagement.entity.Task;
import com.library.fullstacktaskmanagement.entity.User;
import com.library.fullstacktaskmanagement.entity.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {


    List<Task> findByUserId(Long userId);

    List<Task> findByUserIdAndStatus(Long userId, TaskStatus status);

    Long user(User user);
}
