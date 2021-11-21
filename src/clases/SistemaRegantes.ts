class SistemaRegantes {
    private listaPersonas: Array<Persona>;
    private nombre: string;
    constructor(listaPersonas: Array<Persona>) {
        this.listaPersonas = listaPersonas;
        this.nombre = "Sistema de Regantes";
    }

    public getnumPersonas(): number {
        return this.listaPersonas.length;
    }

    public getListaPersonas(): Array<string> {
        var aTextoPersonas: Array<string> = [];
        for (let i = 0; i < this.listaPersonas.length; i++) {
            aTextoPersonas[i] = this.listaPersonas[i].toString();
        }
        return aTextoPersonas;
    }
    public getPersona(dni: string): Persona | null {
        var personaResultante: Persona | null = null;
        this.listaPersonas.forEach(persona => {
            if (persona.getDni() === dni) {
                personaResultante = persona;
            }
        });
        return personaResultante;
    }

    public incluirPersona(persona: Persona): boolean {
        var incluido: boolean = false;
        if (this.getPersona(persona.getDni()) != null) {
            if (this.listaPersonas.push(persona)) {
                incluido = true;
            }
        }
        return incluido;
    }

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
    public importeTotal(): number {
        var acumulador: number = 0;
        for (let i = 0; i < this.listaPersonas.length; i++) {
            acumulador += this.listaPersonas[i].getTotalImporte();
        }
        return acumulador;
    }
}