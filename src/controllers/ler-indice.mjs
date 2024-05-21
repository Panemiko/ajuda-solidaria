import { prisma } from '../database.mjs'

/**
 * 
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export async function lerIndice(request, reply) {
  const { id } = request.params

  if (!id || typeof id !== 'string') {
    reply.code(400)
    return { error: 'ID inválido' }
  }

  const indice = await prisma.indice.findUnique({
    where: {
      id
    },
    include: {
      categorias: {
        include: {
          categoria: true
        }
      }
    }
  })

  console.log(indice)

  if (!indice) {
    reply.code(404)
    return { error: 'Não encontrado' }
  }

  return indice
}