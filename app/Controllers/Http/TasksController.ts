import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Task from "App/Models/Task";
import TaskValidator from "App/Validators/TaskValidator";

export default class TasksController {
  public async index({ request }: HttpContextContract) {
    const { Task_id } = request.params();
    const tasks = await Task.firstOrFail(Task_id);

    return tasks;
  }

  public async store({ request, params }: HttpContextContract) {
    const data = request.only([
      "user_id",
      "title",
      "description",
      "due_date",
      "file_id",
    ]);
    await request.validate(TaskValidator);

    const task = await Task.create({ ...data, project_id: params.project_id });

    return task;
  }

  public async show({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);

    return task;
  }

  public async update({ request, params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);
    const data = request.only([
      "user_id",
      "title",
      "description",
      "due_date",
      "file_id",
    ]);

    task.merge(data);

    await task.save();

    return task;
  }

  public async destroy({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);

    await task.delete();
  }
}
