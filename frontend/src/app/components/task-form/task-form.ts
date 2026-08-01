import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../services/task';
import { AuthService } from '../../services/auth-service';
import { TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {
  @Output() taskCreated = new EventEmitter<void>();

  taskForm!: FormGroup;
  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);
  currentUserId: number = 1; 

  constructor(
    private fb: FormBuilder,
    private taskService: Task,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser?.();
    if (user?.id) {
      this.currentUserId = user.id;
    }

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [TaskPriority.MEDIUM, Validators.required],
      status: [TaskStatus.PENDING, Validators.required],
      dueDate: ['', Validators.required],
      userId: [this.currentUserId, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.taskForm.reset({
          title: '',
          description: '',
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.PENDING,
          dueDate: '',
          userId: this.currentUserId
        });
        this.taskCreated.emit();
      },
      error: (err) => console.error('Error creating task:', err)
    });
  }
}