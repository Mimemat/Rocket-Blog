import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Application from '@ioc:Adonis/Core/Application'
import crypto from 'crypto'
import Post from '../../Models/Post'

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
    const {name: author} = (await auth.authenticate())

    if(!author) {
      return 'Bad token'
    }

    if (!title || !content || !thumbnail) {
      return 'Invalid request'
    }

    const thumbnailName = `${crypto.randomBytes(6).toString('hex')}.${thumbnail.extname}`
  
    await Post.create({
      title,
      author,
      content,
      thumbnail: `http://localhost:3333/${thumbnailName}`
    })
    
    await thumbnail.move(Application.tmpPath('uploads'), {
      name: thumbnailName
    })
    return {title, content, thumbnailName}
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