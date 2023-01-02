import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ImageFactory from 'Database/factories/ImageFactory'

export default class extends BaseSeeder {
  public async run () {
    // create 10 images
    await ImageFactory.createMany(10)
  }
}
