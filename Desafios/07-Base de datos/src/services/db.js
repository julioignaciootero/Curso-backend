import knex from 'knex'

const options = {

    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ecommerce'
    }   

}

class DB {

    constructor() {
        this.connection = knex(options)
    }

    init(){

        this.connection.schema.hasTable('productos').then((exists) => {
            if (exists) return;
      
            return this.connection.schema.createTable(
              'productos',
              async (productosTable) => {
                productosTable.increments();
                productosTable.string('title').notNullable();               
                productosTable.integer('price');
                productosTable.string('thumbnail').notNullable();
      
              }
            );
          });




    }

    get(tableName, id) {
        if (id) return this.connection(tableName).where('id', id);
    
        return this.connection(tableName);
      }
      
    async create(tableName, obj) {
        return this.connection(tableName).insert(obj);
    }


    async updateById(tableName, id, obj){

        return this.connection(tableName).where('id', id).update(obj);

    }

    async getAll(tableName) {

        if (tableName) {
            console.log("Tabla " , tableName)
            return this.connection(tableName).select('*')
        }
        return tableName
    }

    async getById(tableName, id) {

        if (id) {
            console.log("Tabla " , tableName)
            return this.connection(tableName).where('id', id).select('*')
        }
        return tableName
    }

    async create() {
        return this.connection('productos').insert({ "title" : "asdasd" , "price" : 100 , "thumbnail" : "asdasd"})
    }

    async deleteById(tableName, id) {

        return this.connection(tableName).where('id', id).del()

    }
}


export const DBService = new DB();