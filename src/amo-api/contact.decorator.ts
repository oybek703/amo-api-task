import { applyDecorators, Get } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

export function GetContact() {
  return applyDecorators(
    ApiQuery({ name: 'name' }),
    ApiQuery({ name: 'phone' }),
    ApiQuery({ name: 'email' }),
    Get('/contact')
  )
}
