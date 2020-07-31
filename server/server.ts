import App from './app';

//app em minusculo, esta acessando o atributo app que recebeu o express() na classe APP.
App.app.listen(3000, () => console.log("Server está rodando"));