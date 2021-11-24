/**
 * Un propietario es un tipo de persona la cuál tiene bajo posesión un número de parcelas.
 * 
 * @author Rodrigo Robles
 * @version 1.0
 */
class Propietario extends Persona {

    /**
     * Crea una instancia de propietario.
     * 
     * @param nombre Nombre del propietario
     * @param dni Dni del propietario
     * @param n_parcelas Número de parcelas
     */
    constructor(nombre: string, dni: string, n_parcelas: number) {
        super(nombre, dni, n_parcelas, 50); //el canon se fija en 50 en esta clase
    }

    /**
     * Devuelve el importe total que paga el propietario por el número de parcelas en su posesión.
     * 
     * @returns importe total 
     */
    public getImportePersonal(): number {
        return (this.getCanon() * this.getN_Parcelas());
    }

    /**
     * Devuelve una cadena de texto que contiene toda la información del propietario.
     * 
     * @returns string 
     */
    public toString(): string {
        return super.toString() + ' y gasta al año como propietario: ' + this.getImportePersonal() + " €";
    }
}