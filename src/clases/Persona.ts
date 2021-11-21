abstract class Persona {
    private nombre: string;
    private dni: string;
    private n_parcelas: number;
    private importe: number;

    constructor(nombre: string, dni: string, n_parcelas: number, importe: number) {
        this.nombre = nombre;
        this.dni = dni;
        this.importe = importe;
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
        
    }public getImporte(): number {
        return this.importe;
    }
    public abstract getTotalImporte(): number;

    public toString(): string {
        return this.nombre + ' {' + this.dni + '}';
    }
}