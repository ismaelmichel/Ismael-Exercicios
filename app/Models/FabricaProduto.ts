/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FabricaProduto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_fab: number
  
  @column()
  public numero_prod: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
