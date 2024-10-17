
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'
import { deleteItem } from '../../businessLogic/todos.mjs'


const logger = createLogger('DeleteTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Start deleting todo event: ', event)
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const todoDeleted = await deleteItem(todoId, userId)
    logger.info('Finish deleting todo successfully: ', todoDeleted)
    return {
      statusCode: 200
    }
  })
