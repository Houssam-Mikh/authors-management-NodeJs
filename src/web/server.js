import expess from 'express'
import getAllAuthors, { getOneAuthor } from '../services/author-service.js';
import authorRouter from './routes/author-router.js'

function midlleWare1(req,res,next){
    console.log(`request methode : ${req.method}  || request url : ${req.url}`);
    next();
}
export default class Server{
    constructor(port){
        this.port = port;
        this.app = expess();
        this.config();
       // this.routes();
    }
    config(){
        this.app.use(midlleWare1);
        this.app.use(expess.static('public'));
        //define a router for authors module : 
        this.app.use('/',authorRouter);
    }
  
    start(callBack){
        if(callBack == undefined){callBack = ()=>{console.log('serveur démarré sur le port numéro : '+this.port);}}
        this.app.listen(this.port,callBack);
    }
}