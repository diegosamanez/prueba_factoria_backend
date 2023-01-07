import { test } from '@japa/runner'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Images', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const api = 'api/v1/images'

  test('create image', async ({ client }) => {
    Drive.fake()
    const fakeImage = await file.generateJpg('1mb')

    const response = await client.post(api)
      .file('image', fakeImage.contents, {filename: fakeImage.name})
      .fields({
        name: 'test',
      })


    response.assertStatus(201)
    response.assertBodyContains({
      name: 'test',
      path: '/__drive_fake'
    })
    Drive.restore()

  })

  test('list images', async ({ client }) => {
    Drive.fake()
    const fakeImage = await file.generateJpg('1mb')

    await client.post(api)
      .file('image', fakeImage.contents, {filename: fakeImage.name})
      .fields({
        name: 'test',
      })

    const response = await client.get(api)
    response.assertStatus(200)
    response.assertAgainstApiSpec()
    Drive.restore()
  })

  test('find image', async ({ client }) => {
    Drive.fake()
    const fakeImage = await file.generateJpg('1mb')

    const fakeData = await client.post(api)
      .file('image', fakeImage.contents, {filename: fakeImage.name})
      .fields({
        name: 'test',
      })

    const response = await client.get(`${api}/${fakeData.body().id}`)
    response.assertStatus(200)
    response.assertBodyContains({
      name: 'test',
      path: '/__drive_fake'
    })
    Drive.restore()
  })

  test('find image not found', async ({ client }) => {
    const response = await client.get(`${api}/10000000`)
    response.assertStatus(404)
  })

  test('update image', async ({ client }) => {
    Drive.fake()
    const fakeImage = await file.generateJpg('1mb')

    const fakeData = await client.post(api)
      .file('image', fakeImage.contents, {filename: fakeImage.name})
      .fields({
        name: 'test',
      })

    const fakeImageUpdated = await file.generateJpg('1mb')

    const response = await client.put(`${api}/${fakeData.body().id}`)
      .file('image', fakeImageUpdated.contents, {filename: fakeImageUpdated.name})
      .fields({
        name: 'test updated',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      name: 'test updated',
      path: '/__drive_fake'
    })
    Drive.restore()
  })

  test('update part of image: name', async ({ client }) => {
    Drive.fake()
    const fakeImage = await file.generateJpg('1mb')

    const fakeData = await client.post(api)
      .file('image', fakeImage.contents, {filename: fakeImage.name})
      .fields({
        name: 'test',
      })

    const response = await client.put(`${api}/${fakeData.body().id}`)
      .fields({
        name: 'test updated',
      })

    response.assertStatus(200)
    response.assertBodyContains({
      name: 'test updated',
      path: '/__drive_fake'
    })
    Drive.restore()
  })

  test('update part of image: path image', async ({ client }) => {
    Drive.fake()
    const fakeImage = await file.generateJpg('1mb')

    const fakeData = await client.post(api)
      .file('image', fakeImage.contents, {filename: fakeImage.name})
      .fields({
        name: 'test',
      })

    const fakeImageUpdated = await file.generateJpg('1mb')

    const response = await client.put(`${api}/${fakeData.body().id}`)
      .file('image', fakeImageUpdated.contents, {filename: fakeImageUpdated.name})

    response.assertStatus(200)
    response.assertBodyContains({
      name: 'test',
      path: '/__drive_fake'
    })
    Drive.restore()
  })

  test('update nonexistent image', async ({ client }) => {
    const response = await client.put(`${api}/100000000`)
      .fields({
        name: 'test updated',
      })
    response.assertStatus(404)
  })

  test('update image with invalid data', async ({ client }) => {
    Drive.fake()
    const fakeImage = await file.generateJpg('1mb')

    const fakeData = await client.post(api)
      .file('image', fakeImage.contents, {filename: fakeImage.name})
      .fields({
        name: 'test',
      })
    const response = await client.put(`${api}/${fakeData.body().id}`)
    response.assertStatus(400)
    Drive.restore()
  })

  test('delete image', async ({ client }) => {
    Drive.fake()
    const fakeImage = await file.generateJpg('1mb')

    const fakeData = await client.post(api)
      .file('image', fakeImage.contents, {filename: fakeImage.name})
      .fields({
        name: 'test',
      })

    const response = await client.delete(`${api}/${fakeData.body().id}`)

    response.assertStatus(204)
    Drive.restore()
  })

  test('delete nonexistent image', async ({ client }) => {
    const response = await client.delete(`${api}/100000000`)
    response.assertStatus(404)
  })
})
