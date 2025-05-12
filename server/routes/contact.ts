import { Router } from 'express'
import { z } from 'zod'

import { getContacts, getMessages, searchContacts } from '@/controllers/contact'
import { validate, verifyToken } from '@/middlewares'
import { ContactApi, searchContactsSchema } from '~'

export const routes = Router()

routes.get(ContactApi.Contacts, verifyToken, getContacts)

routes.get(
  ContactApi.Search,
  verifyToken,
  validate(
    z.object({
      query: searchContactsSchema,
    }),
  ),
  searchContacts,
)

routes.get(`${ContactApi.Messages}/:id`, verifyToken, getMessages)
