import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Animal } from '../../../models/animal';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AnimalService } from '../../../services/animal.service';
import { AnimaldetailsComponent } from '../animaldetails/animaldetails.component';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { Userrole } from '../../../models/userrole';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animallist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, AnimaldetailsComponent, NgFor, FormsModule],
  templateUrl: './animallist.component.html',
  styleUrls: ['./animallist.component.scss']
})
export class AnimallistComponent {
  lista: Animal[] = [];
  animalEdit: Animal = new Animal(0, " ", " ", " ", 0, new Usuario("", "", "", "", null, new Userrole) );

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalAnimalDetalhe") modalAnimalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  searchId!: number;

  animalService = inject(AnimalService);

  constructor() {
    this.listAll();

    let animalNovo = history.state.animalNovo;
    let animalEditado = history.state.animalEditado;

    if (animalNovo != null) {
      animalNovo.id = 555;
      this.lista.push(animalNovo);
    }

    if (animalEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == animalEditado.id;
      });
      this.lista[indice] = animalEditado;
    }
  }

  listAll(){
    this.animalService.listaAll().subscribe({
      next: lista => { // quando o back retornar o que se espera
        this.lista = lista;
      },
      error: erro => { // quando ocorrer qualquer erro (badrequest, exceptions..)
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

  deleteById(animal: Animal) {
    if (animal.id) {
        Swal.fire({
            title: 'Tem certeza que deseja deletar este registro?',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                this.animalService.delete(animal.id).subscribe({
                    next: mensagem => {
                        Swal.fire({
                            title: mensagem,
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            customClass: {
                              popup: 'swal-overlay'
                            }
                        });
                        this.listAll();
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
        });
    }
  }

  new(){
    this.animalEdit = new Animal(0, " ", " ", " ", 0, new Usuario("", "", "", "", null, new Userrole));
    this.modalRef = this.modalService.open(this.modalAnimalDetalhe);
  }

  edit(animal: Animal){
    this.animalEdit = Object.assign({}, animal); // clonando pra evitar referência de objeto
    this.modalRef = this.modalService.open(this.modalAnimalDetalhe);
  }
  findById(id: number) {
    this.animalService.findById(id).subscribe({
      next: animal => {
        // Atualiza a lista para conter apenas o produto encontrado
        this.lista = [animal];
      },
      error: erro => {
        Swal.fire({
          title: 'Animal não encontrado',
          icon: 'error',
          confirmButtonText: 'Ok',
          customClass: {
            popup: 'swal-overlay'
          }
        });
        // Limpa a lista caso não encontre o produto
        this.lista = [];
      }
    });
  }
  search() {
    if (this.searchId) {
      this.findById(this.searchId);
    } else {
      Swal.fire({
        title: 'ID inválido',
        icon: 'warning',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'swal-overlay'
        }
      });
    }
  }
  retornoDetalhe(animal: Animal){
    this.listAll();
    this.modalRef.close();
  }

  trackByAnimalId(index: number, animal: Animal): number {
    return animal.id;
  }
}
