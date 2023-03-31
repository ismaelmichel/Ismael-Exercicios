import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Fornecedor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_for: number

  @column()
  public nome_for: string

  @column()
  public estatuto: string

  @column()
  public cidade_for: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
