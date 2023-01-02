import Image from 'App/Models/Image'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Image, ({ faker }) => {
  return {
    name: faker.lorem.words(2),
    path: faker.image.imageUrl(),
  }
}).build()
