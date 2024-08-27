import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Endereco } from '../../models/endereco';
import { Userrole } from '../../models/userrole';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contato: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value); 
    if (this.registerForm.valid) {
      const endereco: Endereco = {
        id: 0,
        rua: this.registerForm.value.rua,
        numero: this.registerForm.value.numero
      };

      const role: Userrole = {
        role: this.registerForm.value.role 
      };

      const usuario: Usuario = {
        id: 0,
        nome: this.registerForm.value.name,
        email: this.registerForm.value.email,
        senha: this.registerForm.value.password,
        contato: this.registerForm.value.contato,
        endereco: endereco,
        role: role 
      };

      this.usuarioService.save(usuario).subscribe({
        next: response => {
          alert('Usuário cadastrado com sucesso!');
        },
        error: error => {
          alert('Erro ao cadastrar usuário.');
          console.error(error); 
        }
      });
    }
  }
}