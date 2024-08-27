import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Produto } from '../../../models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutosService } from '../../../services/produtos.service';
import Swal from 'sweetalert2';
import { ProdutolistComponent } from '../produtolist/produtolist.component';

@Component({
  selector: 'app-produtodetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, ProdutolistComponent],
  templateUrl: './produtodetails.component.html',
  styleUrls: ['./produtodetails.component.scss']
})
export class ProdutodetailsComponent {
  @Input("produto") produto: Produto = new Produto(0, "", 0, 0, true, "");
  @Output("retorno") retorno = new EventEmitter<any>();
  searchId!: number;  // Adicionar a variável searchId

  router = inject(ActivatedRoute);
  router2 = inject(Router);
  produtoService = inject(ProdutosService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    } else {
      if (this.produto.id > 0)
        this.findById(id);
    }
  }

  findById(id: number) {
    this.produtoService.findById(id).subscribe({
      next: retorno => {
        this.produto = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok', customClass: {
            popup: 'swal-overlay'
          }

        });
      }
    });
  }

  // Novo método de busca
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

  save() {
    if (this.produto.id && this.produto.id > 0) {
      this.produtoService.update(this.produto, this.produto.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: 'Produto atualizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'swal-overlay'
            }
          });
          this.router2.navigate(['admin/produto'], { state: { produtoEditado: this.produto } });
          this.retorno.emit(this.produto);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro ao atualizar o produto',
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'swal-overlay'
            }
          });
        }
      });
    } else {
      this.produtoService.save(this.produto).subscribe({
        next: mensagem => {
          Swal.fire({
            title: 'Produto cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'swal-overlay'
            }
          });
          this.router2.navigate(['admin/produto'], { state: { produtoNovo: this.produto } });
          this.retorno.emit(this.produto);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro ao cadastrar o produto',
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

  delete() {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este produto?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.delete(this.produto.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: 'Produto deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
              customClass: {
                popup: 'swal-overlay'
              }
            });
            this.router2.navigate(['admin/produto']);
            this.retorno.emit(null); // Emite null para indicar que o produto foi deletado
          },
          error: erro => {
            Swal.fire({
              title: 'Ocorreu um erro ao deletar o produto',
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
