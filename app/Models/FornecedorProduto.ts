/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Produto from './Produto'
import Fornecedor from './Fornecedor'

export default class FornecedorProduto extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public numeroProd: number
  
  @column()
  public numeroFor: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public prodNumero: number

  @belongsTo(() => Produto)
  public produto: BelongsTo<typeof Produto>

  @belongsTo(() => Fornecedor)
  public fornecedor: BelongsTo<typeof Fornecedor>

}
