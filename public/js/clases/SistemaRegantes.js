"use strict";
var SistemaRegantes = /** @class */ (function () {
    function SistemaRegantes(listaPersonas) {
        this.listaPersonas = listaPersonas;
        this.nombre = "Sistema de Regantes";
    }
    SistemaRegantes.prototype.getnumPersonas = function () {
        return this.listaPersonas.length;
    };
    SistemaRegantes.prototype.getListaPersonas = function () {
        var aTextoPersonas = [];
        for (var i = 0; i < this.listaPersonas.length; i++) {
            aTextoPersonas[i] = this.listaPersonas[i].toString();
        }
        return aTextoPersonas;
    };
    SistemaRegantes.prototype.getPersona = function (dni) {
        var personaResultante = null;
        this.listaPersonas.forEach(function (persona) {
            if (persona.getDni() === dni) {
                personaResultante = persona;
            }
        });
        return personaResultante;
    };
    SistemaRegantes.prototype.incluirPersona = function (persona) {
        var incluido = false;
        if (this.getPersona(persona.getDni()) != null) {
            if (this.listaPersonas.push(persona)) {
                incluido = true;
            }
        }
        return incluido;
    };
    SistemaRegantes.prototype.eliminarPersona = function (dni) {
        var eliminado = false;
        if (this.getPersona(dni) != null) {
            var posicion = 0;
            for (var i = 0; i < this.listaPersonas.length; i++) {
                if (this.listaPersonas[i] === this.getPersona(dni)) {
                    posicion = i;
                }
            }
            if (this.listaPersonas.splice(posicion, 1)) {
                eliminado = true;
            }
        }
        return eliminado;
    };
    SistemaRegantes.prototype.importeTotal = function () {
        var acumulador = 0;
        for (var i = 0; i < this.listaPersonas.length; i++) {
            acumulador += this.listaPersonas[i].getTotalImporte();
        }
        return acumulador;
    };
    return SistemaRegantes;
}());
