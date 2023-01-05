import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ImageUploadService {
  public static async uploadImage(file: MultipartFileContract | null): Promise<string> {
    const fileName = `${new Date().getTime()}.${file?.extname}`
    await file?.moveToDisk('./', {
      name: fileName,
    })
    const urlFileName = await Drive.getUrl(fileName)
    return urlFileName
  }
}
