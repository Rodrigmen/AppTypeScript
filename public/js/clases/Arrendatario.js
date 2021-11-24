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
 * Un arrendatario es un tipo de persona la cuál cultiva un número de parcelas.
 *
 * @author Rodrigo Robles
 * @version 1.0
 */
var Arrendatario = /** @class */ (function (_super) {
    __extends(Arrendatario, _super);
    /**
     * Crea una instancia de arrendatario.
     *
     * @param nombre Nombre del arrendatario
     * @param dni Dni del arrendatario
     * @param n_parcelas Número de parcelas
     */
    function Arrendatario(nombre, dni, n_parcelas) {
        return _super.call(this, nombre, dni, n_parcelas, 25) || this;
    }
    /**
     * Devuelve el importe total que paga el arrendatario por el número de parcelas en su posesión.
     *
     * @returns importe total
     */
    Arrendatario.prototype.getImportePersonal = function () {
        return (this.getCanon() * this.getN_Parcelas());
    };
    /**
     * Devuelve una cadena de texto que contiene toda la información del arrendatario.
     *
     * @returns string
    */
    Arrendatario.prototype.toString = function () {
        return _super.prototype.toString.call(this) + ' y gasta al año como arrendatario: ' + this.getImportePersonal() + " €";
    };
    return Arrendatario;
}(Persona));
