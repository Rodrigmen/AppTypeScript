var ePropietario: Propietario = new Propietario('Rodrigo', '71047140W', 5);
var eArrendatario: Arrendatario = new Arrendatario('Hugo', '10661223X', 5);
var aPersonas: Array<Persona> = [ePropietario, eArrendatario];
var ultimaAccion: string | null = null;
const sistema: SistemaRegantes = new SistemaRegantes(aPersonas);
function crearInput(titulo: string, id: string, tipo: string, formulario: HTMLDivElement) {
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
function crearCampoError(id: string, formulario: HTMLDivElement) {
    var p = document.createElement('p');
    p.className = "error";
    p.id = id;
    formulario.appendChild(p);
}
function crearEtiqueta(referencia: string, contenido: string, formulario: HTMLDivElement) {
    var label = document.createElement('label');
    label.setAttribute("for", referencia);
    label.textContent = contenido;
    formulario.appendChild(label);
}
function crearParrafo(contenido: string, destino: HTMLElement, idspan: string | null, valorSpan: number | null) {
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
function comprobarTexto(this: HTMLElement) {
    var error = "";
    var hayError = false;
    var pError;
    var bEnviar = document.getElementById("0") as HTMLButtonElement;
    (<HTMLInputElement>this).value = (<HTMLInputElement>this).value.trim();

    if (this.id === "dni") {
        pError = document.getElementById("edni");
        var reg = /^\d{8}[A-Z]$/;
        if (reg.test((<HTMLInputElement>this).value)) {
            var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
            var letraInsertada = (<HTMLInputElement>this).value.charAt(8);
            var numeros = (<HTMLInputElement>this).value.substring(0, 8);
            var posicion = parseInt(numeros) % 23;
            var letraObtenida = letras.charAt(posicion);
            if (letraInsertada != letraObtenida) {
                error = "¡Error en el formato!";
                hayError = true;
            }
        } else {
            error = "¡Error en el formato!";
            hayError = true;
        }
    } else {
        pError = document.getElementById("enombre");
        if ((<HTMLInputElement>this).value.length === 0) {
            error = "¡No se ha introducido nada!";
            hayError = true;
        }
        if ((<HTMLInputElement>this).value.length > 15) {
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
    } else {
        if (bEnviar) {
            bEnviar.disabled = false;
        }
        this.style.borderColor = "";
        if (pError) {
            pError.innerHTML = "";
        }
    }
}
function insertarPersona(dni: string, nombre: string, tipo: string, n_parcelas: number) {
    var Persona: Persona | null = null;
    if (tipo === "propietario") {
        Persona = new Propietario(nombre, dni, n_parcelas);
    } else {
        Persona = new Arrendatario(nombre, dni, n_parcelas);
    }

    if (sistema.incluirPersona(Persona)) {
        ultimaAccion = "Has insertado una persona"
        cargarMenu();
    } else {
        ultimaAccion = "Has intentado insertar una persona sin mucho éxito"
        var pError = document.getElementById('edni');
        if (pError) {
            pError.style.color = "red";
            pError.innerHTML = "Ya existe una persona con ese dni...";
        }
    }
}
function eliminarPersona(dni: string) {
    if (sistema.eliminarPersona(dni)) {
        ultimaAccion = "Has eliminado a una persona"
        cargarMenu();
    } else {
        ultimaAccion = "Has intentado eliminar una persona sin mucho éxito"
        var pError = document.getElementById('edni');
        if (pError) {
            pError.style.color = "red";
            pError.innerHTML = "Persona inexistente...";
        }
    }
}
function crearFormulario(opcion: number) {
    var header = document.getElementById('titulo') as HTMLElement;
    eliminarAnteriores(false);
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(opcion);
    var form = document.createElement('div');
    form.id = 'formulario';
    form.appendChild(h2);
    var aBotones: Array<Array<string>> = [
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

        crearParrafo("Elige el tipo: ", form, null, null);
        crearEtiqueta("propietario", "Propietario", form);
        crearInput(" ", "propietario", "radio", form);
        crearEtiqueta("arrendatario", "Arrendatario", form);
        crearInput(" ", "arrendatario", "radio", form);

        crearParrafo("Importe por parcela: ", form, 'importe', 50);
        crearParrafo("Importe total: ", form, 'total', 50);
    } else {
        crearEtiqueta("dni", "DNI *", form);
        crearInput("DNI de la persona que se quiera eliminar", "dni", "text", form);
        crearCampoError("edni", form);
    }
    añadirBotones(aBotones, form);
    if (header.parentNode) {
        header.parentNode.insertBefore(form, header.nextSibling);
    }
}
function soloMostrar(opcion: number) {
    var header = document.getElementById('titulo') as HTMLElement;
    eliminarAnteriores(false);
    var main = document.createElement("main");
    main.id = "datos";
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(opcion);
    main.appendChild(h2);
    var div = document.createElement('div');
    var aBotones: Array<Array<string>> = [
        ["volver", "Volver a la página de inicio", "Volver"]
    ];
    var numeroPersonas: number = sistema.getnumPersonas();
    if (numeroPersonas > 0) {
        if (opcion === 2) {
            ultimaAccion = "Has mirado la lista de personas que componen el sistema"
            var aTextoPersonas: Array<string> = sistema.getListaPersonas();
            aTextoPersonas.forEach(textoPersona => {
                crearParrafo(textoPersona, div, null, null);
            });
        } else {
            ultimaAccion = "Has mirado el importe total acumulado del sistema"
            crearParrafo("Importe total acumulado en el sistema: ", div, 'tImportes', sistema.importeTotal());
        }
    } else {
        crearParrafo("¡No hay personas en el sistema!", div, null, null);
    }

    añadirBotones(aBotones, div);
    main.appendChild(div);
    if (header.parentNode) {
        header.parentNode.insertBefore(main, header.nextSibling);
    }
}
function ejecutarFuncion(this: HTMLElement) {
    var opcion = parseInt(this.id);
    if (opcion < 2) {
        crearFormulario(opcion);
    } else {
        soloMostrar(opcion);
    }
}
function darTitulo(opcion: number) {
    var titulo: string = "Menú";
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
    var dni = (<HTMLInputElement>document.getElementById("dni")).value;
    var iNombre = document.getElementById("nombre");
    if (iNombre) {
        var nombre = (<HTMLInputElement>iNombre).value;
        var n_parcelas = parseInt((<HTMLInputElement>document.getElementById("parcelas")).value);
        var gTipos = document.getElementsByName("tipos");
        var tipo: string = "";
        gTipos.forEach(radio => {
            if ((<HTMLInputElement>radio).checked) {
                tipo = radio.id;
            }
        });
        insertarPersona(dni, nombre, tipo, n_parcelas);
    } else {
        eliminarPersona(dni);
    }

}
function añadirBotones(datosBotones: Array<Array<string>>, destino: HTMLElement) {
    var boton: HTMLButtonElement;
    var funcion;
    for (let i = 0; i < datosBotones.length; i++) {
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
function eliminarAnteriores(yForm: boolean) {
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
    var header = document.getElementById('titulo') as HTMLElement;
    eliminarAnteriores(true);
    var main = document.createElement("main");
    main.id = "datos";
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(-1);
    main.appendChild(h2);
    if (ultimaAccion !== null) {
        var h3 = document.createElement('h3');
        h3.textContent = "Última acción: " + ultimaAccion;
        h3.style.color = "green";
        main.appendChild(h3);
    }
    var div = document.createElement('div');
    var aBotones: Array<Array<string>> = [
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
function actualizarTotal(this: HTMLElement) {
    var spanTotal = document.getElementById('total');
    var spanImporte = document.getElementById('importe');
    var gTipo = document.getElementsByName('tipos');
    var numParcelas = parseInt((<HTMLInputElement>document.getElementById('parcelas')).value);
    var importe = 0;
    var resultado: number;
    gTipo.forEach(radio => {
        if ((<HTMLInputElement>radio).checked) {
            if (radio.id === "arrendatario") {
                importe = 25;
            } else {
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