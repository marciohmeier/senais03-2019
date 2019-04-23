import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { KernelUtils } from '../kernel/kernel-utils';
import { MySQLFactory } from '../mysql/mysql_factory';
import { VPUtils } from '../utils/vputils';

export class BairrosAction extends Action {

    private generateSQL(idCidade:number) : string {
        return 'select name,taxa from bairros'
                + ' where idCidade = ' + idCidade;
    }

    @Get('/bairros/:idCidade')
    public getBairros(){

        let idCidade = this.req.params.idCidade;
        
        new KernelUtils().createExceptionApiError('1002', 'Cidade não informada', (idCidade == null || idCidade == undefined));

        new MySQLFactory().getConnection().select(this.generateSQL(idCidade)).subscribe(
            (data : any) => {
                if (!data.length || data.length < 1){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Cidade sem bairros'));
                  return;
                }

                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}