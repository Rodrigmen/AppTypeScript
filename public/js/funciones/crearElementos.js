"use strict";
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
