import { Usuario } from "./usuario";

export class Animal {
    id!: number;
    nome!: string;
    especie!: string;
    raca!: string;
    idade!: number;
    tutor!: Usuario;
    
    constructor( id: number, nome: string, especie: string, raca: string, idade: number, tutor: Usuario) {
        this.id = id;
        this.nome = nome;
        this.especie = especie;
        this.raca = raca;
        this.idade = idade;
        if (tutor) this.tutor = tutor;
    }
}
