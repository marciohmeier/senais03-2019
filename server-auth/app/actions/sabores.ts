import { Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { KernelUtils } from '../kernel/kernel-utils';
import { MySQLFactory } from '../mysql/mysql_factory';

import { TamanhosAction } from './tamanhos'
import Post from '../decorators/post';

export class SaboresAction extends Action {

    private generateSQL(idTamanho:number) : string {
        return 'select sabores.sabor,sabores_has_tamanhos.preco from sabores_has_tamanhos'
        + ' LEFT JOIN sabores ON sabores.idSabor = sabores_has_tamanhos.idSabor'
        + ' where sabores_has_tamanhos.idTamanho = ' + idTamanho;
    }

    @Get('/sabores-tamanho/:idTamanho')
    public Get(){
        let idTamanho = this.req.params.idTamanho;

        new KernelUtils().createExceptionApiError('1002', 'Tamanho da pizza não informado', (idTamanho == null || idTamanho == undefined));
        new KernelUtils().createExceptionApiError('1003', 'Tamanho da pizza inválido', this.validateTamanho(idTamanho));


        new MySQLFactory().getConnection().select(this.generateSQL(idTamanho)).subscribe(
            (data : any) => {
                if (!data.length || data.length < 1){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Pizzas sem sabores para o tamanho ' + idTamanho));
                  return;
                }

                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );

    }

    public validateTamanho(idTamanho:number){

        let isValid = false;

        TamanhosAction.selectTamanhos(idTamanho).subscribe(
            (data : any) => {
                if (data.length === 1){
                    isValid = true;
                }
            }
        );

        return isValid
    }

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }

    private generateSQLSabores() {
        return `SELECT sabor.idSabor,sabor.sabor As descricaoSabor,sabores_has_tamanhos.preco,tamanho.idTamanho,tamanho.descricao As descricaoTamanho FROM sabores sabor
        inner join tamanhos tamanho on tamanho.idTamanho in (select idTamanho from tamanhos)
        left join sabores_has_tamanhos on sabores_has_tamanhos.idSabor = sabor.idSabor and sabores_has_tamanhos.idTamanho = tamanho.idTamanho`
    }

    private generateSQLSaboresByName(name : string | null) {
        let select = this.generateSQLSabores()

        if (typeof name == "string") select = select + ` where sabor.sabor = \"` + name + "\""

        return select
    }

    @Get('/sabores')
    public GetSabores(){

        let name = this.req.query.name;

        new MySQLFactory().getConnection().select(this.generateSQLSaboresByName(name)).subscribe(
            (data : any) => {
                if (!data.length || data.length < 1){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Pizzas sem sabores'));
                  return;
                }
                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );

    }

    private generateSQLSaboresByID(idSabor:number) {
        return this.generateSQLSabores() + ` where sabor.idSabor = ` + idSabor
    }

    @Get('/sabores/:idSabor')
    public GetSaboresByID(){

        let idSabor = this.req.params.idSabor;

        new KernelUtils().createExceptionApiError('1002', 'Tamanho da pizza não informado', (idSabor == null || idSabor == undefined));

        new MySQLFactory().getConnection().select(this.generateSQLSaboresByID(idSabor)).subscribe(
            (data : any) => {
                if (!data.length || data.length < 1){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Sabor ' + idSabor + ' não cadastrado'));
                  return;
                }
                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );

    }

    private generateSQLCreateSabor() {
        return `insert into sabores (sabor) values (\"` + this.req.body.sabor + `"\)`
    }

    @Post('/sabores')
    public PostSabores(){

        console.log(this.req.body)

        new KernelUtils().createExceptionApiError('1002', 'Nome do sabor inválido', (this.req.body.sabor == null || this.req.body.sabor == undefined));

        new MySQLFactory().getConnection().select(this.generateSQLCreateSabor()).subscribe(
            (data : any) => {
                this.sendAnswer({'isValid':true, 'saborId':data.insertId});
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }
}