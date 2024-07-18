import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.StatusCodes) err.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    StatusCodes: err.StatusCodes,
    message: err.message || StatusCodes[err.StatusCodes],
    stack: err.stack
  }

  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  res.status(responseError.StatusCodes).json(responseError)
}