// Interface -> contrato
// Clase -> molde y la fabrica
// Puede contener la implementacion de los metodos 

// Representar planeta
class Planeta{
    // Atributos/ Propiedades -> caracteristicas
    nombre: string;
    masaKg: number;
    radioKm: number;
    tieneAtmosfera: boolean;
    tipo: string;
    distanciaEstrella: number;

    // Constructor -> funciona como maquina de ensamble
    // toma los elementos que necesita y arma la instancia de la clase
    // los parametros del constructor son los que usan en new Planeta()
    constructor(nombre: string, masaKg: number, radioKm: number, tieneAtmosfera: boolean, tipo: string, distanciaEstrella: number){
        this.nombre = nombre;
        this.masaKg = masaKg;
        this.radioKm = radioKm;
        this.tieneAtmosfera = tieneAtmosfera;
        this.tipo = tipo;
        this.distanciaEstrella = distanciaEstrella;
    }

    // Metodos
}

let saturno = new Planeta("saturno", 200, 5.68E26, true, "planeta", 8000000)
let pluton = new Planeta("pluton", 200, 5.68E26, true, "planeta", 8000000)