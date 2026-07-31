// Interfaces -> Contratos que definen metodos y propiedades
// No definen la implementacion
// Se deben usar en las clases que las implementan

import { TipoCombustible } from "./partes";

 
// Motor 
interface Motor{
    arrancar(): string | null;
    apagar(): string | null;
    estaEncendido: boolean;
    tipoCombustible: TipoCombustible;
}

export { Motor }