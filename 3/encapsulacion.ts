// Con encapsulacion definis el acceso que queres a tus atributos o metodos en la clase
// Si no hay problema que sea accedido, leido o modificado el valor dejalo en publico al atributo
// Si el metodo puede ser utilizado por cualquiera dejalo en publico
// Si el atributo no querés que sea ni accedido ni modificado manualmente, entonces debe ser privated
// Si el atributo vos queres que sea accedido solo desde la clase padre ponelo en privated
// Si queres que el atributo sea accedido desde la clase padre y desde las subclases entonces dejalo en protected
// Todo tiene que ver con: Acceso (lectura), y modifacion (reescribir el valor)

class Planeta {
    public nombre: string;
    private _masaKg: number;
    // si le pones _ indicas que es privada
    // # realmente privado
    protected radioKm: number;

    constructor(nombre: string, _masaKg: number, radioKm: number){
        this.nombre = nombre;
        this._masaKg = _masaKg;
        this.radioKm = radioKm;
    }

    // Get -> Obtener
    public getMasaKg() : number{
        return this._masaKg
    }

    // Set -> Configurar un valor
    public setMasaKg(nuevaMasa: number): number{
        if(nuevaMasa <=0){
            throw new Error("La masa debe ser mayor a 0")
        } else {
            // Esto es que sea accesible desde dentro de clase
            this._masaKg = nuevaMasa
            return this._masaKg
        }
    }

}

let saturno = new Planeta("saturno", 5.6846E26, 58.232)
console.log(saturno.nombre)
console.log(saturno.getMasaKg())
console.log(saturno.setMasaKg(5.6846E28))
console.log("este es saturno:", saturno)

// Subclase
class PlanetaGaseoso extends Planeta{
    public mostrarDatos(){
        console.log("nombre: ", this.nombre)
        console.log("radioKm: ", this.radioKm)
        console.log("_masaKg: ", this._masaKg)
        
        this._masaKg = 5000;
    }
}

let nebulosaPlaneta = new PlanetaGaseoso("planeta gaseoso", 5.6846E26, 58.232)

nebulosaPlaneta.mostrarDatos()