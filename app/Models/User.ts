import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Task from "App/Models/Task";
import Project from "App/Models/Project";
import UserAddress from "./UserAddress";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public token?: string;

  @column()
  public token_created_at?: Date;

  @hasMany(() => Project, {
    foreignKey: "user_id",
  })
  public project: HasMany<typeof Project>;

  @hasMany(() => Task, {
    foreignKey: "user_id",
  })
  public task: HasMany<typeof Task>;

  @hasMany(() => UserAddress)
  public addresses: HasMany<typeof UserAddress>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
