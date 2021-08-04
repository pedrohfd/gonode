import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SessionValidator from "App/Validators/SessionValidator";

export default class SessionsController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = request.all();
    await request.validate(SessionValidator);

    const token = await auth.use("api").attempt(email, password);

    return token;
  }
}
