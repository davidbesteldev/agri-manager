import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { EnvService } from '@app/core/config'
import { appMiddlewares } from '@app/core/middlewares/app.middleware'

import { AppModule } from '@app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)
  const appConfig = envService.get('app')

  appMiddlewares(app)

  Logger.log(`Server is running on port ${appConfig.port} in ${appConfig.nodeEnv} mode`)
  await app.listen(appConfig.port)
}
void bootstrap()
