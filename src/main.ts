import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('Booking estate')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  console.info(
      `Documentation: http://localhost:${process.env.APP_PORT}/swagger`
  )
  await app.listen(process.env.APP_PORT)
}
bootstrap()
