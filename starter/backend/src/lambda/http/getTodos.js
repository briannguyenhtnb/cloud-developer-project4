import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'
import { getTodos } from '../../businessLogic/todos.mjs'


const logger = createLogger('GetTodos')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Start geting todos event: ', event)
    const userId = getUserId(event)
    const todos = await getTodos(userId)
    logger.info('Finish geting todos successfully: ', todos)
    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  })