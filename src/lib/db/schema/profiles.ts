import { profileSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getProfiles } from "@/lib/api/profiles/queries";


// Schema for profiles - used to validate API requests
const baseSchema = profileSchema.omit(timestamps)

export const insertProfileSchema = baseSchema.omit({ id: true });
export const insertProfileParams = baseSchema.extend({
  name: z.coerce.string().min(1, 'El nombre no puede estar vacío'),
  idCard: z.coerce.number().int().positive('La cédula debe ser un número entero positivo'),
  phone: z.coerce.string().min(1, 'El teléfono no puede estar vacío'),
  address: z.coerce.string().min(1, 'La dirección no puede estar vacía'),
  salary: z.coerce.number().positive('El salario debe ser un número mayor a 0'),
  email: z.coerce.string().email('El correo electrónico debe ser válido'),
}).omit({
  id: true,
  userId: true
});

export const updateProfileSchema = baseSchema;
export const updateProfileParams = updateProfileSchema.extend({
  name: z.coerce.string().min(1, 'El nombre no puede estar vacío'),
  idCard: z.coerce.number().int().positive('La cédula debe ser un número entero positivo'),
  phone: z.coerce.string().min(1, 'El teléfono no puede estar vacío'),
  address: z.coerce.string().min(1, 'La dirección no puede estar vacía'),
  salary: z.coerce.number().positive('El salario debe ser un número mayor a 0'),
  email: z.coerce.string().email('El correo electrónico debe ser válido'),
}).omit({
  userId: true
});
export const profileIdSchema = baseSchema.pick({ id: true });

// Types for profiles - used to type API request params and within Components
export type Profile = z.infer<typeof profileSchema>;
export type NewProfile = z.infer<typeof insertProfileSchema>;
export type NewProfileParams = z.infer<typeof insertProfileParams>;
export type UpdateProfileParams = z.infer<typeof updateProfileParams>;
export type ProfileId = z.infer<typeof profileIdSchema>["id"];

// this type infers the return from getProfiles() - meaning it will include any joins
export type CompleteProfile = Awaited<ReturnType<typeof getProfiles>>["profiles"][number];

