export class Endereco {
    id?: number;
    rua!: string;
    numero!: number;

    constructor(rua: string, numero: number){
        this.rua = rua;
        this.numero = numero;
    }
}
