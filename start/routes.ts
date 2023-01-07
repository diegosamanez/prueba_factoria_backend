/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/images', 'ImagesController.index')
  Route.post('/images', 'ImagesController.create')
  Route.get('/images/:id', 'ImagesController.show')
  Route.put('/images/:id', 'ImagesController.update')
  Route.delete('/images/:id', 'ImagesController.destroy')
}).prefix('/api/v1')

