import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
credentials = { username: '', password: '' };
errorMessage = '';

constructor(private authService: AuthService, private router: Router) {}

onLogin(): void {
  this.authService.login(this.credentials).subscribe({
    next: () => {
      this.router.navigate(['/tasks']);
    },
    error: (err) => {
      this.errorMessage = 'Invalid username or password';
    }
  });
}
}
