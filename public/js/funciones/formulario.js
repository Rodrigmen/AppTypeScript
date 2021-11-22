"use strict";
function comprobarTexto() {
    var error = "";
    var hayError = false;
    var pError;
    var bEnviar = document.getElementById("0");
    this.value = this.value.trim();
    if (this.id === "dni") {
        pError = document.getElementById("edni");
        var reg = /^\d{8}[A-Z]$/;
        if (reg.test(this.value)) {
            var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
            var letraInsertada = this.value.charAt(8);
            var numeros = this.value.substring(0, 8);
            var posicion = parseInt(numeros) % 23;
            var letraObtenida = letras.charAt(posicion);
            if (letraInsertada != letraObtenida) {
                error = "¡Error en el formato!";
                hayError = true;
            }
        }
        else {
            error = "¡Error en el formato!";
            hayError = true;
        }
    }
    else {
        pError = document.getElementById("enombre");
        if (this.value.length === 0) {
            error = "¡No se ha introducido nada!";
            hayError = true;
        }
        if (this.value.length > 15) {
            error = "¡Nombre demasiado largo! (15 carácteres como máximo)";
            hayError = true;
        }
    }
    if (hayError) {
        if (bEnviar) {
            bEnviar.disabled = true;
        }
        this.style.borderColor = "red";
        if (pError) {
            pError.innerHTML = error;
            pError.style.color = "red";
        }
    }
    else {
        if (bEnviar) {
            bEnviar.disabled = false;
        }
        this.style.borderColor = "";
        if (pError) {
            pError.innerHTML = "";
        }
    }
}
function enviarFormulario() {
    var dni = document.getElementById("dni").value;
    var iNombre = document.getElementById("nombre");
    if (iNombre) {
        var nombre = iNombre.value;
        var n_parcelas = parseInt(document.getElementById("parcelas").value);
        var gTipos = document.getElementsByName("tipos");
        var tipo = "";
        gTipos.forEach(function (radio) {
            if (radio.checked) {
                tipo = radio.id;
            }
        });
        insertarPersona(dni, nombre, tipo, n_parcelas);
    }
    else {
        eliminarPersona(dni);
    }
}
function actualizarTotal() {
    var spanTotal = document.getElementById('total');
    var spanImporte = document.getElementById('importe');
    var gTipo = document.getElementsByName('tipos');
    var numParcelas = parseInt(document.getElementById('parcelas').value);
    if (numParcelas < 1) {
        numParcelas = 1;
        document.getElementById('parcelas').value = "1";
    }
    var importe = 0;
    var resultado;
    gTipo.forEach(function (radio) {
        if (radio.checked) {
            if (radio.id === "arrendatario") {
                importe = 25;
            }
            else {
                importe = 50;
            }
        }
    });
    resultado = (importe * numParcelas);
    if (spanImporte) {
        spanImporte.innerHTML = "";
        spanImporte.innerHTML = importe.toString();
    }
    if (spanTotal) {
        spanTotal.innerHTML = "";
        spanTotal.innerHTML = resultado.toString();
    }
}
function insertarPersona(dni, nombre, tipo, n_parcelas) {
    var Persona = null;
    if (tipo === "propietario") {
        Persona = new Propietario(nombre, dni, n_parcelas);
    }
    else {
        Persona = new Arrendatario(nombre, dni, n_parcelas);
    }
    if (sistema.incluirPersona(Persona)) {
        ultimaAccion = "Has insertado una persona";
        cargarMenu();
    }
    else {
        ultimaAccion = "Has intentado insertar una persona sin mucho éxito";
        var pError = document.getElementById('edni');
        if (pError) {
            pError.style.color = "red";
            pError.innerHTML = "Ya existe una persona con ese dni...";
        }
    }
}
function eliminarPersona(dni) {
    if (sistema.eliminarPersona(dni)) {
        ultimaAccion = "Has eliminado a una persona";
        cargarMenu();
    }
    else {
        ultimaAccion = "Has intentado eliminar una persona sin mucho éxito";
        var pError = document.getElementById('edni');
        if (pError) {
            pError.style.color = "red";
            pError.innerHTML = "Persona inexistente...";
        }
    }
}
