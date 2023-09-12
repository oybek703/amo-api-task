import { Controller, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AmoApiService } from './amo-api.service'
import { ContactDto } from './dto/contact.dto'
import { GetContact } from './contact.decorator'

@ApiTags('amo-api')
@Controller()
export class AmoApiController {
  constructor(private readonly amoApiService: AmoApiService) {}

  @GetContact()
  async findContact(@Query() queryParams: ContactDto) {
    const { email, phone } = queryParams
    let amoApiContact = await this.amoApiService.findContact(phone)
    // User with provided phone number not found
    if (!amoApiContact)
      amoApiContact = await this.amoApiService.findContact(email)
    // User with provided email address not found
    if (!amoApiContact)
      amoApiContact = await this.amoApiService.createNewContact(queryParams)
    // User with this phone number or email address found
    const id = amoApiContact._embedded.contacts[0].id
    amoApiContact = await this.amoApiService.updateContact(queryParams, id)
    return await this.amoApiService.addLead(id)
  }
}
