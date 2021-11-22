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
var Arrendatario = /** @class */ (function (_super) {
    __extends(Arrendatario, _super);
    function Arrendatario(nombre, dni, n_parcelas) {
        return _super.call(this, nombre, dni, n_parcelas, 25) || this;
    }
    Arrendatario.prototype.getTotalImporte = function () {
        return (this.getCanon() * this.getN_Parcelas());
    };
    Arrendatario.prototype.toString = function () {
        return _super.prototype.toString.call(this) + ' y gasta al año como arrendatario: ' + this.getTotalImporte() + " €";
    };
    return Arrendatario;
}(Persona));
