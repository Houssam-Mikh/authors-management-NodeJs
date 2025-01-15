import expess from 'express'
import getAllAuthors, { getOneAuthor } from '../services/author-service.js';

function midlleWare1(req,res,next){
    console.log(`request methode : ${req.method}  || request url : ${req.url}`);
    next();
}
export default class Server{
    constructor(port){
        this.port = port;
        this.app = expess();
        this.config();
        this.routes();
    }
    config(){
        this.app.use(midlleWare1);
        this.app.use(expess.static('public'));
    }
    routes(){
        this.app.get('/',(req,res)=>{
                res.send(`
                        <h1>application de gestion des auteurs</h1>
                    `);
        })
        this.app.get('/authors',async(req,res)=>{
          try{
                const authors = await getAllAuthors();
                res.json(authors);
          }catch(exp){
            console.log(`erreur lors de la récupération des auteurs \n`+exp);
            res.status(500).json({message:'erreur'});
          }
        })
        this.app.get('/author/:id',async(req,res)=>{
            const id = req.params['id'];
            let author = await getOneAuthor(id);
            if(author == null){
                res.send(`<h1> user with id : ${id} not found;</h1>`);
            }else{
                res.status(200).json(author);
            }
        })
    }
    start(callBack){
        if(callBack == undefined){callBack = ()=>{console.log('serveur démarré sur le port numéro : '+this.port);}}
        this.app.listen(this.port,callBack);
    }
}