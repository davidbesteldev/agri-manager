import { Module } from '@nestjs/common'

import { EnvModule } from '@app/core/config'

@Module({
  imports: [EnvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
