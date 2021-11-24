/**
 * Un arrendatario es un tipo de persona la cuál cultiva un número de parcelas.
 * 
 * @author Rodrigo Robles
 * @version 1.0
 */
class Arrendatario extends Persona {

    /**
     * Crea una instancia de arrendatario.
     * 
     * @param nombre Nombre del arrendatario
     * @param dni Dni del arrendatario
     * @param n_parcelas Número de parcelas
     */
    constructor(nombre: string, dni: string, n_parcelas: number) {
        super(nombre, dni, n_parcelas, 25);
    }
    
    /**
     * Devuelve el importe total que paga el arrendatario por el número de parcelas en su posesión.
     * 
     * @returns importe total 
     */
    public getImportePersonal(): number {
        return (this.getCanon() * this.getN_Parcelas());
    }

    /**
     * Devuelve una cadena de texto que contiene toda la información del arrendatario.
     * 
     * @returns string 
    */
    public toString(): string {
        return super.toString() + ' y gasta al año como arrendatario: ' + this.getImportePersonal() + " €";
    }
}