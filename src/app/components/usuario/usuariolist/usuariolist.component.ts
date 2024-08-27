import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-usuariolist',
  standalone: true,
  imports: [],
  templateUrl: './usuariolist.component.html',
  styleUrl: './usuariolist.component.scss'
})
export class UsuariolistComponent {
  list: Usuario[] = [];
}
