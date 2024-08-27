import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Produto } from '../../../models/produto';
import { ProdutosService } from '../../../services/produtos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProdutodetailsComponent } from '../produtodetails/produtodetails.component';
import { NgFor } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtolist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, ProdutodetailsComponent, NgFor, MdbFormsModule, FormsModule],
  templateUrl: './produtolist.component.html',
  styleUrls: ['./produtolist.component.scss']
})
export class ProdutolistComponent {
  lista: Produto[] = [];

  ProdutoEdit: Produto = new Produto(0, "", 0, 0, true, "");

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // para conseguir abrir a modal
  @ViewChild("modalProdutoDetalhe") modalProdutoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  searchId!: number;

  router = inject(ActivatedRoute);
  router2 = inject(Router);
  produtoService = inject(ProdutosService);

  constructor() {
    this.listAll();

    let produtoNovo = history.state.produtoNovo;
    let produtoEditado = history.state.produtoEditado;

    if (produtoNovo != null) {
      produtoNovo.id = 555;
      this.lista.push(produtoNovo);
    }

    if (produtoEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == produtoEditado.id;
      });
      this.lista[indice] = produtoEditado;
    }
  }

  listAll(){
    this.produtoService.listaAll().subscribe({
      next: lista => { //quando o back retornar o que se espera
        this.lista = lista;
      },
      error: erro => { //quando ocorrer qualquer erro (badrequest, exceptions..)
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  deleteById(produto: Produto) {
  // Verificar se o produto existe antes de deletar
  this.produtoService.findById(produto.id).subscribe({
    next: (produtoExistente) => {
      // Se o produto existir, confirmar a deleção
      Swal.fire({
        title: 'Tem certeza que deseja deletar este registro?',
        icon: 'warning',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
      }).then((result) => {
        if (result.isConfirmed) {
          this.produtoService.delete(produto.id).subscribe({
            next: mensagem => {
              Swal.fire({
                title: 'Produto deletado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Ok',
                customClass: {
                  popup: 'swal-overlay'
                }
              });
              this.listAll(); // Atualiza a lista de produtos
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
    },
    error: erro => {
      Swal.fire({
        title: 'Produto não encontrado',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'swal-overlay'
        }
      });
    }
  });
  }

  new(){
    this.ProdutoEdit = new Produto(0, "", 0, 0, true, "");
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }

  edit(produto: Produto){
    this.ProdutoEdit = Object.assign({}, produto); // clonando pra evitar referência de objeto
    this.modalRef = this.modalService.open(this.modalProdutoDetalhe);
  }

  findById(id: number) {
    this.produtoService.findById(id).subscribe({
      next: produto => {
        // Atualiza a lista para conter apenas o produto encontrado
        this.lista = [produto];
      },
      error: erro => {
        Swal.fire({
          title: 'Produto não encontrado',
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

  retornoProdutoDetalhe(produto: Produto){
    this.listAll();
    this.modalRef.close();
  }

  trackByProdutoId(index: number, produto: Produto): number {
    return produto.id;
  }
}
