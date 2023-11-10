import { z } from 'zod'

const tagSchema = z.object({
  name: z.string(),
  value: z.string()
})

// CU

export const loadResultSchema = z.function()
  .args(z.object({
    id: z.string().min(1, { message: 'message id is required' })
  }))
  .returns(z.promise(z.any()))

// MU

export const deployMessageSchema = z.function()
  .args(z.object({
    processId: z.string(),
    data: z.any(),
    tags: z.array(tagSchema),
    anchor: z.string().optional(),
    signer: z.any()
  }))
  .returns(z.promise(
    z.object({
      messageId: z.string()
    }).passthrough()
  ))

// SU

export const deployProcessSchema = z.function()
  .args(z.object({
    data: z.any(),
    tags: z.array(tagSchema),
    signer: z.any()
  }))
  .returns(z.promise(
    z.object({
      processId: z.string()
    }).passthrough()
  ))

export const loadProcessMetaSchema = z.function()
  .args(z.string())
  .returns(z.promise(
    z.object({
      tags: z.array(tagSchema)
    }).passthrough()
  ))

// Gateway
export const loadTransactionMetaSchema = z.function()
  .args(z.string())
  .returns(z.promise(
    z.object({
      tags: z.array(tagSchema)
    }).passthrough()
  ))

export const signerSchema = z.function()
  .args(z.object({
    data: z.any(),
    tags: z.array(tagSchema),
    /**
     * target must be set with writeMessage,
     * but not for createProcess
     */
    target: z.string().optional(),
    anchor: z.string().optional()
  }))
  .returns(z.promise(
    z.object({
      id: z.string(),
      raw: z.any()
    })
  ))
