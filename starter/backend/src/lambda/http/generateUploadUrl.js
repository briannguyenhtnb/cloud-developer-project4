import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'
import { generateImageUrl } from '../../fileStorage/attachmentUtils.mjs'


const logger = createLogger('GenerateUploadUrl')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Start generating upload url event: ', event)
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const uploadUrl = await generateImageUrl(todoId, userId)
    logger.info('Finish generating image successfully: ', uploadUrl)
    return {
      statusCode: 201,
      body: JSON.stringify({
        uploadUrl
      })
    }
  })