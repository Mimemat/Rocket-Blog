import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Application from '@ioc:Adonis/Core/Application'
import crypto from 'crypto'
import Post from '../../Models/Post'
import User from '../../Models/User'

export default class PostsController {
  public index () {
    const allPosts = Post.all()
    return allPosts
  }

  public async store ({request, auth}: HttpContextContract) {
    const {title, content } = request.all()
    const thumbnail = request.file('thumbnail', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    const {name: author} = await auth.authenticate()
    const user = await User.findBy('name', author)

    if(!author || !user) {
      return 'Bad token'
    }
    
    else if (!title || !content || !thumbnail) {
      return 'Invalid request'
    }

    const thumbnailName = `${crypto.randomBytes(6).toString('hex')}.${thumbnail.extname}`
  

    const post ={
        title,
        author,
        content,
        thumbnail: `http://localhost:3333/${thumbnailName}`}

    const result = await user.related('posts').create(post)
    
    await thumbnail.move(Application.tmpPath('uploads'), {
      name: thumbnailName
    })
    return result
  }

  public async show({params}: HttpContextContract) {
    const PostId = params.id
    const Post = await Database
    .from('posts')
    .select('*')
    .where('id', PostId)
    .first()

    return Post
  }
}