import Route from '@ioc:Adonis/Core/Route'

Route.get('/posts','PostsController.index')

Route.get('/post/:id','PostsController.show')

Route.post('/posts', 'PostsController.store')

Route.post('/login', 'AuthController.login')

Route.get('/logout', 'AuthController.logout')

Route.get('/check', 'AuthController.check')

Route.post('/sign', 'UsersController.create')

Route.get('/users/:userName', 'UsersController.show')

Route.get('/user', 'UsersController.index')