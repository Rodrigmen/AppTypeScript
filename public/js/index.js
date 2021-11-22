"use strict";
var ePropietario = new Propietario('Rodrigo', '71047140W', 5);
var eArrendatario = new Arrendatario('Hugo', '10661223X', 5);
var aPersonas = [ePropietario, eArrendatario];
var ultimaAccion = null;
var sistema = new SistemaRegantes(aPersonas);
function darTitulo(opcion) {
    var titulo = "Menú";
    switch (opcion) {
        case 0:
            titulo = "Crear persona";
            break;
        case 1:
            titulo = "Eliminar persona";
            break;
        case 2:
            titulo = "Listado de personas";
            break;
        case 3:
            titulo = "Importe total";
            break;
    }
    return titulo;
}
function crearMain(opcion) {
    var header = document.getElementById('titulo');
    eliminarAnteriores(false);
    var main = document.createElement("main");
    main.id = "datos";
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(opcion);
    main.appendChild(h2);
    var div = document.createElement('div');
    var aBotones = [
        ["volver", "Volver a la página de inicio", "Volver"]
    ];
    var numeroPersonas = sistema.getnumPersonas();
    if (numeroPersonas > 0) {
        if (opcion === 2) {
            ultimaAccion = "Has mirado la lista de personas que componen el sistema";
            var aTextoPersonas = sistema.getListaPersonas();
            aTextoPersonas.forEach(function (textoPersona) {
                crearParrafo(textoPersona, div, null, null);
            });
        }
        else {
            ultimaAccion = "Has mirado el importe total acumulado del sistema";
            crearParrafo("Importe total acumulado en el sistema: ", div, 'tImportes', sistema.importeTotal());
        }
    }
    else {
        crearParrafo("¡No hay personas en el sistema!", div, null, null);
    }
    añadirBotones(aBotones, div);
    main.appendChild(div);
    if (header.parentNode) {
        header.parentNode.insertBefore(main, header.nextSibling);
    }
}
function ejecutarFuncion() {
    var opcion = parseInt(this.id);
    if (opcion < 2) {
        crearFormulario(opcion);
    }
    else {
        crearMain(opcion);
    }
}
function añadirBotones(datosBotones, destino) {
    var boton;
    var funcion;
    for (var i = 0; i < datosBotones.length; i++) {
        boton = document.createElement('button');
        boton.id = i.toString();
        boton.className = datosBotones[i][0];
        boton.title = datosBotones[i][1];
        boton.textContent = datosBotones[i][2];
        destino.appendChild(boton);
        funcion = ejecutarFuncion;
        if (boton.className === "volver") {
            boton.type = "button";
            funcion = cargarMenu;
        }
        if (boton.className === "aceptar") {
            boton.type = "submit";
            boton.disabled = true;
            funcion = enviarFormulario;
        }
        boton.addEventListener('click', funcion, false);
    }
}
function eliminarAnteriores(yForm) {
    var body = document.getElementById('app');
    var mainCreado = document.getElementById('datos');
    if (mainCreado && body) {
        body.removeChild(mainCreado);
    }
    if (yForm) {
        var formCreado = document.getElementById('formulario');
        if (formCreado && body) {
            body.removeChild(formCreado);
        }
    }
}
function cargarMenu() {
    var header = document.getElementById('titulo');
    eliminarAnteriores(true);
    var main = document.createElement("main");
    main.id = "datos";
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(-1);
    main.appendChild(h2);
    if (ultimaAccion !== null) {
        var h3 = document.createElement('h3');
        h3.textContent = "Última acción: " + ultimaAccion;
        h3.style.color = "rgb(99, 238, 71)";
        main.appendChild(h3);
    }
    var div = document.createElement('div');
    var aBotones = [
        ["opciones", "Formulario para insertar una persona en el sistema", "Crear una persona"],
        ["opciones", "Formulario para eliminar una persona del sistema", "Eliminar una persona"],
        ["opciones", "Formulario para eliminar una persona del sistema", "Listado de personas"],
        ["opciones", "Importe total acumulado de todas las personas del sistema", "Ver el importe total"]
    ];
    añadirBotones(aBotones, div);
    main.appendChild(div);
    if (header.parentNode) {
        header.parentNode.insertBefore(main, header.nextSibling);
    }
}
window.onload = cargarMenu;
