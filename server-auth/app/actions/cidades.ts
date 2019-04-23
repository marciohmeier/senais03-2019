import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { MySQLFactory } from '../mysql/mysql_factory';
import { KernelUtils } from '../kernel/kernel-utils';

export class CidadesAction extends Action {

    private generateSQL() : string {
        return 'select idCidade,name from cidades';
    }

    @Get('/cidades')
    public getCidades(){
        
        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (data : any) => {
                if (!data.length || data.length < 1){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Não há cidades'));
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