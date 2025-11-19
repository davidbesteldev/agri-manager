import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

import { EnvService } from '@app/core/config'
import { PrismaClient } from '@generated/prisma/client'

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(envService: EnvService) {
    const connectionString = envService.get('db').url
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)

    super({ adapter })
  }
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
