export class Localizacao {
  
  public static ObterCidades(){
    return [{"id":1,"name":"Jaraguá do Sul"},{"id":2,"name":"Corupá"},{"id":3,"name":"Guaramirim"}]
  }
  
  public static ObterBairros(id:number) {
    if (id==1) return [{"name":"Centro","value":1.5},{"name":"Agua Verde","value":2.35},{"name":"Chico de Paula","value":3.8},{"name":"Figueira","value":4}]
    if (id==2) return [{"name":"Seminário","value":6.8},{"name":"Ano bom","value":6.75},{"name":"Centro","value":6}]
    if (id==3) return [{"name":"Amizade","value":12},{"name":"Centro","value":8},{"name":"Avai","value":7},{"name":"Corticeira","value":7}]
    return []
  }
}