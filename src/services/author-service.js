import MysqlRepository from "../repositories/mysql-repository.js";
const db = new MysqlRepository('biblio');

export default async function getAllAuthors(){
    let authors;
    let msg = await db.open();
    console.log(msg);
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
        await db.open();
        await db.selectOne('authors',id,'Au_ID')
        .then(({result,fields})=>{
            author = {
                id : result[0][fields[0]],
                name : result[0][fields[1]],
                yearBorn : result[0][fields[2]]
            }
            return author;
        })
        .then(author => console.log(author))
        .catch(err => console.log(err));
        return (author == undefined )? null : author;
}