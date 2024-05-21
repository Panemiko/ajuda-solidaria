import { prisma } from '../database.mjs'

/**
 * 
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export async function lerIndices(request, reply) {
  const { skip, take, categorias } = request.query

  const indices = await prisma.indice.findMany({
    skip: parseInt(skip) || undefined,
    take: parseInt(take) || undefined,
    where: {
      categorias: {
        some: {
          categoriaId: typeof categorias === 'string' ? categorias : typeof categorias === 'undefined' ? undefined : {
            in: categorias
          }
        }
      }
    },
    include: {
      categorias: {
        include: {
          categoria: true
        }
      }
    }
  })

  return indices
}