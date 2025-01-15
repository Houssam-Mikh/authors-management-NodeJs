import express from 'express'
import getAllAuthors,{getOneAuthor} from '../../services/author-service.js';
const router = express.Router();
export default router;


router.get('/',(req,res)=>{
    res.send(`
        <h1>application de gestion des auteurs</h1>
    `);
})

router.get('/authors',async (req,res)=>{
        try{
            let authors = await getAllAuthors();
            res.json(authors);
        }catch(exp){
            console.log('>>'+exp);
            res.status(500);
        }
})
router.get('/author/:id',async (req,res)=>{
    let id = req.params['id']; 
    try{
        let author = await getOneAuthor(id);
        res.json(author);

    }catch(exp){
        console.log('>>'+exp);
        res.status(500).json({
            message : 'cannot find user with id '+id
        })
    }
})
