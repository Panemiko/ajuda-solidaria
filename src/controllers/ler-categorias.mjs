import { prisma } from '../database.mjs'

/**
 * 
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export async function lerCategorias(request, reply) {
  const { skip, take } = request.query

  const categorias = await prisma.categoria.findMany({
    skip: parseInt(skip) || undefined,
    take: parseInt(take) || undefined,
  })

  return categorias
}