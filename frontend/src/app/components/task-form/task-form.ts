import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../services/task';
import { TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm {
  @Output() taskCreated = new EventEmitter<void>();

  taskForm: FormGroup;
  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);

  constructor(
    private fb: FormBuilder,
    private taskService: Task
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: [TaskPriority.MEDIUM, Validators.required],
      status: [TaskStatus.PENDING, Validators.required],
      dueDate: ['', Validators.required],
      userId: [1, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.taskForm.reset({
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.PENDING,
          userId: 1
        });
        this.taskCreated.emit();
      },
      error: (err) => console.error('Error creating task:', err)
    });
  }
}