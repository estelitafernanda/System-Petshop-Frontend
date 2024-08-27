import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuariolist',
  standalone: true,
  imports: [],
  templateUrl: './usuariolist.component.html',
  styleUrl: './usuariolist.component.scss'
})
export class UsuariolistComponent {
  list: Usuario[] = [];

  usuario: any[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.listaAll().subscribe(data => {
      this.usuario = data;
    });
  }
}
