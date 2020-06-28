import Route from '@ioc:Adonis/Core/Route'

Route.get('/posts','PostsController.index')

Route.get('/post/:id','PostsController.show')

Route.post('/posts', 'PostsController.store')

Route.post('/login', 'AuthController.login')

Route.get('/user', 'UsersController.index')

Route.post('/sign', 'UsersController.create')
