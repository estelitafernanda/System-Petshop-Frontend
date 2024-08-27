export class Produto {
    id!: number;
    nome!: string;
    quantidade!: number;
    preco!: number;
    estoque!: boolean;
    descricao!: string;

    constructor(id: number, nome: string, quantidade: number, preco: number, estoque: boolean, descricao: string) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
        this.estoque = estoque;
        this.descricao = descricao;
      }
}
