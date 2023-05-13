/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FabricaFornecedor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numeroFab: number
  
  @column()
  public numeroFor: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
