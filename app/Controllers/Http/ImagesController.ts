import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image';
import ImageRepository from 'App/Repositories/ImageRepository';
import ImageUploadService from 'App/Services/ImageUplodad.service';
import CreateImageValidator from 'App/Validators/CreateImageValidator';
import UpdateImageValidator from 'App/Validators/UpdateImageValidator';
export default class ImagesController {
  constructor(private imageRepository: ImageRepository) {
    this.imageRepository = new ImageRepository(new Image);
  }

  public async index({}: HttpContextContract) {
    const images = await this.imageRepository.all();
    return images;
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const image = await this.imageRepository.find(id);
    if (!image) {
      response.status(404);
      return { message: 'Image not found' };
    }
    return image;
  }

  public async create({ request, response }: HttpContextContract) {
    const { image: coverImage, name } = await request.validate(CreateImageValidator)
    const path = await ImageUploadService.uploadImage(coverImage);
    const image = await this.imageRepository.create({ name, path });
    response.status(201);
    return image;
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    try {
      const { image: coverImage, name } = await request.validate(UpdateImageValidator)
      const image = await this.imageRepository.find(id);
      if (!image) {
        response.status(404);
        return { message: 'Image not found' };
      }
      const path = await ImageUploadService.updateImage(coverImage, image.path);
      const imageUpdated = await this.imageRepository.update(id, {name: name ?? image.name, path});
      return imageUpdated;
    } catch (error) {
      if (error.message === 'No data to update') {
        response.status(400);
        return { message: error.message };
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;
    const image = await this.imageRepository.delete(id);
    // header 204: No Content
    if(!image) {
      response.status(404);
      return { message: 'Image not found' };
    }
    response.status(204);
    return image;
  }
}
