"use strict";
/**
 * Genera un input con id lo inserta en la división pasada por el parámetro 'formulario'.
 *
 * Dependiendo del tipo del input se le aplican diferentes eventos o/y características.
 *
 * @param titulo Título del input (title)
 * @param id Identificador del input (id)
 * @param tipo Tipo del input (type)
 * @param formulario División de contenido (div)
 */
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
/**
 * Genera un párrafo con id que mostrará un error y lo inserta en la división pasada por el parámetro 'formulario'.
 *
 * @param id Identificador del parráfo (id)
 * @param formulario División de contenido (div)
 */
function crearParrafoError(id, formulario) {
    var p = document.createElement('p');
    p.className = "error";
    p.id = id;
    formulario.appendChild(p);
}
/**
 * Genera una etiqueta y la inserta en la división pasada por el parámetro 'formulario'.
 *
 * * El contenido de la etiqueta es el pasado a través del parámetro 'contenido'.
 *
 * @param referencia Id del elemento etiquetado (for)
 * @param contenido Texto de la etiqueta
 * @param formulario División de contenido (div)
 */
function crearEtiqueta(referencia, contenido, formulario) {
    var label = document.createElement('label');
    label.setAttribute("for", referencia);
    label.textContent = contenido;
    formulario.appendChild(label);
}
/**
 * Genera un párrafo y lo inserta en el elemento HTML pasado por el parámetro 'destino'.
 *
 * * El contenido del párrafo es el pasado a través del parámetro 'contenido'.
 * * En el caso de que se quiera insertar dentro del párrafo un 'span' se pasa su id y su valor a tráves de los
 * parámetros 'idspan' y 'valorSpan'. En caso contrario se pasa null en dichos parámetros.
 *
 * @param contenido Texto que se inserta en el parráfo
 * @param destino Elemento HTML en el que se inserta el parráfo
 * @param idspan Identificador del span que puede crearse
 * @param valorSpan Valor númerico del span que puede crearse
 */
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
/**
 * Genera la división llamada 'formulario' en el index.html y le inserta una serie de elementos HTML determinados
 * dependiendo del número pasado como parámetro (opcion).
 *
 * * Si la opcion es igual a 0, se generará el formulario necesario para la inserción de una persona.
 * * Si la opción es igual a 1, se generará el formulario necesario para la eliminación de una persona.
 *
 * @param opcion 0 o 1
 */
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
        crearParrafoError("enombre", form);
        crearEtiqueta("dni", "DNI *", form);
        form.appendChild(document.createElement("BR"));
        crearInput("DNI de la persona que se quiera introducir", "dni", "text", form);
        crearParrafoError("edni", form);
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
        crearParrafoError("edni", form);
    }
    añadirBotones(aBotones, form);
    if (header.parentNode) {
        header.parentNode.insertBefore(form, header.nextSibling);
    }
}
