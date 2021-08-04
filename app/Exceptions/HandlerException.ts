import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";
import Youch from "youch";
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new HandlerException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class HandlerException extends Exception {
  public async handle(error: this, { request, response }: HttpContextContract) {
    if (Env.get("NODE_ENV") === "development") {
      const youch = new Youch(error, request.request);

      const errorJSON = await youch.toJSON();

      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }
}
