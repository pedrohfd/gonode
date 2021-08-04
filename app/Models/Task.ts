import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Project from "App/Models/Project";
import User from "App/Models/User";
import File from "App/Models/File";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @hasOne(() => File, {
    foreignKey: "id",
  })
  public file: HasOne<typeof File>;

  @belongsTo(() => Project, {
    foreignKey: "project_id",
  })
  public projects: BelongsTo<typeof Project>;

  @belongsTo(() => User, {
    foreignKey: "user_id",
  })
  public user: BelongsTo<typeof User>;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public project_id: number;

  @column()
  public user_id: number;

  @column()
  public file_id: number;

  @column()
  public due_date: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
