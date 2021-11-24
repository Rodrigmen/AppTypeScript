"use strict";
/**
 * Cualquier tipo de persona que forma parte del sistema.
 *
 * @author Rodrigo Robles
 * @version 1.0
*/
var Persona = /** @class */ (function () {
    /**
     * Crea una instancia de una persona.
     *
     * @param nombre Nombre de la persona
     * @param dni Dni de la persona
     * @param n_parcelas Número de parcelas de la persona
     * @param canon Canon de importe (pago por parcela)
     */
    function Persona(nombre, dni, n_parcelas, canon) {
        this.nombre = nombre;
        this.dni = dni;
        this.canon = canon;
        this.n_parcelas = n_parcelas;
    }
    /**
     * Devuelve el dni del objeto 'Persona'.
     * @returns string
    */
    Persona.prototype.getDni = function () {
        return this.dni;
    };
    /**
     * Devuelve el número de parcelas del objeto 'Persona'.
     * @returns number
    */
    Persona.prototype.getN_Parcelas = function () {
        return this.n_parcelas;
    };
    /**
     * Devuelve el canon (importe por parcela) del objeto 'Persona'.
     * @returns number
    */
    Persona.prototype.getCanon = function () {
        return this.canon;
    };
    /**
     * Devuelve en cadena de texto los datos del objeto 'Persona'.
     * @returns string
    */
    Persona.prototype.toString = function () {
        return this.nombre + ' {' + this.dni + '}';
    };
    return Persona;
}());
