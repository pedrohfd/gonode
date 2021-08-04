import { DateTime } from "luxon";
import { BaseModel, column, computed } from "@ioc:Adonis/Lucid/Orm";

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column()
  public file: string;

  @column()
  public name: string;

  @column()
  public type: string;

  @column()
  public subtype: string;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @computed()
  public get url() {
    return `http://127.0.0.1:3333/file/${this.id}`;
  }
}
