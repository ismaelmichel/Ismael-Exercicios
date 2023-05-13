/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import FabricaProduto from './FabricaProduto'
import Fornecedor from './Fornecedor'

export default class Fabrica extends BaseModel {
  @column({ isPrimary: true })
  public numeroFab: number

  @column()
  public nomeFab: string

  @column()
  public cidadeFab: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
}
