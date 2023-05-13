/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'fornecedor_produtos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('numero_for').unsigned().references('fornecedores.numero_for')
      table.integer('numero_prod').unsigned().references('produtos.numero_prod')
      table.unique(['numero_for','numero_prod'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
