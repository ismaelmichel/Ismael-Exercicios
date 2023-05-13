/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Fabrica from './Fabrica'

export default class FabricaProduto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numeroFab: number
  
  @column()
  public numeroProd: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Fabrica)
  public fabrica: BelongsTo<typeof Fabrica>

}
