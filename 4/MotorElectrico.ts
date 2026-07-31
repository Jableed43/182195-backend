import {Motor} from "./interfaces"
import { TipoCombustible } from "./partes";

export default class MotorElectrico implements Motor{
   public estaEncendido: boolean = false;
   public tipoCombustible: TipoCombustible = TipoCombustible.ELECTRICO;
   public porcentajeBateria: number = 100;

   // No hace falta constructor -> Los valores ya los tenemos definidos por default

   arrancar(): (string | null) {
        if ( this.estaEncendido === false && this.porcentajeBateria > 0) {
                this.estaEncendido = true
                return "El motor electrico se ha encendido"
        } else {
            return null
        }
    }

    apagar(): (string | null){
        if(this.estaEncendido === false){
            return null
        } else {
            this.estaEncendido = false 
            return "El motor electrico se ha apagado"
        }
    }
}
