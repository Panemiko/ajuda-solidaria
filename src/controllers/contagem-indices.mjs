import { prisma } from '../database.mjs'

/**
 * 
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export async function contagemIndices(request, reply) {
  const { categorias } = request.query

  const indicesContagem = await prisma.indice.aggregate({
    _count: true,
    where: {
      categorias: {
        some: {
          categoriaId: {
            in: categorias
          }
        }
      }
    },
  })

  return indicesContagem._count
}