import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateImageValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({},
      [
        rules.required(),
      ]
    ),
    image: schema.file({
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'svg', 'bmp', 'tiff'],
    }, [
      rules.required(),
    ]),
  })
  public messages: CustomMessages = {}
}
