import { Endereco } from "./endereco";
import { Userrole } from "./userrole";

export class Usuario {
    id?: number;
    nome!: string;
    email!: string;
    senha!: string;
    contato!: string;
    endereco!: Endereco;
    role!: Userrole;

    constructor(nome: string, email: string, senha: string, contato: string, endereco: Endereco | null, role: Userrole ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.contato = contato;
        if (endereco)  this.endereco = endereco

        
        if (role) this.role = role

    }
}
