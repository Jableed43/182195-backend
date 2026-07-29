// Polimorfismo de interface
// En react -> interfaces son usadas para tipado de las props

interface Vehiculo {
    conducir(): void;
}

class Automovil implements Vehiculo{
    conducir(): void{
        console.log("Conduce por la carretera")
    }
}

class Avion implements Vehiculo{
    conducir(): void {
        console.log("Conduce por aire")
    }
}

// Polimorfismo de clases

class Animal{
    hacerSonido(): string{
        return "Hace un sonido"
    }
}

// Override -> modifica la implementacion heredada
class Perro extends Animal{
    // No tiene problema con cambiar la implementacion del bloque de codigo
    // El problema es con añadir parametros o cambiar el tipo del retorno
    hacerSonido(): string { 
        return "Guau guau"
    }
}

class Gato extends Animal{
    nombre : string = "Bola de nieve";
}

let firu = new Perro()
console.log(firu.hacerSonido())

let gatito = new Gato()
console.log(gatito.nombre)
console.log(gatito.hacerSonido())
