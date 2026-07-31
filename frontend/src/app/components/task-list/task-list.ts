import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from '../../services/task';
import { TaskResponse, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  tasks: TaskResponse[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private taskService: Task,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log('Fetched Tasks from Backend:', data);
        this.tasks = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks!';
        this.loading = false;
        this.cdr.detectChanges();
        console.error('HTTP Error:', err);
      }
    });
  }

  onStatusChange(task: TaskResponse, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value as TaskStatus;
    const updatedRequest = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: newStatus,
      dueDate: task.dueDate,
      userId: task.userId
    };

    this.taskService.updateTask(task.id, updatedRequest).subscribe({
      next: (updatedTask) => {
        task.status = updatedTask.status;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  onDeleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }
}