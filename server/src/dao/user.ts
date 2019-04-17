export class User {
  private users:any = [{'userName':'marcio', 'password':'1234'}]

  public validateUser(userValidate:any){
    let isValid = false;

    this.users.map((user:any) => {
      if (user.userName == userValidate.userName && user.password == userValidate.password){
        isValid = true
      }
    })
    return isValid
  }

  public createUser(user:any):any{
    if (!this.validateUniqueUser(user.userName)){
      return {'valid':false, 'message':'Usuário não é único'}
    }
    this.users.push(user)

    return {'valid':false, 'message':'usuário logado com sucesso'}
  }

  private validateUniqueUser(userName:string){
    let isUnique = true

    this.users.map((user:any) => {
      if (user.userName == userName){
        isUnique = false
      }
    })

    return isUnique
  }
}