import { Test, TestingModule } from '@nestjs/testing'
import { AmoApiController } from './amo-api.controller'

describe('AmoApiController', () => {
  let controller: AmoApiController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmoApiController]
    }).compile()

    controller = module.get<AmoApiController>(AmoApiController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
