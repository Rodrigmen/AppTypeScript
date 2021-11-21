class Propietario extends Persona {
    constructor(nombre: string, dni: string, n_parcelas: number) {
        super(nombre, dni, n_parcelas, 50);
    }

    public getTotalImporte(): number {
        return (this.getImporte() * this.getN_Parcelas());
    }
    
    public toString(): string {
        return super.toString() + ' y gasta al año como propietario: ' + this.getTotalImporte()+ " €";
    }
}