import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Task } from '../../services/task';
import { AuthService } from '../../services/auth-service';
import { TaskRequest, TaskResponse, TaskStatus } from '../../models/task.model';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskForm],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  allTasks: TaskResponse[] = [];
  filteredTasks: TaskResponse[] = [];
  currentUser: any = null;
  loading: boolean = false;
  errorMessage: string = '';

  selectedStatus: string = 'ALL';
  selectedPriority: string = 'ALL';

  constructor(
    private taskService: Task,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadMyTasks();
  }

  loadMyTasks(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      this.errorMessage = 'User session not found. Please log in again.';
      return;
    }

    const currentUserId = this.currentUser.id ? Number(this.currentUser.id) : null;

    if (!currentUserId) {
      this.errorMessage = 'Invalid user ID. Please log in again.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.taskService.getTasks(currentUserId).subscribe({
      next: (data) => {
        this.allTasks = data || [];
        this.applyFilters();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.errorMessage = err.error?.message || 'Failed to fetch tasks.';
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  onFilterChange(filterType: 'status' | 'priority', event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (filterType === 'status') {
      this.selectedStatus = value;
    } else if (filterType === 'priority') {
      this.selectedPriority = value;
    }
    this.applyFilters();
  }

  applyFilters(): void {
    const currentUserId = this.currentUser && this.currentUser.id ? Number(this.currentUser.id) : null;

    const filtered = this.allTasks.filter(task => {
      const taskUserId = task.userId ? Number(task.userId) : null;
      const matchUser = currentUserId ? taskUserId === currentUserId : true;

      const taskStatus = task.status ? String(task.status).toUpperCase() : '';
      const taskPriority = task.priority ? String(task.priority).toUpperCase() : '';

      const matchStatus = this.selectedStatus === 'ALL' || taskStatus === this.selectedStatus;
      const matchPriority = this.selectedPriority === 'ALL' || taskPriority === this.selectedPriority;

      return matchUser && matchStatus && matchPriority;
    });

    this.filteredTasks = [...filtered];
    this.cd.detectChanges();
  }

  onTaskCreated(): void {
    this.loadMyTasks();
  }

  onStatusChange(task: TaskResponse, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value as TaskStatus;

    const updatedTaskRequest: TaskRequest = {
      title: task.title,
      description: task.description,
      status: newStatus,
      priority: task.priority,
      dueDate: task.dueDate,
      userId: Number(task.userId)
    };

    this.taskService.updateTask(task.id, updatedTaskRequest).subscribe({
      next: () => {
        this.loadMyTasks();
      },
      error: (err) => {
        console.error('Error updating task status', err);
      }
    });
  }

  onDeleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadMyTasks();
        },
        error: (err) => {
          console.error('Error deleting task', err);
        }
      });
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}