import { Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { KernelUtils } from '../kernel/kernel-utils';
import { MySQLFactory } from '../mysql/mysql_factory';

import { TamanhosAction } from './tamanhos'

export class SaboresAction extends Action {

    private generateSQL(idTamanho:number) : string {
        return 'select sabores.sabor,sabores_has_tamanhos.preco from sabores_has_tamanhos'
        + ' LEFT JOIN sabores ON sabores.idSabor = sabores_has_tamanhos.idSabor'
        + ' where sabores_has_tamanhos.idTamanho = ' + idTamanho;
    }

    @Get('/sabores/:idTamanho')
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
}