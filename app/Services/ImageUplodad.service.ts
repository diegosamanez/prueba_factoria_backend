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

  public static async updateImage(file: MultipartFileContract | null | undefined, fileName: string): Promise<string> {
    if (!file) {
      return fileName
    }
    await Drive.delete(fileName.replace('/uploads/', ''))
    const newFileName = `${new Date().getTime()}.${file.extname}`
    await file.moveToDisk('./', {
      name: newFileName,
    })
    const urlFileName = await Drive.getUrl(newFileName)
    return urlFileName
  }

  public static async deleteImage(fileName: string): Promise<void> {
    await Drive.delete(fileName.replace('/uploads/', ''))
  }
}
