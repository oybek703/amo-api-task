import { BadRequestException, Injectable } from '@nestjs/common'
import {
  IAmoApiContact,
  IAmoContactResponse
} from '../interfaces/contact.interface'
import { AxiosError } from 'axios'
import { EnvVariables } from '../common/app.constants'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class AmoApiService {
  protected readonly amoApiLink: string
  protected readonly amoApiAccessToken: string
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.amoApiLink = this.configService.get<string>(EnvVariables.amoApiLink)
    this.amoApiAccessToken = this.configService.get<string>(
      EnvVariables.amoApiAccessToken
    )
  }

  async findContact(query: string) {
    try {
      const { data } = await this.httpService.axiosRef.get<
        IAmoContactResponse | undefined
      >(`${this.amoApiLink}/api/v4/contacts?query=${query}`, {
        headers: {
          Authorization: `Bearer ${this.amoApiAccessToken}`,
          'Content-Type': 'application/json'
        }
      })
      if (String(data).length === 0) return undefined
      return data
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const { message } = e
        throw new BadRequestException(message)
      }
    }
  }

  async updateContact(contact: IAmoApiContact, id: number) {
    try {
      const { data } = await this.httpService.axiosRef.patch<
        IAmoContactResponse | undefined
      >(
        `${this.amoApiLink}/api/v4/contacts`,
        [
          {
            id,
            name: contact.name,
            custom_fields_values: [
              {
                field_code: 'EMAIL',
                values: [
                  {
                    enum_code: 'WORK',
                    value: contact.email
                  }
                ]
              },
              {
                field_code: 'PHONE',
                values: [
                  {
                    enum_code: 'WORK',
                    value: contact.phone
                  }
                ]
              }
            ]
          }
        ],
        {
          headers: {
            Authorization: `Bearer ${this.amoApiAccessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return data
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const { message } = e
        throw new BadRequestException(message)
      }
    }
  }

  async createNewContact(
    contact: IAmoApiContact
  ): Promise<IAmoContactResponse> {
    try {
      const { data } = await this.httpService.axiosRef.post<
        IAmoContactResponse | undefined
      >(
        `${this.amoApiLink}/api/v4/contacts`,
        [
          {
            name: contact.name,
            custom_fields_values: [
              {
                field_code: 'EMAIL',
                values: [
                  {
                    enum_code: 'WORK',
                    value: contact.email
                  }
                ]
              },
              {
                field_code: 'PHONE',
                values: [
                  {
                    enum_code: 'WORK',
                    value: contact.phone
                  }
                ]
              }
            ]
          }
        ],
        {
          headers: {
            Authorization: `Bearer ${this.amoApiAccessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return data
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const { message } = e
        console.log(e)
        throw new BadRequestException(message)
      }
    }
  }

  async addLead(contactId: number) {
    try {
      const { data } = await this.httpService.axiosRef.post<
        IAmoContactResponse | undefined
      >(
        `${this.amoApiLink}/api/v4/leads`,
        [
          {
            name: `New lead - ${Date.now()}`,
            _embedded: {
              contacts: [
                {
                  id: contactId
                }
              ]
            }
          }
        ],
        {
          headers: {
            Authorization: `Bearer ${this.amoApiAccessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return data
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const { message } = e
        console.log(e)
        throw new BadRequestException(message)
      }
    }
  }
}
