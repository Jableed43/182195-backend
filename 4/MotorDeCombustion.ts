import { Motor } from "./interfaces";
import { TipoCombustible } from "./partes";

export default class MotorDeCombustion implements Motor{
   public estaEncendido: boolean = false;
   public tipoCombustible: TipoCombustible;
   public porcentajeCombustible: number = 100;

    constructor(tipoCombustible: TipoCombustible){
        this.tipoCombustible = tipoCombustible;
    }

    arrancar(): (string | null) {
        if ( this.estaEncendido === false && this.porcentajeCombustible > 0) {
                this.estaEncendido = true
                return "El motor de combustion se ha encendido"
        } else {
            return null
        }
    }

    apagar(): (string | null){
        if(this.estaEncendido === false){
            return null
        } else {
            this.estaEncendido = false 
            return "El motor de combustion se ha apagado"
        }
    }

}
