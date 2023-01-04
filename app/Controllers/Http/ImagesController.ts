import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image';
import ImageRepository from 'App/Repositories/ImageRepository';
export default class ImagesController {
  constructor(private imageRepository: ImageRepository) {
    this.imageRepository = new ImageRepository(new Image);
  }

  public async index({}: HttpContextContract) {
    const images = await this.imageRepository.all();
    return images;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const image = await this.imageRepository.find(id);
    return image;
  }

  public async create({ request }: HttpContextContract) {
    const { name, path } = request.body();
    const image = await this.imageRepository.create({ name, path });
    return image;
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params;
    const { name, path } = request.body();
    const image = await this.imageRepository.update(id, { name, path});
    return image;
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;
    const image = await this.imageRepository.delete(id);
    return image;
  }
}
