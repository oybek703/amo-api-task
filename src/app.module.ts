import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AmoApiModule } from './amo-api/amo-api.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AmoApiModule]
})
export class AppModule {}
