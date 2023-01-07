import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateImageValidator {
  constructor(protected ctx: HttpContextContract) {
    const { request } = ctx;
    const { name } = request.body();
    const image = request.file('image');
    if (!name && !image) {
      throw new Error('No data to update');
    }
  }
  public schema = schema.create({
    name: schema.string.optional(),
    image: schema.file.optional({
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'bmp', 'tiff'],
    }),
  })
  public messages: CustomMessages = {}
}
