import { Module } from '@nestjs/common'
import { AmoApiController } from './amo-api.controller'
import { AmoApiService } from './amo-api.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [AmoApiController],
  providers: [AmoApiService]
})
export class AmoApiModule {}
