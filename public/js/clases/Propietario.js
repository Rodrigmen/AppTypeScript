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
var Propietario = /** @class */ (function (_super) {
    __extends(Propietario, _super);
    function Propietario(nombre, dni, n_parcelas) {
        return _super.call(this, nombre, dni, n_parcelas, 50) || this;
    }
    Propietario.prototype.getTotalImporte = function () {
        return (this.getImporte() * this.getN_Parcelas());
    };
    Propietario.prototype.toString = function () {
        return _super.prototype.toString.call(this) + ' y gasta al año como propietario: ' + this.getTotalImporte() + " €";
    };
    return Propietario;
}(Persona));
