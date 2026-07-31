import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskForm } from './components/task-form/task-form';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskForm, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-management-app');
}
