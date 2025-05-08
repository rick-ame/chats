import { Router } from 'express'
import { z } from 'zod'

import { searchContacts } from '@/controllers/contact'
import { validate, verifyToken } from '@/middlewares'
import { ContactApi, searchContactsSchema } from '~'

export const routes = Router()

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
