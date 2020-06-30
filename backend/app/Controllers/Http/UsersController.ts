import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import Application from '@ioc:Adonis/Core/Application'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import crypto from 'crypto'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
  public async create ({request}: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      name: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({ table: 'users', column: 'name' })
      ]),
      password: schema.string({ trim: true }, [
        rules.confirmed(),
        rules.required()
      ]),
      pfp: schema.file({
        extnames: ['jpg', 'png', 'jpeg'],
        size: '2mb'
      })
    },)

    const userDetails = await request.validate({
      schema: validationSchema,
      messages: {
        'email.unique' : 'Esse email já está em uso',
        'name.unique' : 'Esse nome já está em uso',
      }
    })

    const newPfpnName = `${crypto.randomBytes(6).toString('hex')}pfp.${userDetails.pfp.extname}`

    const user = new User()
    user.name = userDetails.name
    user.email = userDetails.email
    user.password = userDetails.password
    user.pfp = `http://localhost:3333/${newPfpnName}`
    await user.save()
    await userDetails.pfp.move(Application.tmpPath('uploads'), {
      name: newPfpnName
    })

    return 'Your account has been created'
  }

  public async index ({auth, response}: HttpContextContract) {
    const isLogged = await auth.check()
    if(isLogged) {
      return await auth.authenticate()
    }
    response.status(400)
    return 'Not Authenticated'
  }

  public async show ({params}: HttpContextContract) {
    const {userName} =  params
    
    const {name, email, pfp } = await Database.query().select('*').from('users').where('name', userName).first()

    return {
      name,
      email,
      pfp
    }
  }
}
