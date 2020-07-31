import * as mongoose from 'mongoose';

class DataBase {
    private dbrul = 'mongodb://192.168.99.100/cpbr-apirest';
    private dbconnection;

    constructor(){}

    //metodo de criacao da conexao
    createConnection() {
        mongoose.connect(this.dbrul);
        this.logger(this.dbrul); 
    }

    //metodo para colocar algumas respostas nas urls
    logger(uri) {
        this.dbconnection = mongoose.connection;
        //se o on do db connection, que é do mongoose, receber do mongodb o connected, 
        //sera escrito no console, mongoose esta conectado
        this.dbconnection.on('connected', () => console.log("mongoose está conectado"));
        this.dbconnection.on('error', (error) => console.error.bind(console, "erro na conexão: " + error));
    }
}

//exportando sem instanciar
export default DataBase;