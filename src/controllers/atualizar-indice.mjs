import { contrastColor } from 'contrast-color'
import { prisma } from '../database.mjs'

/**
 * 
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export async function atualizarIndice(request, reply) {
  const { id } = request.params

  if (!id || typeof id !== 'string') {
    reply.code(400)
    return { error: 'ID inválido' }
  }

  if (
    request.body.nome === undefined ||
    request.body.link === undefined ||
    request.body.categorias === undefined
  ) {
    reply.code(400)
    return { error: 'Parâmetros inválidos' }
  }

  const indiceExistente = await prisma.indice.findUnique({
    where: {
      id,
    },
    include: {
      categorias: {
        include: {
          categoria: true
        }
      }
    }
  })

  if (!indiceExistente) {
    reply.code(403)
    return { error: 'Índice não encontrado' }
  }

  const { nome, link, categorias, descricao } = request.body

  const categoriasNovas = []

  for (const categoria of categorias) {
    if (typeof categoria !== 'string') {
      reply.code(400)
      return { error: 'Categorias inválidas' }
    }

    const categoriaExistente = await prisma.categoria.findFirst({
      where: {
        nome: categoria
      }
    })

    if (categoriaExistente) {
      categoriasNovas.push(categoriaExistente.id)
      continue
    }

    const corCategoria = `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}`
    const corTextoCategoria = contrastColor({
      bgColor: corCategoria,
      threshold: 50
    })

    const novaCategoria = await prisma.categoria.create({
      data: {
        nome: categoria,
        cor: corCategoria,
        corTexto: corTextoCategoria,
      }
    })

    categoriasNovas.push(novaCategoria.id)
  }

  const indice = await prisma.indice.update({
    where: {
      id
    },
    data: {
      nome,
      descricao,
      link,
      categorias: {
        deleteMany: {
          indiceId: id
        },
        createMany: {
          data: categoriasNovas.map(categoriaId => ({
            categoriaId
          }))
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

  return indice
}