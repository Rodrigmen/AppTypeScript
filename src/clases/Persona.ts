/**
 * Cualquier tipo de persona que forma parte del sistema.
 * 
 * @author Rodrigo Robles
 * @version 1.0
*/
abstract class Persona {

    private nombre: string;
    private dni: string;
    private n_parcelas: number;
    private canon: number;

    /**
     * Crea una instancia de una persona.
     * 
     * @param nombre Nombre de la persona
     * @param dni Dni de la persona
     * @param n_parcelas Número de parcelas de la persona
     * @param canon Canon de importe (pago por parcela)
     */
    constructor(nombre: string, dni: string, n_parcelas: number, canon: number) {
        this.nombre = nombre;
        this.dni = dni;
        this.canon = canon;
        this.n_parcelas = n_parcelas;
    }

    /**
     * Devuelve el dni del objeto 'Persona'.
     * @returns string
    */
    public getDni(): string {
        return this.dni;
    }

    /**
     * Devuelve el número de parcelas del objeto 'Persona'.
     * @returns number
    */
    public getN_Parcelas(): number {
        return this.n_parcelas;

    }

    /**
     * Devuelve el canon (importe por parcela) del objeto 'Persona'.
     * @returns number
    */
    public getCanon(): number {
        return this.canon;
    }

    /**
     * Método que obtiene el importe total del objeto 'Persona'.
     * @abstract
    */
    public abstract getImportePersonal(): number;

    /**
     * Devuelve en cadena de texto los datos del objeto 'Persona'.
     * @returns string
    */
    public toString(): string {
        return this.nombre + ' {' + this.dni + '}';
    }
}