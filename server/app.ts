import * as express from 'express';
import * as bodyparser from 'body-parser';

//o nome depois do import pode ser qualquer um, o from que importa
import database from './db';
import controller from './controller';

class App {
    //atributo da classe
    public app: express.Application;
    private database: database;
    private controller: controller;

    //metodo construtor
    constructor() {
        this.app = express();
        //o parser tem que ser logo apos o express
        this.middleware();
        this.database = new database();
        //chamando o metodo da classe db.ts ao executar a aplicacao
        this.database.createConnection();
        this.controller = new controller();
        this.routes();        
    }

    //metodo routes
    routes() {
        this.app.route('/')
        .get( (req, res) => res.status(200).json({"result": "Hellow World"}));
        
        this.app.route('/api/contatos')
        .get((req, res) => {this.controller.select(req, res)});

        //os : antes do id indica que sera um parametro
        this.app.route('/api/contatos/:id')
        .get((req, res) => {this.controller.selectOne(req, res)});

        this.app.route('/api/contatos/:id')
        .delete((req, res) => this.controller.delete(req, res));

        this.app.route('/api/contatos/:id')
        .put((req, res) => this.controller.update(req, res));

        this.app.route('/api/contatos')
        .post((req, res) => this.controller.insert(req, res));
    }

    //nome padrao que utilizam para adicionar no express
    //tudo que entra ou sai, passa por ele
    middleware() {
        this.app.use(bodyparser.json())
        this.app.use(bodyparser.urlencoded({extended: true}))
    }
}

export default new App();
