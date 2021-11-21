"use strict";
var Persona = /** @class */ (function () {
    function Persona(nombre, dni, n_parcelas, importe) {
        this.nombre = nombre;
        this.dni = dni;
        this.importe = importe;
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
    Persona.prototype.getImporte = function () {
        return this.importe;
    };
    Persona.prototype.toString = function () {
        return this.nombre + ' {' + this.dni + '}';
    };
    return Persona;
}());
