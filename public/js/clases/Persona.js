"use strict";
var Persona = /** @class */ (function () {
    function Persona(nombre, dni, n_parcelas, canon) {
        this.nombre = nombre;
        this.dni = dni;
        this.canon = canon;
        if (n_parcelas < 1) {
            throw new Error("¡Debe tener alguna parcela para incluirlo en el sistema!");
        }
        this.n_parcelas = n_parcelas;
    }
    Persona.prototype.getDni = function () {
        return this.dni;
    };
    Persona.prototype.getN_Parcelas = function () {
        return this.n_parcelas;
    };
    Persona.prototype.getCanon = function () {
        return this.canon;
    };
    Persona.prototype.toString = function () {
        return this.nombre + ' {' + this.dni + '}';
    };
    return Persona;
}());
