import { config } from 'dotenv'
import Fastify from 'fastify'
import { atualizarIndice } from './controllers/atualizar-indice.mjs'
import { contagemIndices } from './controllers/contagem-indices.mjs'
import { criarIndice } from './controllers/criar-indice.mjs'
import { lerCategorias } from './controllers/ler-categorias.mjs'
import { lerIndice } from './controllers/ler-indice.mjs'
import { lerIndices } from './controllers/ler-indices.mjs'

config()

const fastify = Fastify({
  logger: true
})

// rotas planejadas
/**
 * - criar indice
 * - ler indice
 * - ler indices
 * - por categoria
 * - atualizar indice
 * - quantidade de indices armazenados
 * - quantidade de indices por categoria
 * - categorias
 */

fastify.post('/indice', criarIndice)
fastify.get('/indice/:id', lerIndice)
fastify.put('/indice/:id', atualizarIndice)
fastify.get('/indices', lerIndices)
fastify.get('/indices/contagem', contagemIndices)
fastify.get('/categorias', lerCategorias)

try {
  fastify.listen({ port: process.env.PORT ?? 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}