// Abstraccion

// El plano
// Lo que está en la interface debe estar en la clase pero no todo lo que está en la clase debe estar en la inteface
interface Vehiculo {
    patente: string;
    conducir(): void;
}

// El resultado del plano (fabrica)
class Auto implements Vehiculo {

    patente: string;
    modelo: string;
    // Valor por defecto
    codigo: string = "1234"

    // El constructor define los valores internos que serán asignados a los atributos de la instancia de dicha clase
    constructor(patente: string, modelo: string){
        this.patente = patente;
        this.modelo = modelo;
    }

    conducir(): void {
        console.log("Conduce por la ruta 40")
    }

    cambiarCodigo(codigo: string): void{
        this.codigo = codigo
    }
}

// El producto de la fabrica
let gol = new Auto("eef999", "1994")
gol.conducir()

// Clases abstractas
// Tipos genericos