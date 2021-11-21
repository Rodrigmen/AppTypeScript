"use strict";
function crearInput(titulo, id, tipo, formulario) {
    var input = document.createElement('input');
    input.title = titulo;
    input.id = id;
    if (id === "propietario") {
        input.checked = true;
    }
    input.type = tipo;
    formulario.appendChild(input);
}
function crearCampoError(id, formulario) {
    var p = document.createElement('p');
    p.className = "error";
    p.id = id;
    formulario.appendChild(p);
}
function crearEtiqueta(referencia, contenido, formulario) {
    var label = document.createElement('label');
    label.setAttribute("for", referencia);
    label.textContent = contenido;
    formulario.appendChild(label);
}
function crearParrafo(contenido, destino, idspan) {
    var p = document.createElement('p');
    p.textContent = contenido;
    if (idspan != null) {
        var span = document.createElement('span');
        span.id = idspan;
        p.appendChild(span);
    }
    destino.appendChild(p);
}
function crearFormulario(opcion) {
    var main = document.getElementById('app');
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(opcion);
    main.appendChild(h2);
    var form = document.createElement('form');
    form.method = "POST";
    var aBotones = [
        ["aceptar", "Enviar los datos al sistema", "Aceptar"],
        ["volver", "Volver a la página de inicio", "Volver"]
    ];
    if (opcion === 0) {
        crearEtiqueta("nombre", "Nombre *", form);
        crearInput("Nombre de la persona que se quiera introducir", "nombre", "text", form);
        crearCampoError("enombre", form);
        crearEtiqueta("dni", "DNI *", form);
        crearInput("DNI de la persona que se quiera introducir", "dni", "text", form);
        crearCampoError("edni", form);
        crearEtiqueta("parcelas", "Nº Parcelas *", form);
        crearInput("Número de parcelas que posee o tiene arrendada la persona", "parcelas", "number", form);
        crearCampoError("eparcelas", form);
        crearParrafo("Elige el tipo: ", form, null);
        crearEtiqueta("propietario", "Propietario", form);
        crearInput("", "propietario", "radio", form);
        crearEtiqueta("arrendatario", "Arrendatario", form);
        crearInput("", "arrendatario", "radio", form);
        crearParrafo("Importe: ", form, 'importe');
        crearParrafo("Importe total: ", form, 'total');
    }
    else {
        crearEtiqueta("dni", "DNI *", form);
        crearInput("DNI de la persona que se quiera eliminar", "dni", "text", form);
        crearCampoError("edni", form);
    }
    añadirBotones(aBotones, form);
    main.appendChild(form);
}
function soloMostrar(opcion) {
    var main = document.getElementById('app');
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(opcion);
    main.appendChild(h2);
    var div = document.createElement('div');
    var aBotones = [
        ["volver", "Volver a la página de inicio", "Volver"]
    ];
    if (opcion === 2) {
        //por cada persona un p
    }
    else {
        crearParrafo("Importe total aumulado en el sistema: ", div, 'tImportes');
    }
    añadirBotones(aBotones, div);
    main.appendChild(div);
}
function ejecutarFuncion() {
    var main = document.getElementById('app');
    main.innerHTML = "";
    var opcion = parseInt(this.id);
    if (opcion < 2) {
        crearFormulario(opcion);
    }
    else {
        soloMostrar(opcion);
    }
}
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
            funcion = cargarMenu;
        }
        boton.addEventListener('click', funcion, false);
    }
}
function cargarMenu() {
    var main = document.getElementById('app');
    main.innerHTML = "";
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(-1);
    main.appendChild(h2);
    var div = document.createElement('div');
    var aBotones = [
        ["opciones", "Formulario para insertar una persona en el sistema", "Crear una persona"],
        ["opciones", "Formulario para eliminar una persona del sistema", "Eliminar una persona"],
        ["opciones", "Formulario para eliminar una persona del sistema", "Listado de personas"],
        ["opciones", "Importe total acumulado de todas las personas del sistema", "Ver el importe total"]
    ];
    añadirBotones(aBotones, div);
    main.appendChild(div);
}
window.onload = cargarMenu;
