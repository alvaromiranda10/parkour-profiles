import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const profileSchema = z.object({
  id: z.string(),
  name: z.string(),
  idCard: z.number().int(),
  phone: z.string(),
  address: z.string(),
  salary: z.number(),
  email: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteProfile extends z.infer<typeof profileSchema> {
  user: CompleteUser
}

/**
 * relatedProfileSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProfileSchema: z.ZodSchema<CompleteProfile> = z.lazy(() => profileSchema.extend({
  user: relatedUserSchema,
}))
