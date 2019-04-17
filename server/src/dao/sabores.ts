export class Sabores {
  public static ObterSabores(idTamanho:number){
    if (idTamanho==1) return [{"sabor":"Calabresa","preco":12},{"sabor":"Quatro Queijos","preco":15},{"sabor":"Bacon","preco":13},{"sabor":"Chocolate","preco":14},{"sabor":"Brocolis","preco":16}]
    if (idTamanho==2) return [{"sabor":"Calabresa","preco":18},{"sabor":"Quatro Queijos","preco":21},{"sabor":"Bacon","preco":19},{"sabor":"Chocolate","preco":20},{"sabor":"Brocolis","preco":22}]
    if (idTamanho==3) return [{"sabor":"Calabresa","preco":25},{"sabor":"Quatro Queijos","preco":28},{"sabor":"Bacon","preco":26},{"sabor":"Chocolate","preco":27},{"sabor":"Brocolis","preco":29}]
    return []
  }
}