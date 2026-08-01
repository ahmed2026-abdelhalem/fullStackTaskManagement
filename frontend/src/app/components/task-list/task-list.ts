import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from '../../services/task';
import { TaskResponse, TaskStatus, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  allTasks: TaskResponse[] = [];      
  filteredTasks: TaskResponse[] = []; 
  loading: boolean = true;
  errorMessage: string = '';

  selectedStatus: string = 'ALL';
  selectedPriority: string = 'ALL';

  constructor(
    private taskService: Task,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.allTasks = data;
        this.applyFilter();
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

  onFilterChange(type: 'status' | 'priority', event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (type === 'status') this.selectedStatus = value;
    if (type === 'priority') this.selectedPriority = value;
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredTasks = this.allTasks.filter(task => {
      const matchStatus = this.selectedStatus === 'ALL' || task.status === this.selectedStatus;
      const matchPriority = this.selectedPriority === 'ALL' || task.priority === this.selectedPriority;
      return matchStatus && matchPriority;
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
        this.applyFilter();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  onDeleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.allTasks = this.allTasks.filter(t => t.id !== id);
          this.applyFilter();
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }
}