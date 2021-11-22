abstract class Persona {
    private nombre: string;
    private dni: string;
    private n_parcelas: number;
    private canon: number;

    constructor(nombre: string, dni: string, n_parcelas: number, canon: number) {
        this.nombre = nombre;
        this.dni = dni;
        this.canon = canon;
        if (n_parcelas < 1) {
            throw new Error("¡Debe tener alguna parcela para incluirlo en el sistema!");

        }
        this.n_parcelas = n_parcelas;
    }
    public getDni(): string {
        return this.dni;
    }
    public getN_Parcelas(): number{
        return this.n_parcelas;
        
    }public getCanon(): number {
        return this.canon;
    }
    public abstract getTotalImporte(): number;

    public toString(): string {
        return this.nombre + ' {' + this.dni + '}';
    }
}