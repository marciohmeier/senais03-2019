import {Post} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import {VPUtils} from '../utils/vputils';
import {KernelUtils} from '../kernel/kernel-utils';
import {MySQL} from '../mysql/mysql';
import {MySQLFactory} from '../mysql/mysql_factory';

export class CreateAction extends Action{

    private validateData(){
        new KernelUtils().createExceptionApiError('1001', 'Usuário e senha inválidos', this.req.body.userName == '' || this.req.body.password == '');
    }

    private generateSQL() : string {
        return 'insert into users (userName,password)'
                + 'values(\'' + this.req.body.userName + '\',\'' + this.req.body.password + '\')'
    }

    @Post('/create')
    public async Post(){
        this.validateData();

        if (!await this.validateUniqueUser()) {
            this.sendError(new KernelUtils().createErrorApiObject(303, '1001', 'usuário já cadastado'));
            return;
        }

        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (data : any) => {
                this.sendAnswer({'isValid':true});
            },
            (error : any) => {
                this.sendError(error);
            }
        );
    }

    private async validateUniqueUser():Promise<boolean> {

        var isValid = false;

        await this.generateSelect().toPromise().then(
            (data : any) => {
                if (data.length === 0){
                    isValid = true
                }
            }
        )

        return isValid
    }
    private generateSelect() {
        let sql = 'select userName from users'
            + ' where userName = \'' + this.req.body.userName + '\''
        
        return new MySQLFactory().getConnection().select(sql)
    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}