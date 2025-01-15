import mysql from 'mysql'


export default class MysqlRepository{
    constructor(database,host='localhost',user='root',password=''){
        this.params = {database,host,user,password};
        this.db = mysql.createConnection(this.params);
        this.open();
    }
    open(){
        return new Promise((resolve,reject)=>{
            this.db.connect((err)=>{
                if(err) reject(err);
                else resolve('database connected succesfully ....');
            })
        })
    }
    close(){
        this.db.end();
    }
    selectAll(tableName){
        let query = 'Select * From  '+tableName;
        return new Promise((resolve,reject)=>{
            this.db.query(query,(err,result,fields)=>{
                if(err) reject(err);
                else resolve({result,fields : fields.map(field=> field.name)});
            })
        });
    }
    selectOne(tableName,id,field_id){
        let query = 'Select * from '+tableName+' WHERE '+field_id+' = ?' ;
        return new Promise((resolve,reject)=>{
            this.db.query(query,[id],(err,result,fields)=>{
                if(err) reject(err);
                else resolve({result,fields : fields.map(field => field.name)});
            })
        })
    }
}

