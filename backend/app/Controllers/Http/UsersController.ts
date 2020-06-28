import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async create ({request}: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      name: schema.string({ trim: true }, []),
      password: schema.string({ trim: true }, [
        rules.confirmed(),
      ]),
    })
    const userDetails = await request.validate({
      schema: validationSchema
    })
    const user = new User()
    user.name = userDetails.name
    user.email = userDetails.email
    user.password = userDetails.password
    await user.save()

    return 'Your account has been created'
  }
  public async index ({auth}: HttpContextContract) {
    try {
      return await auth.authenticate()
    }
    catch(err) {
      return err
    }
  }
}
