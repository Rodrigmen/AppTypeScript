"use strict";
// Clases creadas para realizar una inserción inicial al sistema
var ePropietario = new Propietario('Rodrigo', '71047140W', 5);
var eArrendatario = new Arrendatario('Hugo', '10661223X', 5);
var aPersonas = [ePropietario, eArrendatario];
/**
 * Es el la variable en la que se guardará la última acción realizada por el usario en la aplicación.
 */
var ultimaAccion = null;
/**
 * Es el la constante en la que se guarda la clase SistemaRegantes, en la cuál se guarda toda la información
 * de la aplicación.
 */
var sistema = new SistemaRegantes(aPersonas);
/**
 * Regresa el título para la vista de la aplicación dependiendo de el número pasado como parámetro ('opcion').
 *
 * @param opcion De 0 a 3
 * @returns título
 */
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
/**
 * Genera un 'main' con una información y elementos HTML determinados dependiendo del número pasado
 * como parámetro ('opcion').
 *
 * * Si la 'opcion' es igual a 2 se mostrará la lista de personas guardadas en el sistema.
 * * Si es igual a 3 mostrará el importe total en el sistema.
 * * Si no hay personas en el sistema, mostrará un mensaje de error.
 *
 * @param opcion 2 o 3
 */
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
/**
 * Ejecuta una función que genera la sección principal del cuerpo de la vista de la aplicación web ('main'),
 * o la la división llamada 'formulario' dependiendo del id del botón pinchado.
 *
 * Si se pincha uno de los dos primeros botones, se generará una división llamada 'formulario', y se si pincha
 * uno de los dos últimos, se generará un 'main'.
 *
 * @param this Elemento HTML que ejecuta el evento/función
 */
function ejecutarFuncion() {
    var opcion = parseInt(this.id);
    if (opcion < 2) {
        crearFormulario(opcion);
    }
    else {
        crearMain(opcion);
    }
}
/**
 * Crea una serie de botones a través de los datos introducidos como parámetro 'datosBotones' y los inserta en
 * un elemento HTML, el cual, es indicado mediante el parámetro 'destino'.
 *
 * @param datosBotones Array de Arrays de cadenas de texto
 * @param destino Elemento HTML en el que se insertan los botones creados
 */
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
/**
 * Elimina la sección principal del cuerpo de la vista de la aplicación web ('main'),
 * y según el parámetro boolean introducido, la división llamada 'formulario' puede eliminarse o no.
 *
 * @param yForm true o false
 */
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
/**
 * Genera el menú de la aplicación (vista inicial).
 */
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
// Al cargar la página se ejecuta la función cargarMenu
window.onload = cargarMenu;
