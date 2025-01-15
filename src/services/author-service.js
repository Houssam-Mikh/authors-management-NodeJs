import MysqlRepository from "../repositories/mysql-repository.js";

export default async function getAllAuthors(){
    let db = new MysqlRepository('biblio');
    let authors;
        await db.selectAll('authors')
                .then(({result,fields})=>{
                    authors = result.map(row =>({
                        id : row[fields[0]],
                        name : row[fields[1]],
                        yearBorn : row[fields[2]]
                    }))
                    return authors;
                })
                .catch(err=>console.log('###'+err));
        db.close();//end conncetion
    return authors;
}

export async function getOneAuthor(id){
   let author;
   let db = new MysqlRepository('biblio'); 
   await db.selectOne('authors',id,'Au_Id')
   .then(({result,fields})=>(
        author = {
            id : result[0][fields[0]],
            name : result[0][fields[1]],
            yearBorn : result[0][fields[2]]
        }
    ))
   .catch(err => console.log(err));
   db.close();
   return author;
}