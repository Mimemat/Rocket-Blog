import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login ({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password, {
      // expiresIn: '10 days',
    })

    return token.toJSON()
  }

  public async logout({auth}: HttpContextContract) {
    return await auth.use('api').logout()
  }
  
  public async check({ auth } : HttpContextContract ){
    return await auth.check()
  }
}
