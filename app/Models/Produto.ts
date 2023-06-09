/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import FornecedorProduto from './FornecedorProduto'
import FabricaProduto from './FabricaProduto'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public numeroProd: number

  @column()
  public nomeProd: string

  @column()
  public cor: string

  @column()
  public peso: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasMany(() => FornecedorProduto, {foreignKey: 'numeroProd'})
  public fornecedorproduto: HasMany<typeof FornecedorProduto>

  @hasMany(() => FabricaProduto, {foreignKey: 'numeroProd'})
  public fabricaproduto: HasMany<typeof FabricaProduto>
  
}
