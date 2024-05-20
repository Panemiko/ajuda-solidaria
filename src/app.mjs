import { config } from 'dotenv'
import Fastify from 'fastify'

config()

const fastify = Fastify({
  logger: true
})

try {
  fastify.listen({ port: process.env.PORT ?? 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}