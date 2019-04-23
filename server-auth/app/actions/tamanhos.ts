import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { MySQLFactory } from '../mysql/mysql_factory';
import { KernelUtils } from '../kernel/kernel-utils';

export class TamanhosAction extends Action {

    private static generateSQL(idTamanho:number) : string {
        if (typeof idTamanho === "number"){
            return 'select idTamanho,descricao from tamanhos where idTamanho = ' + idTamanho;
        } else {
            return 'select idTamanho,descricao from tamanhos';
        }
    }

    public static selectTamanhos(idTamanho:number) {
        return new MySQLFactory().getConnection().select(TamanhosAction.generateSQL(idTamanho))
    }

    @Get('/tamanhos')
    public getTamanhos(){
        TamanhosAction.selectTamanhos(<any>null).subscribe(
            (data : any) => {
                if (!data.length){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Não há tamanhos'));
                  return;
                }

                this.sendAnswer(data);
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }
    @Get('/tamanhos/:idTamanho')
    public getTamanho(){

        let idTamanho = this.req.params.idTamanho;

        TamanhosAction.selectTamanhos(idTamanho).subscribe(
            (data : any) => {
                if (!data.length || data.length != 1){
                  this.sendError(new KernelUtils().createErrorApiObject(401, '1001', 'Tamanho não encontrado'));
                  return;
                }

                this.sendAnswer(data[0]);
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