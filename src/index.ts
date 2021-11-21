var sistema: SistemaRegantes;
function crearInput(titulo: string, id: string, tipo: string, formulario: HTMLFormElement) {
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
            input.addEventListener('blur', comprobarTexto, false);
            break;
    }
    formulario.appendChild(input);
}
function crearCampoError(id: string, formulario: HTMLFormElement) {
    var p = document.createElement('p');
    p.className = "error";
    p.id = id;
    formulario.appendChild(p);
}
function crearEtiqueta(referencia: string, contenido: string, formulario: HTMLFormElement) {
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
        if ((<HTMLInputElement>this).value.length === 0) {
            pError = document.getElementById("enombre");
            error = "¡No se ha introducido nada!";
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
    console.log(error);
}
function crearFormulario(opcion: number) {
    var main = document.getElementById('app') as HTMLElement;
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(opcion);
    main.appendChild(h2);
    var form = document.createElement('form');
    //form.method = "POST";
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
    main.appendChild(form);
}
function soloMostrar(opcion: number) {
    var main = document.getElementById('app') as HTMLElement;
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(opcion);
    main.appendChild(h2);
    var div = document.createElement('div');
    var aBotones: Array<Array<string>> = [
        ["volver", "Volver a la página de inicio", "Volver"]
    ];
    var numeroPersonas: number = sistema.getnumPersonas();
    if (numeroPersonas > 1) {
        if (opcion === 2) {
            var aTextoPersonas: Array<string> = sistema.getListaPersonas();
            aTextoPersonas.forEach(textoPersona => {
                crearParrafo(textoPersona, div, null, null);
            });
        } else {
            crearParrafo("Importe total acumulado en el sistema: ", div, 'tImportes', sistema.importeTotal());
        }
    } else {
        crearParrafo("¡No hay personas en el sistema!", div, null, null);
    }

    añadirBotones(aBotones, div);
    main.appendChild(div);
}
function ejecutarFuncion(this: HTMLElement) {
    var main = document.getElementById('app') as HTMLElement;
    main.innerHTML = "";
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
            funcion = cargarMenu;
        }
        if (boton.className === "aceptar") {
            boton.disabled = true;
            funcion = enviarFormulario;
        }
        boton.addEventListener('click', funcion, false);
    }
}
function inicializarSistemaReg() {
    var ePropietario: Propietario = new Propietario('Rodrigo', '12345678A', 5);
    var eArrendatario: Arrendatario = new Arrendatario('Hugo', '12345678A', 5);
    var aPersonas: Array<Persona> = [];
    sistema = new SistemaRegantes(aPersonas);
}
function cargarMenu() {
    var main = document.getElementById('app') as HTMLElement;
    main.innerHTML = "";
    var h2 = document.createElement('h2');
    h2.textContent = darTitulo(-1);
    main.appendChild(h2);
    var div = document.createElement('div');
    var aBotones: Array<Array<string>> = [
        ["opciones", "Formulario para insertar una persona en el sistema", "Crear una persona"],
        ["opciones", "Formulario para eliminar una persona del sistema", "Eliminar una persona"],
        ["opciones", "Formulario para eliminar una persona del sistema", "Listado de personas"],
        ["opciones", "Importe total acumulado de todas las personas del sistema", "Ver el importe total"]
    ];
    añadirBotones(aBotones, div);
    main.appendChild(div);
    inicializarSistemaReg();
}
function actualizarTotal(this: HTMLElement) {
    var spanTotal = document.getElementById('total');
    var spanImporte = document.getElementById('importe');
    var importe = 50;
    var numParcelas = 1;
    var resultado = 0;
    if (this.id === "arrendatario") {
        importe = 25;
    }
    if (this.id === "propietario") {
        importe = 50;
    }
    if (spanImporte) {
        spanImporte.innerHTML = "";
        spanImporte.innerHTML = importe.toString();
    }

    if (this.id === "parcelas") {
        numParcelas = parseInt((<HTMLInputElement>this).value);
    }
    resultado = (importe * numParcelas);
    if (spanTotal) {
        spanTotal.innerHTML = "";
        spanTotal.innerHTML = resultado.toString();
    }
}
window.onload = cargarMenu;