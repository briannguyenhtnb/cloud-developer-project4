import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'
import { update } from '../../businessLogic/todos.mjs'


const logger = createLogger('UpdateTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Start updating todo event: ', event)

    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId
    const newTodo = JSON.parse(event.body)
    const updatedTodo = await update(newTodo, todoId, userId)
    logger.info('Finish Updating todo successfully: ', updatedTodo)
    return {
      statusCode: 200
    }
  })