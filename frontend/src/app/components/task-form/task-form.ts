import { Component } from '@angular/core';
import { TaskPriority } from '../../models/task.model';
import { TaskStatus } from '../../models/task.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../services/task';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
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
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: () => {
          this.taskForm.reset({
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.PENDING,
            userId: 1
          });
          window.location.reload();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
