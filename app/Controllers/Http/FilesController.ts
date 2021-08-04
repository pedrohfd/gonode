import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import File from "App/Models/File";
import Application from "@ioc:Adonis/Core/Application";

export default class FilesController {
  public async show({ params, response }: HttpContextContract) {
    const file = await File.findOrFail(params.id);

    return response.download(Application.tmpPath(`uploads/${file.file}`));
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      if (!request.file("file")) return;

      const upload = request.file("file", { size: "2mb" });

      const fileName = `${Date.now()}.${upload?.subtype}`;

      await upload?.move(Application.tmpPath("uploads"), {
        name: fileName,
      });

      if (upload?.state !== "moved") {
        throw upload?.errors;
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      });

      return file;
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Erro no upload de arquivo" } });
    }
  }
}
