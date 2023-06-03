/* eslint-disable prettier/prettier */

import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import FornecedorProduto from './FornecedorProduto'

export default class Fornecedor extends BaseModel {
  public static table = 'fornecedores'

  @column({ isPrimary: true })
  public numeroFor: number

  @column()
  public nomeFor: string

  @column()
  public estatuto: string

  @column()
  public cidadeFor: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => FornecedorProduto, {foreignKey: 'numeroFor'})
  public fornecedorproduto: HasMany<typeof FornecedorProduto>

}
