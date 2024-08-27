import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { UsuariolistComponent } from '../../usuario/usuariolist/usuariolist.component';
import { Userrole } from '../../../models/userrole';

@Component({
  selector: 'app-animaldetails',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, ReactiveFormsModule, UsuariolistComponent],
  templateUrl: './animaldetails.component.html',
  styleUrl: './animaldetails.component.scss'
})
export class AnimaldetailsComponent {

  @Input("animal") animal: Animal = new Animal(0, " ", " ", " ", 0, new Usuario("", "", "", "", null, new Userrole));
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

    //ELEMENTOS DA MODAL
    modalService = inject(MdbModalService); // para conseguir abrir a modal
    @ViewChild("modalUsuario") modalUsuario!: TemplateRef<any>;
    modalRef!: MdbModalRef<any>;

  animalService = inject(AnimalService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }else{
      if(this.animal.id > 0)
        this.findById(id);
    }
  }

  findById(id: number){

    this.animalService.findById(id).subscribe({
      next: retorno => {
        this.animal = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
          customClass: {
            popup: 'swal-overlay'
          }
        });
      }
    });

  }

  save() {
    if (this.animal.id && this.animal.id > 0) {
      this.animalService.update(this.animal, this.animal.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: 'Animal atualizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'swal-overlay'
            }
          });
          this.router2.navigate(['admin/animal'], { state: { animalEditado: this.animal } });
          this.retorno.emit(this.animal);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro ao atualizar o animal',
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'swal-overlay'
            }
          });
        }
      });
    } else {
      this.animalService.save(this.animal).subscribe({
        next: mensagem => {
          Swal.fire({
            title: 'Animal cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'swal-overlay'
            }
          });
          this.router2.navigate(['admin/animal'], { state: { animalNovo: this.animal } });
          this.retorno.emit(this.animal);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro ao cadastrar o animal',
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'swal-overlay'
            }
          });
        }
      });
    }
  }
  

  buscarUsuario(){
    this.modalRef = this.modalService.open(this.modalUsuario, {modalClass: 'modal-lg'});
  }

  retornoUsuario(tutor: Usuario){
    this.animal.tutor = tutor;
    this.modalRef.close();
  }

}
