import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../models/login';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  login: Login = new Login();

  // Injeção do serviço Router e LoginService
  router = inject(Router);
  loginService = inject(LoginService);

  constructor() {
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if (token) { // Usuário e senha corretos
          this.loginService.addToken(token);
          if (this.loginService.hasPermission("ADMIN") || this.loginService.hasPermission("USER")) {
            this.router.navigate(['/admin/produtos']);
          }
        } else { // Usuário ou senha incorretos
          alert('Usuário ou senha incorretos!');
        }
      },
      error: erro => {
        alert('Erro ao realizar login.');
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
