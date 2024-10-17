import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'
import { create } from '../../businessLogic/todos.mjs'


const logger = createLogger('CreateTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Start creating todo event: ', event)
    const clientId = getUserId(event)
    const todo = JSON.parse(event.body)
    const item = await create(todo, clientId)
    logger.info('Finish creating todo successfully: ', item)
    return {
      statusCode: 201,
      body: JSON.stringify({
        item: item
      })
    }
  })