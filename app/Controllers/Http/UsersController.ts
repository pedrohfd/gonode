import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const data = request.only(["username", "email", "password"]);
    await request.validate(UserValidator);

    const trx = await Database.beginGlobalTransaction();

    const user = await User.create(data, trx);

    await trx.commit();

    return user;
  }
}
