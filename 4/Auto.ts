// Auto (Clase Base)

import { Motor } from "./interfaces";
import MotorDeCombustion from "./MotorDeCombustion";
import MotorElectrico from "./MotorElectrico";
import { TipoCombustible } from "./partes";

// Propiedades: motor, chasis, ruedas, precio, patente, fechaAlta, fechaVenta
// Métodos: encender(), apagar(), conducir()
// Getters/Setters: getFechaAlta, getFechaVenta, setFechaVenta
// Validación: Verifica compatibilidad entre tipo de motor y tipo de combustible

// Una entidad es un protagonista dentro del sistema
export class Auto {
  // Atributos / Propiedades -> Caracteristicas especificas, variables internas , pueden poseer valores por defecto

  // TODO: Para la clase que viene vamos a cambiar los tipos de motor, chasis, marca y modelo por los correspondientes
  private motor: Motor;
  private chasis: string;
  private rueda: string;
  private precio: number;
  private patente: string;
  // Timestamps -> guardar fechas de eventos
  // new Date() se ejecuta cuando se cree la instancia de la clase Auto
  private fechaAlta: Date = new Date();
  // Es null porque aún no se vendió, se acaba de crear y poner a la venta
  private fechaVenta: Date | null = null;
  private marca: string;
  private modelo: string;

  // Constructor ->
  constructor(
    motor: Motor,
    chasis: string,
    rueda: string,
    precio: number,
    patente: string,
    marca: string,
    modelo: string,
  ) {
    
    // El motor de combustion no puede ser electrico
    if(motor instanceof MotorDeCombustion && motor.tipoCombustible === TipoCombustible.ELECTRICO){
        throw new Error("Un motor de combustion no puede usar electricidad como combustible")
    }

    // El motor electrico no puede usar nafta ni diesel
    if(motor instanceof MotorElectrico && motor.tipoCombustible !== TipoCombustible.ELECTRICO){
        throw new Error("Un motor de combustion no puede usar electricidad como combustible")
    }

    this.motor = motor;
    this.chasis = chasis;
    this.rueda = rueda;
    this.precio = precio;
    this.patente = patente;
    this.marca = marca;
    this.modelo = modelo;
  }

  // Metodos ->
// Métodos: encender(), apagar(), conducir()

  public encender(): string | null{
    return this.motor.arrancar()
  }

  public apagar(): string | null{
    return this.motor.apagar()
  }

// Valores Falsy (se comportan como falso)false: El booleano falso.0, -0 y 0n: El número cero en sus formas numérica o de tipo BigInt."": Una cadena de texto vacía.null y undefined: Ausencia de valor o valor no definido.NaN: Significa que no es un número (Not a Number).
// 
// 
// Valores Truthy (se comportan como verdadero)Cualquier número que no sea cero (ejemplo: 1, -5, 3.14).Cualquier texto que tenga al menos un caracter (ejemplo: "hola", "false" o "0").Objetos y arreglos vacíos o con datos ({} o []).El booleano true.

  public conducir(): string {
    // Dentro del if una condicion booleana solo requiere su presencia para que funcione
    // Con booleanos te ahorras descubrir el tipo y el valor
    // typeof this.motor.estaEncendido === "boolean" && this.motor.estaEncendido === true
    if(this.motor.estaEncendido){
        return "Auto en movimiento"
    } else {
        return "Debes encender el auto para poder conducirlo"
    }
  }
  // Getters/Setters: getFechaAlta, getFechaVenta, setFechaVenta


    public getFechaAlta(){
        return this.fechaAlta
        }

    public getFechaVenta(){
        return this.fechaVenta
    }

    // Cuando se venda el auto nos mandan la fecha
    setFechaVenta(fecha: Date){
        this.fechaVenta = fecha
    }

}

// En base de datos como booleano -> 1 / 0
