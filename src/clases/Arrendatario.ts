class Arrendatario extends Persona {
    constructor(nombre: string, dni: string, n_parcelas: number) {
        super(nombre, dni, n_parcelas, 25);
    }

    public getTotalImporte(): number {
        return (this.getImporte() * this.getN_Parcelas());
    }

    public toString(): string {
        return super.toString() + ' y gasta al año como arrendatario: ' + this.getTotalImporte() + " €";
    }
}