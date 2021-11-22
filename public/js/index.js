"use strict";
var ePropietario = new Propietario('Rodrigo', '71047140W', 5);
var eArrendatario = new Arrendatario('Hugo', '10661223X', 5);
var aPersonas = [ePropietario, eArrendatario];
var ultimaAccion = null;
var sistema = new SistemaRegantes(aPersonas);
function crearInput(titulo, id, tipo, formulario) {
    var input = document.createElement('input');
    input.title = titulo;
    input.id = id;
    if (id === "propietario") {
        input.checked = true;
    }
    input.type = tipo;
    switch (tipo) {
        case 'radio':
            input.name = "tipos";
            input.addEventListener('change', actualizarTotal, false);
            break;
        case 'number':
            input.min = "1";
            input.value = "1";
            input.addEventListener('change', actualizarTotal, false);
            break;
        case 'text':
            input.addEventListener('keyup', comprobarTexto, false);
            break;
    }
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
function crearParrafo(contenido, destino, idspan, valorSpan) {
    var p = document.createElement('p');
    p.textContent = contenido;
    if (idspan != null) {
        var span = document.createElement('span');
        span.id = idspan;
        span.innerHTML = valorSpan + "";
        var span2 = document.createElement('span');
        span2.textContent = "€";
        p.appendChild(span);
        p.appendChild(span2);
    }
    destino.appendChild(p);
}
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
function crearFormulario(opcion) {
    var header = document.getElementById('titulo');
    eliminarAnteriores(false);
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(opcion);
    var form = document.createElement('div');
    form.id = 'formulario';
    form.appendChild(h2);
    var aBotones = [
        ["aceptar", "Enviar los datos al sistema", "Aceptar"],
        ["volver", "Volver a la página de inicio", "Volver"]
    ];
    if (opcion === 0) {
        crearEtiqueta("nombre", "Nombre *", form);
        form.appendChild(document.createElement("BR"));
        crearInput("Nombre de la persona que se quiera introducir", "nombre", "text", form);
        crearCampoError("enombre", form);
        crearEtiqueta("dni", "DNI *", form);
        form.appendChild(document.createElement("BR"));
        crearInput("DNI de la persona que se quiera introducir", "dni", "text", form);
        crearCampoError("edni", form);
        crearEtiqueta("parcelas", "Nº Parcelas *", form);
        form.appendChild(document.createElement("BR"));
        crearInput("Número de parcelas que posee o tiene arrendada la persona", "parcelas", "number", form);
        crearParrafo("Elige el tipo: ", form, null, null);
        crearEtiqueta("propietario", "Propietario", form);
        crearInput(" ", "propietario", "radio", form);
        form.appendChild(document.createElement("BR"));
        crearEtiqueta("arrendatario", "Arrendatario", form);
        crearInput(" ", "arrendatario", "radio", form);
        crearParrafo("Importe por parcela: ", form, 'importe', 50);
        crearParrafo("Importe total: ", form, 'total', 50);
        console.log(form);
    }
    else {
        crearEtiqueta("dni", "DNI *", form);
        form.appendChild(document.createElement("BR"));
        crearInput("DNI de la persona que se quiera eliminar", "dni", "text", form);
        crearCampoError("edni", form);
    }
    añadirBotones(aBotones, form);
    if (header.parentNode) {
        header.parentNode.insertBefore(form, header.nextSibling);
    }
}
function soloMostrar(opcion) {
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
window.onload = cargarMenu;
