/**
 * Es el sistema en el que se van a guardar las personas.
 * 
 * @author Rodrigo Robles
 * @version 1.0
 */
class SistemaRegantes {

    private listaPersonas: Array<Persona>;
    private nombre: string;

    /**
     * Crea una instancia de 'SistemaRegantes'.
     * 
     * @param listaPersonas Array de personas
     */
    constructor(listaPersonas: Array<Persona>) {
        this.listaPersonas = listaPersonas;
        this.nombre = "Sistema de Regantes"; //el nombre se le atribuye directamente
    }

    /**
     * Devuelve el número de personas que existen en el sistema.
     * 
     * @returns  número de personas
     */
    public getnumPersonas(): number {
        return this.listaPersonas.length;
    }

    /**
     * Devuelve todos los objetos 'Persona' que existen en el sistema de manera conjunta.
     * 
     * @returns Array de objetos 'Persona' 
     */
    public getListaObjetosPersona(): Array<Persona> {
        return this.listaPersonas;
    }

    /**
     * Devuelve un conjunto de cadenas de texto. Cada una de estas cadenas contiene la información de una persona. 
     * 
     * @returns Array de cadenas de texto
     */
    public getListaPersonas(): Array<string> {
        var aTextoPersonas: Array<string> = [];
        for (let i = 0; i < this.listaPersonas.length; i++) {
            aTextoPersonas[i] = this.listaPersonas[i].toString();
        }
        return aTextoPersonas;
    }

    /**
     * Devuelve un objeto 'Peresona'.
     * 
     * @param dni Dni del objeto 'Persona' que se quiera devolver
     * @returns Persona  
     */
    public getPersona(dni: string): Persona | null {
        var personaResultante: Persona | null = null;
        this.listaPersonas.forEach(persona => {
            if (persona.getDni() === dni) {
                personaResultante = persona;
            }
        });
        return personaResultante;
    }

    /**
     * Inserta una persona en el sistema.
     * 
     * @param persona Objeto 'Persona' que se quiere insertar 
     * @returns true si la persona se inserta
     */
    public incluirPersona(persona: Persona): boolean {
        var incluido: boolean = false;
        if (this.getPersona(persona.getDni()) === null) {
            if (this.listaPersonas.push(persona)) {
                incluido = true;
            }
        }
        return incluido;
    }

    /**
     * Elimina a una persona del sistema.
     * 
     * @param dni Dni de la persona que se quiere eliminar
     * @returns true si se elimina
     */
    public eliminarPersona(dni: string): boolean {
        var eliminado: boolean = false;
        if (this.getPersona(dni) != null) {
            var posicion: number = 0;
            for (let i = 0; i < this.listaPersonas.length; i++) {
                if (this.listaPersonas[i] === this.getPersona(dni)) {
                    posicion = i;
                }
            }
            if (this.listaPersonas.splice(posicion, 1)) {
                eliminado = true;
            }
        }
        return eliminado;
    }

    /**
     * Devuelve la acumulación de todos los importes de todas las personas del sistema.
     * 
     * @returns importe total
     */
    public importeTotal(): number {
        var acumulador: number = 0;
        for (let i = 0; i < this.listaPersonas.length; i++) {
            acumulador += this.listaPersonas[i].getImportePersonal();
        }
        return acumulador;
    }
}