import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  userData = { username: '', email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.userData).subscribe({
      next: () => {
        alert('Account created successfully! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'An error occurred during account creation';
      }
    });
  }
}
