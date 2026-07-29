// Interface -> Es implementada y se detallan los pasos que debe seguir un metodo. Se puede usar en diferentes clases, con fines distintos.

// Clase -> Es extendida porque genera subclases hereda la implementacion


class CuerpoCeleste {
    public nombre: string;
    private codigo: string;

    constructor(nombre: string, codigo: string){
        this.nombre = nombre;
        this.codigo = codigo;
    }

    getCodigo(): string {
        return this.codigo
    }
}

// Clase hija
// con extends declaramos que hereda de otra clase
class Planetoide extends CuerpoCeleste{
    esHabitable: boolean;
    nLunas: number;

    constructor(nombre: string, codigo: string, esHabitable: boolean, nLunas: number){
        // super -> es el constructor de la clase CuerpoCeleste
        // superclase, se refiere a la clase padre
        // toma los datos del constructor para asignarlos a las variales internas heredadas
        super(nombre, codigo);
        this.esHabitable = esHabitable;
        this.nLunas = nLunas;
    }
}

let tierroide = new Planetoide("Tierroide", "T03", false, 2)
console.log(tierroide.getCodigo())