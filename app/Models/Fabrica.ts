import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Fabrica extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_fab: number

  @column()
  public nome_fab: string

  @column()
  public cidade_fab: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
