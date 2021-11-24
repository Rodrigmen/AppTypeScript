"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Un propietario es un tipo de persona la cuál tiene bajo posesión un número de parcelas.
 *
 * @author Rodrigo Robles
 * @version 1.0
 */
var Propietario = /** @class */ (function (_super) {
    __extends(Propietario, _super);
    /**
     * Crea una instancia de propietario.
     *
     * @param nombre Nombre del propietario
     * @param dni Dni del propietario
     * @param n_parcelas Número de parcelas
     */
    function Propietario(nombre, dni, n_parcelas) {
        return _super.call(this, nombre, dni, n_parcelas, 50) || this;
    }
    /**
     * Devuelve el importe total que paga el propietario por el número de parcelas en su posesión.
     *
     * @returns importe total
     */
    Propietario.prototype.getImportePersonal = function () {
        return (this.getCanon() * this.getN_Parcelas());
    };
    /**
     * Devuelve una cadena de texto que contiene toda la información del propietario.
     *
     * @returns string
     */
    Propietario.prototype.toString = function () {
        return _super.prototype.toString.call(this) + ' y gasta al año como propietario: ' + this.getImportePersonal() + " €";
    };
    return Propietario;
}(Persona));
