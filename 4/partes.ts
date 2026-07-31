// Enum -> Enumeracion
// Es una forma de definir un listado de valores constantes
// En lugar de usar un string que es propenso a error, utilizas enum
// Tener opciones limitadas y controladas

enum TipoCombustible {
  ELECTRICO = "Electrico",
  NAFTA = "Nafta",
  DIESEL = "Diesel",
  HIBRIDO = "Hibrido",
}

enum TipoRueda {
  DEPORTIVA = "Deportiva",
  TODO_TERRENO = "Todo terreno",
  CIUDAD = "Ciudad",
}

// PascalCase
enum MarcaRueda {
  MICHELIN = "Michelin",
  BRIDGESTONE = "Bridgestone",
  CONTINENTAL = "Continental",
  GOODYEAR = "Goodyear",
  PIRELLI = "Pirelli",
  DUNLOP = "Dunlop",
  HANKOOK = "Hankook",
  YOKOHAMA = "Yokohama",
  TOYO = "Toyo Tires",
  KUMHO = "Kumho Tire",
  FALKEN = "Falken",
  NOKIAN = "Nokian Tyres",
  COOPER = "Cooper Tires",
  BFGOODRICH = "BFGoodrich",
  FIRESTONE = "Firestone",
  GENERAL_TIRE = "General Tire",
  MAXXIS = "Maxxis",
  NEXEN = "Nexen",
  GT_RADIAL = "GT Radial",
  LINGLONG = "Linglong Tire",
}

enum Rodado {
  R13 = 13,
  R14 = 14,
  R15 = 15,
  R16 = 16,
  R17 = 17,
  R18 = 18,
  R19 = 19,
  R20 = 20,
  R21 = 21,
  R22 = 22,
}

class Chasis {
  private color: string;

  // Toma el color original de fabrica
  constructor(color: string) {
    this.color = color;
  }

  // Cuando se usan los metodos private? si desde afuera no se pueden ejecutar?
  private randomColor(color: string): string {
    return `El color ${color} está buenisimo`;
  }

  // La idea de setColor es cambiar el color respecto al original de fabrica
  public setColor(color: string): string {
    this.color = color;
    // lo podes ejecutar en un metodo publico
    // podes ejecutar un método privado, dentro de uno publico
    this.randomColor(color);
    return this.color;
  }

  public getColor(): string {
    return this.color;
  }
}

class Rueda {
  private rodado: Rodado;
  private tipo: TipoRueda;
  private marca: MarcaRueda;

  constructor(rodado: Rodado, tipo: TipoRueda, marca: MarcaRueda) {
    this.rodado = rodado;
    this.tipo = tipo;
    this.marca = marca
  }

  // Rodado
  getRodado(): Rodado {
    return this.rodado
  }

  setRodado(rodado: number): Rodado{
    return this.rodado = rodado
  }

  // Tipo de rueda
  getTipoRueda(): TipoRueda {
    return this.tipo
  }

  setTipoRueda(tipo: TipoRueda): TipoRueda{
    return this.tipo = tipo
  }

  // Marca
  getMarca(): MarcaRueda{
    return this.marca
  }

  setMarca(marca: MarcaRueda): MarcaRueda{
    return this.marca = marca
  } 

}

export { TipoCombustible, TipoRueda, Chasis, Rueda };
